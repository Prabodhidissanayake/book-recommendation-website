import React from 'react';
import { Link } from 'react-router-dom';
import Book from '../../types';
import './bookCard.css';

interface BookCardProps {
  book: Book;
}

export default function BookCard(props: BookCardProps) {
  const { id, title, authors, description, imageLinks } = props.book;
  return (
    <Link to={`/book?id=${id}`} className="bookCard">
      {imageLinks && imageLinks.smallThumbnail && (
        <img className="bookCard__pic" src={imageLinks.smallThumbnail} alt="" />
      )}
      {title && (
        <h2 className="bookCard__items">
          <span className="bookCard__label">Title: </span> {title.slice(0, 50)}
        </h2>
      )}

      {authors && (
        <p className="bookCard__items">
          <span className="bookCard__label">Author: </span>
          {authors[0].slice(0, 20)}
        </p>
      )}

      {description && (
        <p className="bookCard__items">
          {' '}
          <span className="bookCard__label">Description: </span>
          {description.slice(0, 350)}........
        </p>
      )}
    </Link>
  );
}
