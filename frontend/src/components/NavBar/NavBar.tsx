import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';

export default function NavBar() {
  return (
    <nav>
      <Link to="/">
        <h1 className="nav__title nav__title-top">BookLover</h1>
      </Link>
      <Link to="/">
        <h3 className="nav__title nav__title-bottom">
          Book Recommendation Website
        </h3>
      </Link>
      <ul className="nav__list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/preferences">My Preferences</Link>
        </li>
      </ul>
    </nav>
  );
}
