/**
 * Ponto de entrada principal da aplicação.
 * Renderiza o componente App dentro do React.StrictMode para garantir boas práticas de desenvolvimento.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
