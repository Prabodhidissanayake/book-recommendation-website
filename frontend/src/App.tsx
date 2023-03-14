import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reset.css';
import './App.css';
import BookCard from './components/bookCard/BookCard';
import Book from './types';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

function App() {
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [searchText, setSearchText] = useState('');

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

  const search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const uri =
      searchText.length > 0 || selectedGenre.length > 0
        ? `http://localhost:3000/api/books/search?title=${searchText}&genre=${selectedGenre}`
        : 'http://localhost:3000/api/books/recommendations';
    fetch(uri)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      });
  };

  return (
    <>
      <header>
        <NavBar></NavBar>
      </header>
      <section className="search-bar">
        <form id="form" onSubmit={search}>
          <input
            type="search"
            id="query"
            name="q"
            placeholder="Search..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
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
          <input type="submit" id="searchBtn" className="" value="Search" />
          {/* <button onClick={search}>Search</button> */}
        </form>
      </section>
      <main className="container">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </main>
      <footer>
      <Footer></Footer>
      </footer>

    </>
  );
}

export default App;
