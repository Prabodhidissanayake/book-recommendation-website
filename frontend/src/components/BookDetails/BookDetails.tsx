import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import './bookDetails.css';

export default function BookDetails() {
  const [bookInfo, setBookInfo] = useState<any>(null);
  const [rating, setRating] = useState<number | undefined>();
  const [comment, setComment] = useState<string | undefined>();
  const [hasCommented, setHasCommented] = useState(false);
  const searchParams = new URLSearchParams(useLocation().search);
  const id = searchParams.get('id');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBookInfo() {
      try {
        const response = await fetch(`http://localhost:3000/api/books/${id}`);
        if (response.status === 204) {
          setTimeout(() => {
            navigate('/');
          }, 3000);
          throw new Error('No book found');
        } else if (response.ok) {
          const data = await response.json();
          setBookInfo(data);
        } else {
          throw new Error('Something went wrong');
        }
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchReview() {
      try {
        const response = await fetch(`http://localhost:3000/api/reviews/${id}`);
        if (response.status === 204) {
          return;
        } else if (response.ok) {
          const data = await response.json();
          setHasCommented(true);
          setRating(data.rating);
          setComment(data.comment);
        } else {
          throw new Error('Something went wrong');
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchBookInfo();
    fetchReview();
  }, [id, navigate]);

  async function handleCommentSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const url = hasCommented
        ? `http://localhost:3000/api/reviews/${id}`
        : 'http://localhost:3000/api/reviews';
      const method = hasCommented ? 'PATCH' : 'POST';
      const body = hasCommented
        ? { rating, comment }
        : { bookId: id, rating, comment };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setHasCommented(true);
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteReview() {
    try {
      const response = await fetch(`http://localhost:3000/api/reviews/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setHasCommented(false);
        setRating(undefined);
        setComment(undefined);
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <NavBar />
      <div className="bookDetails">
        {bookInfo ? (
          <div className="bookDetails__top">
            <h2 className="bookDetails__items">
              <span className="bookDetails__label">Title: </span>{' '}
              {bookInfo.title}
            </h2>
            <p className="bookDetails__items">
              <span className="bookDetails__label">Author:</span>{' '}
              {bookInfo.authors}
            </p>
            <p className="bookDetails__items">
              <span className="bookDetails__label">Description:</span>
              <br />
              <span
                dangerouslySetInnerHTML={{ __html: bookInfo.description }}
              />
            </p>
            <form className="bookDetails__form" onSubmit={handleCommentSubmit}>
              <div className="bookDetails__form__Rating">
                <label className="bookDetails__form__Rating__label">
                  Rating:
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={rating}
                  onChange={(event) =>
                    setRating(parseInt(event.target.value))
                  }
                  required
                />
              </div>
              <div className="bookDetails__form__Comment">
                <label className="bookDetails__form__Comment__label">
                  Comment:
                </label>
                <textarea
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                />
              </div>
              <div className="bookDetails__form__btn">
                <button type="submit">
                  {hasCommented ? 'Update Review' : 'Submit Review'}
                </button>
                {hasCommented && (
                  <button type="button" onClick={handleDeleteReview}>
                    Delete Review
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </>
  );  
}
