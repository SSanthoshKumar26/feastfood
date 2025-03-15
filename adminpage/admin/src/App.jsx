import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';  // Make sure the path is correct
import Sidebar from './components/Sidebar/Sidebar';  // Ensure Sidebar path is correct
import { Order } from './pages/Orders/Order';
import List from './pages/List/List';
import Add from './pages/Add/Add';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url="http://localhost:7007"
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className='app-content'>
        <Sidebar />
        <Routes>
       
          <Route path="/add" element={<Add url={url}/>} />
          <Route path="/list" element={<List url={url}/>} />
          <Route path="/order" element={<Order url={url}/>} />
        
        </Routes>
      </div>
    </div>
  );
}

export default App;

