import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/Storecontext';

const Navbar = ({ setShowLogin }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { getTotalCartAmount, token, setToken, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Logout function
  const logout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    setIsLoggingOut(true);
    try {
      localStorage.removeItem("token");
      setToken(""); // Clear the token
      clearCart();  // Clear cart items on logout
      alert("You have been logged out successfully.");
      navigate('/'); // Redirect to home
    } catch (error) {
      console.error("Logout failed:", error);
      alert("An error occurred during logout.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Redirect user if not logged in (when trying to access protected pages)
  useEffect(() => {
    if (!token && location.pathname !== '/') {
      setShowLogin(true); // Show login popup
      navigate('/'); // Redirect to home page
      alert("Please log in to access this page.");
    }
  }, [token, location.pathname, setShowLogin, navigate]);

  // Navigate to Verify Page
  const navigateToVerify = () => {
    navigate('/verify'); // Navigate to the Verify page
  };

  return (
    <>
      <nav className='navbar'>
        {/* Logo */}
        <Link to='/'>
          <img src={assets.logo} alt="Logo" className="logo" />
        </Link>

        {/* Navbar Menu */}
        <ul className="navbar-menu">
          <Link to='/' className={location.pathname === "/" ? "active" : ""}>Home</Link>
          <a href="#explore-menu" className={location.hash === "#explore-menu" ? "active" : ""}>menu</a>
          <a href="#app-download" className={location.hash === "#app-download" ? "active" : ""}>mobile App</a>
          <a href="#footer" className={location.hash === "#footer" ? "active" : ""}>Contact us</a>
        </ul>

        {/* Navbar Right Section */}
        <div className="navbar-right">
          <img src={assets.search_icon} alt="Search Icon" />
          <div className="navbar-search-icon">
            <Link to='/cart'>
              <img src={assets.basket_icon} alt="Shopping Basket" />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>

          {/* Sign In / Profile Section */}
          {!token ? (
            <button onClick={() => setShowLogin(true)}>
              Sign In
            </button>
          ) : (
            <div
              className='navbar-profile'
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img src={assets.profile_icon} alt="Profile Icon" />
              {showDropdown && (
                <ul className="nav-profile-dropdown">
                  <li >
                    <img src={assets.bag_icon} alt="Orders Icon" />
                    <p>Orders</p>
                  </li>
                  <hr />
                  <li onClick={logout}>
                    <img src={assets.logout_icon} alt="Logout Icon" />
                    <p>{isLoggingOut ? "Logging out..." : "Logout"}</p>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </nav>
      <hr className="navbar-hr" />
    </>
  );
};

export default Navbar;
