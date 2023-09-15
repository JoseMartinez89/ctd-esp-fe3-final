import React from 'react';
import { Link } from 'react-router-dom';
import { useContextGlobal } from './utils/global.context';
import './Navbar.css';


const Navbar = () => {
  const { theme, setTheme } = useContextGlobal();


  const cambiarTema = () => {
 
    const nuevoTema = theme === 'light' ? 'dark' : 'light'; 
    setTheme(nuevoTema);
  };


  return (
    <nav className={theme}>
      <div className="icon">
        <img src="/images/DH.ico" alt="DH Icon" />
      </div>
      
      <Link to='/'><h4>Home</h4></Link>
      <Link to='/contact'><h4>Contact</h4></Link>
      <Link to='/favs'><h4>Favs</h4></Link>
      <button onClick={cambiarTema}>Light/Dark</button>
    </nav>
  );
};

export default Navbar;
