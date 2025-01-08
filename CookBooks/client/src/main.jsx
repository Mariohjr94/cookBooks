import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import theme from './app/theme'
import store  from './app/store'
import './index.css'
import App from './app/App'
import { CssBaseline } from '@mui/material'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
      <Provider store={store}>
        < CssBaseline / >
       <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
