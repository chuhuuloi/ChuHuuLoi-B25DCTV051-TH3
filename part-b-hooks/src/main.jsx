import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// 1. Import ThemeProvider từ file ThemeContext bạn đã tạo
import { ThemeProvider } from './contexts/ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Bọc ThemeProvider bên ngoài App */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)