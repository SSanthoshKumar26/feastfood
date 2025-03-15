import React, { useRef, useEffect, useState } from 'react';
import './Header.css';

const Header = () => {
  const videoRef = useRef(null);
  const [fadeIn, setFadeIn] = useState(false);

  // Restart video when it ends
  const handleVideoEnd = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };

  // Trigger fade-in animation for Header content
  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 2000); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="header">
      {/* Video Background */}
      <div className="background-container">
        <video
          ref={videoRef}
          src={require('../../assets/video1.mp4')}
          autoPlay
          muted
          loop
          playsInline
          onEnded={handleVideoEnd}
          className="background-video"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Header Content */}
      <div className="header-contents">
        <h1>Feast Spot</h1>
        <h2>Order your favourite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes that cater to every taste. Enjoy savory starters, fresh salads, mouthwatering mains, and indulgent desserts, all crafted with high-quality ingredients.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
