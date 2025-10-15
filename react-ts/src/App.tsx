import { Route, Routes } from 'react-router'
import './App.css'
import CategoriesListPage from './pages/categories/CategoriesListPage'
import CategoryCreatePage from './pages/categories/CategoryCreatePage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<CategoriesListPage />} />
      <Route path="/create" element={<CategoryCreatePage />} />
    </Routes>
  )
}

export default App
