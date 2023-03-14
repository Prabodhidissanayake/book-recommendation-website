import React from 'react';
import Book from '../../types';
import './bookCard.css';

interface BookCardProps {
  book: Book;
}

export default function BookCard(props: BookCardProps) {
  const { title, authors, description } = props.book;
  return (
    <div className="bookCard">
      <h2>{title}</h2>
      {/* <p>{authors[0]}</p> */}
      {/* <p>{description}</p> */}
    </div>
  );
}
