import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { store } from './store/index.ts'
import { Provider } from 'react-redux'
import { AuthProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <BrowserRouter>
  {/* <CategoriesProvider> */}
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  {/* </CategoriesProvider> */}
  </BrowserRouter>
  </Provider>,
)
