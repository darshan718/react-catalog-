import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom'
import catalogData from './catalogData'

function normalizeCatalog(rawData) {
  if (Array.isArray(rawData)) {
    return rawData.map((item, index) => ({
      ...item,
      id: item.id || `${item.category || 'item'}-${index + 1}`,
      itemprops: Array.isArray(item.itemprops) ? item.itemprops : [],
    }))
  }

  if (rawData && typeof rawData === 'object') {
    const rows = []
    Object.entries(rawData).forEach(([category, list]) => {
      if (!Array.isArray(list)) return
      list.forEach((item, index) => {
        rows.push({
          ...item,
          category: item.category || category,
          id: item.id || `${category}-${index + 1}`,
          itemprops: Array.isArray(item.itemprops) ? item.itemprops : [],
        })
      })
    })
    return rows
  }

  return []
}

const items = normalizeCatalog(catalogData)

function groupByCategory(list) {
  return list.reduce((acc, item) => {
    const key = item.category || 'Uncategorized'
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})
}

function HomePage() {
  const grouped = groupByCategory(items)
  const categories = Object.keys(grouped)

  return (
    <main className="container">
      <header className="page-head">
        <h1>Dynamic Multi-Category Catalog</h1>
        <p>Browse products by category and open any item for full details.</p>
      </header>

      {categories.length === 0 ? (
        <div className="empty-state">No catalog data found.</div>
      ) : (
        categories.map((category) => (
          <section className="category-block" key={category}>
            <h2>{category}</h2>
            <div className="card-grid">
              {grouped[category].map((item) => (
                <Link className="card" key={item.id} to={`/item/${encodeURIComponent(item.id)}`}>
                  <img
                    src={item.image || 'https://via.placeholder.com/900x600?text=No+Image'}
                    alt={item.itemname || 'Catalog item'}
                  />
                  <div className="card-body">
                    <span className="chip">{item.category || 'Unknown'}</span>
                    <h3>{item.itemname || 'Unnamed item'}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))
      )}
    </main>
  )
}

function ItemDetailPage() {
  const { itemId } = useParams()
  const item = items.find((entry) => String(entry.id) === String(itemId))

  if (!item) {
    return (
      <main className="container">
        <Link className="back-link" to="/">
          ← Back to Catalog
        </Link>
        <div className="empty-state">Item not found.</div>
      </main>
    )
  }

  return (
    <main className="container">
      <Link className="back-link" to="/">
        ← Back to Catalog
      </Link>

      <section className="detail-layout">
        <img
          className="detail-image"
          src={item.image || 'https://via.placeholder.com/1000x700?text=No+Image'}
          alt={item.itemname || 'Catalog item'}
        />
        <article className="detail-card">
          <span className="chip">{item.category || 'Unknown'}</span>
          <h1>{item.itemname || 'Unnamed item'}</h1>
          <ul className="props-list">
            {item.itemprops.length === 0 ? (
              <li>
                <strong>Properties</strong>
                <span>No properties available</span>
              </li>
            ) : (
              item.itemprops.map((prop, index) => {
                const label = prop.key || prop.label || Object.keys(prop)[0] || 'Property'
                const value =
                  prop.value || prop[label] || Object.values(prop)[0] || 'Not provided'
                return (
                  <li key={`${label}-${index}`}>
                    <strong>{label}</strong>
                    <span>{value}</span>
                  </li>
                )
              })
            )}
          </ul>
        </article>
      </section>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/item/:itemId" element={<ItemDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
