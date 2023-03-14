import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reset.css';
import './App.css';
import BookCard from './components/bookCard/BookCard';

function App() {
  return (
  <>
  <header>
    <nav>
    <h1 className='nav__title nav__title-top'>BookLover</h1>
    <h3 className='nav__title nav__title-bottom'>Book Recommendation Website</h3>
    <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">My Preferences</a></li>
    </ul>
    </nav>
  </header>
  <section className='search-bar'>
  <form id="form"> 
  <input type="search" id="query" name="q" placeholder="Search..."/>
  <select name="" id="">
  <option value="">All</option>
    <option value="">Romance</option>
    <option value="">History</option>
    <option value="">Science Fiction</option>
    <option value="">Fiction</option>
  </select>
  <button>Search</button>
</form>
  </section>
  <main className='container'>
    <BookCard/>
  </main>

  </>
);
}

export default App;
