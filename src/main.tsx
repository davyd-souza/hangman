// DEPENDENCY
import React from 'react'
import ReactDOM from 'react-dom/client'

// COMPONENT
import App from './App'

// STYLE
import './main.css'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);