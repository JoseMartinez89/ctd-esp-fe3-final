import React from 'react';
import './Footer.css';
import { useContextGlobal } from './utils/global.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTiktok, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const { theme } = useContextGlobal();

  return (
    <footer className={theme}>
      <div className="footer-content">
        <img src="/images/DH.png" alt='DH-logo' />
      </div>
      <div className="social-icons">
        <a href={"https://www.facebook.com/"} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebook} className="icon" /> 
        </a>
        <a href={"https://www.instagram.com/"} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} className="icon" />
        </a>
        <a href={"https://www.tiktok.com/"} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTiktok} className="icon" />
        </a>
        <a href={"https://web.whatsapp.com/"} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faWhatsapp} className="icon" />
        </a>
      </div>
     
    </footer>
  );
}

export default Footer;

