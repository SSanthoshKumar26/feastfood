import React from 'react';
import './Sidebar.css'; 
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-option">
        <NavLink 
          to="/add" 
          className={({ isActive }) => isActive ? 'sidebar-options active' : 'sidebar-options'}
        >
          <img src={assets.add_icon} alt="Add Icon" />
          <p>Add Items</p>
        </NavLink>
        <NavLink 
          to="/list" 
          className={({ isActive }) => isActive ? 'sidebar-options active' : 'sidebar-options'}
        >
          <img src={assets.order_icon} alt="Order Icon" />
          <p>List Items</p>
        </NavLink>
        <NavLink 
          to="/order" 
          className={({ isActive }) => isActive ? 'sidebar-options active' : 'sidebar-options'}
        >
          <img src={assets.order_icon} alt="Order Icon" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
