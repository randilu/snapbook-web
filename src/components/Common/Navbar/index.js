import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logos/logo.png';
import { ROUTES } from '../../../constants';
import './styles.scss';

function Navbar() {
  return (
    <>
      <div className="brand-name-container">
        <span><img src={logo} alt="snap-book-logo" /></span>
      </div>
      <div className="navigation-container">
        <Link to={ROUTES.GALLERY} className="navigation-link">
          📷 GALLERY
        </Link>
        {' | '}
        <Link to={ROUTES.ALBUM} className="navigation-link">
          📓 ALBUM
        </Link>
      </div>
    </>
  );
}

export default Navbar;
