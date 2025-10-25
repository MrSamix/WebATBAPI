import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { CategoriesProvider } from './context/CategoriesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <>
  <BrowserRouter>
  <CategoriesProvider>
    <App />
  </CategoriesProvider>
  </BrowserRouter>
  </>,
)
