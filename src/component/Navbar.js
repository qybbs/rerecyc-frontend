import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar is-light p-0 pl-6 " role="navigation" aria-label="main navigation">
      <div className="container">
      <div className="navbar-brand">
      <a href='/' className='container is-flex is-align-items-center p-3' style={{ fontFamily: "cursive", color: "#17726d" }}>
      <img src="1.png" style={{ objectFit: "cover", height: "50px" }}/>RERECYC
      </a>

          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
      </div>
      </div>
      <div className='navbar-menu' id='navbarBasicExample'>
        <div className='navbar-end'>
          <a className='navbar-item' href='/'>Mitra</a>
          <a className='navbar-item' href='/status'>Status</a>
          <a className='navbar-item' href='/perolehan'>Perolehan</a>
          <a className='navbar-item' href='/anggaran'>Anggaran</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar