# Frontend Assignment: Dynamic Multi-Category Catalog

Responsive React application that displays product categories and dynamic item details using `itemprops`.

## Delivered Requirements

- Home screen with clear category segregation
- Item cards preview inside each category section
- Dedicated detail page per item
- Dynamic rendering of all item attributes by iterating `itemprops`
- Responsive design for mobile, tablet, and desktop

## Tech Stack

- React (Vite)
- React Router
- CSS

## Project Structure

- `src/App.jsx` - Routes, category overview, and item detail page
- `src/catalogData.js` - Catalog data source
- `src/index.css` - Responsive UI styles

## Expected Data Shape

```js
[
  {
    id: 'item-1',
    itemname: 'Item Name',
    category: 'Cars',
    image: 'https://example.com/image.jpg',
    itemprops: [
      { key: 'RPM', value: '7500' },
      { key: 'Horsepower', value: '500 hp' },
    ],
  },
]
```

The app also supports a category-keyed object and normalizes it internally.

## Local Run

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Hosting

### Vercel

1. Push project to GitHub
2. Import repository in [Vercel](https://vercel.com/)
3. Deploy (framework auto-detected as Vite)
4. Share generated live URL

### Netlify

1. Push project to GitHub and import in Netlify, or drag-and-drop `dist` after `npm run build`
2. Build command: `npm run build`
3. Publish directory: `dist`
