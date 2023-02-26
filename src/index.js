import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import App from "./app/app"
import { BrowserRouter } from "react-router-dom" 
import "bootstrap/dist/css/bootstrap.css"

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
)

reportWebVitals();
