import React from 'react';
import ReactDOM from 'react-dom/client';  // Use React 18's 'createRoot' API
import App from './App.jsx';  // Ensure the correct path to the App component
import './index.css';  // Your main CSS file (if any)
import { BrowserRouter } from 'react-router-dom';  // For routing support

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
