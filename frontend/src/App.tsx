import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reset.css';
import './App.css';
import BookCard from './components/bookCard/BookCard';
import Book from './types'

function App() {
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/genres')
      .then((response) => response.json())
      .then((data) => {
        setGenres(data);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/api/books/recommendations')
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);

  return (
    <>
      <header>
        <nav>
          <h1 className="nav__title nav__title-top">BookLover</h1>
          <h3 className="nav__title nav__title-bottom">
            Book Recommendation Website
          </h3>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">My Preferences</a>
            </li>
          </ul>
        </nav>
      </header>
      <section className="search-bar">
        <form id="form">
          <input type="search" id="query" name="q" placeholder="Search..." />
          <select
            id=""
            name=""
            className=""
            value={selectedGenre}
            onChange={(event) => setSelectedGenre(event.target.value)}
          >
            <option key="all" value="">
              All
            </option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <button>Search</button>
        </form>
      </section>
      <main className="container">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </main>
    </>
  );
}

export default App;
