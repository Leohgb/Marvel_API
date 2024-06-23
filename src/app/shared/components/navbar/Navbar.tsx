import './Navbar.css'
import Marvel_logo from "../../../../assets/Marvel_logo.png"
import { useState } from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((open) => !open)
  }

  return (
    <div>
      <nav id="navbar">
        <Link to={'/Home'}><img src={Marvel_logo} alt="logo" /></Link>
        <div className={`header_items ${isOpen ? "isOpen" : ""}`}>
          <Link to={'/Home'}><li>Home</li></Link>
          <a href="#Footer"><li>Links</li></a>
        </div>
        <div onClick={toggleMenu} id="burger" className='header_trigger'>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar

