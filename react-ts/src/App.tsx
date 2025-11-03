import { Link, Route, Routes } from 'react-router'
import './App.css'
import CategoriesListPage from './pages/categories/CategoriesListPage'
import CategoryCreatePage from './pages/categories/CategoryCreatePage'
import RegisterPage from './pages/auth/RegisterPage'
import { useContext, useEffect } from 'react'
import { ThemeContext, type ThemeContextType } from './context/ThemeContext'
import LoginPage from './pages/auth/LoginPage'
import { AuthContext, type AuthContextType } from './context/AuthContext'
import APP_ENV from './env'
import ProfilePage from './pages/auth/ProfilePage'

function App() {
  const { theme, changeTheme } = useContext(ThemeContext) as ThemeContextType;
  const { isLoggedIn, logout, loadFromLocalStorage, user } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    loadFromLocalStorage();
  }, [])

  return (
    <div>
      <div className="flex justify-between mx-10 my-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-extrabold dark:text-white">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
            </svg>
          </Link>
          <button type="button" className="cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5" onClick={changeTheme}>
            {theme === "light" ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>

        {/* <h1 className={"text-4xl font-extrabold text-center dark:text-white"}>Список категорій</h1> */}
        <div className="flex gap-2">
        {!isLoggedIn ? (
          <>
            <Link to="/login" type="button" className="align-middle focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Вхід
            </Link>
            <Link to="/register" type="button" className="align-middle focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Реєстрація
            </Link>
            
          </>
        ) : (
          <>
            <Link to="/profile" type="button" className="flex gap-2 align-middle focus:outline-none text-white font-medium items-center">
              <img src={`${APP_ENV.API_SMALL_IMAGE_URL}${user?.image}`} alt={user?.name} className="w-8 h-8 rounded-full" />
              {user?.name}
            </Link>
            <button onClick={logout} type="button" className="cursor-pointer align-middle focus:outline-none text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-800 dark:hover:bg-red-900 dark:focus:ring-red-900">
              Вихід
            </button>
            <Link to="/create" type="button" className="align-middle focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">+</Link>
          </>
        )}
        </div>
      </div>
      <Routes>
        <Route path="/" element={<CategoriesListPage />} />
        <Route path="/create" element={<CategoryCreatePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>

  )
}

export default App
