import React, { useState } from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <h1 style={{ color: '#FFD700' }}>Feast Spot</h1>
          <p>
            Welcome to Feast Spot, your go-to destination for delicious food and unforgettable experiences.
            Explore our variety of dishes and services to satisfy your cravings!
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>COMPANY</h2>

          {/* About Us Section */}
          <div className="footer-toggle-section" onClick={() => toggleSection(0)}>
            <p>About Us</p>
          </div>
          <div className={`footer-toggle-content ${activeSection === 0 ? 'active' : ''}`}>
            <p>
              Feast Spot is a food haven, bringing the best flavors and the most unique culinary experiences
              to your doorstep. We pride ourselves on delivering quality and satisfaction.
            </p>
          </div>

          {/* Delivery Section */}
          <div className="footer-toggle-section" onClick={() => toggleSection(1)}>
            <p>Delivery</p>
          </div>
          <div className={`footer-toggle-content ${activeSection === 1 ? 'active' : ''}`}>
            <p>
              Enjoy fast and reliable delivery services with Feast Spot. We ensure that your meals arrive hot
              and fresh, right at your doorstep.
            </p>
          </div>

          {/* Privacy Policy Section */}
          <div className="footer-toggle-section" onClick={() => toggleSection(2)}>
            <p>Privacy Policy</p>
          </div>
          <div className={`footer-toggle-content ${activeSection === 2 ? 'active' : ''}`}>
            <p>
              Your privacy is our priority. Feast Spot ensures that your personal data is kept secure and
              used only for providing the best service possible.
            </p>
          </div>
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 560985760</li>
            <li>contact@feastspot.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 @ FeastSpot.com - All rights Reserved
      </p>
    </div>
  );
};

export default Footer;
