import React from 'react'
import { Link } from 'react-router-dom';
import "./Navbar.css"

function Navbar() {
  return (
    <div className='Navbar'>
        <img src="assets/logo.png" alt="logo" />
        <div className='navbar-comp'>
        
        <ul>
          <li>
            <Link to="/" className="nav-link" >Home</Link>
          </li>
          <li><Link to="/encrypt" className="nav-link" >Encrypt</Link></li>
          <li><Link to="/decrypt" className="nav-link" >Decrypt</Link></li>
        </ul>
      </div>

      
    </div>
  )
}

export default Navbar
