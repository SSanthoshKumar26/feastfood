import React from 'react';
import './Navbar.css'; // Ensure your CSS file is correctly set up
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-title">Feast Spot</div> {/* Website name */}
      <img className="profile" src={assets.profile_image} alt="Admin Profile" /> {/* Profile image */}
    </div>
  );
};

export default Navbar;
