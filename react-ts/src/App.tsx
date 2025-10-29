import { Route, Routes } from 'react-router'
import './App.css'
import CategoriesListPage from './pages/categories/CategoriesListPage'
import CategoryCreatePage from './pages/categories/CategoryCreatePage'
import RegisterPage from './pages/auth/RegisterPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<CategoriesListPage />} />
      <Route path="/create" element={<CategoryCreatePage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}

export default App
