import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const Logout = async() => {
    try {
      await axios.delete("https://mynotes-backend-dot-project-180324-b-03.et.r.appspot.com/logout");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <nav className="navbar is-light p-3" role="navigation" aria-label="main navigation">
      <div className="container">
      <div className="navbar-brand">
        <a className="navbar-item" href="/dashboard">
          <h1 className='title is-5 has-text-success'>MyNotes</h1>
        </a>
      </div>

      <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button onClick={Logout} className="button is-light">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar