import React from 'react';
import { Link } from 'react-router-dom';
import Book from '../../types';
import './bookCard.css';

interface BookCardProps {
  book: Book;
}

export default function BookCard(props: BookCardProps) {
  const { id, title, authors, description } = props.book;

  return (
    <Link to={`/book?id=${id}`} className="bookCard">
      <h2>{title}</h2>
      {/* <p>{authors[0]}</p> */}
      {/* <p>{description}</p> */}
    </Link>
  );
}
