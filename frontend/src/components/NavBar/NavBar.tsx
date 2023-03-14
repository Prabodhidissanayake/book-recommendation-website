import React from 'react';
import './navBar.css';

export default function NavBar() {
  return (
      <nav>
        <h1 className="nav__title nav__title-top">BookLover</h1>
        <h3 className="nav__title nav__title-bottom">
          Book Recommendation Website
        </h3>
        <ul className='nav__list'>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">My Preferences</a>
          </li>
        </ul>
      </nav>

  );
}
