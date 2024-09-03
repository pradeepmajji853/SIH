import React from 'react';
import "./Homepage.css";

function Homepage() {
  return (
    <div className='Homepage'>
      <img className='homepage-image' src="assets/text1.png" alt="cryptography" />
      <div className='text-content'>
        <p>The practice of securing communication and data through encoding techniques, ensuring that only intended recipients can access the information.</p>
        <p>It involves encryption and decryption methods to protect confidentiality, integrity, and authenticity in digital systems.</p>
      </div>
    </div>
  );
}

export default Homepage;
