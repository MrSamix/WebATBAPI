import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { store } from './store/index.ts'
import { Provider } from 'react-redux'
import { AuthProvider } from './context/AuthContext.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import APP_ENV from './env/index.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <BrowserRouter>
  {/* <CategoriesProvider> */}
    <GoogleOAuthProvider clientId={APP_ENV.CLIENT_ID_OAUTH_GOOGLE}>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
    </GoogleOAuthProvider>
  {/* </CategoriesProvider> */}
  </BrowserRouter>
  </Provider>,
)
