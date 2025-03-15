import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import StoreContextProvider from './context/Storecontext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreContextProvider> {/* The StoreContextProvider should work fine */}
        <App />
      </StoreContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
