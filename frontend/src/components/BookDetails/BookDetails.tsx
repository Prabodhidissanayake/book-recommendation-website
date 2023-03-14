import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
      const url = hasCommented ? `http://localhost:3000/api/reviews/${id}` : 'http://localhost:3000/api/reviews';
      const method = hasCommented ? 'PATCH' : 'POST';
      const body = hasCommented ? { rating, comment } : { bookId: id, rating, comment };
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      
      if (response.ok) {
        setHasCommented(true);
        alert('Comment submitted!');
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.error(error);
    }
  }  

  return (
    <div>
      {bookInfo ? (
        <div>
          <h2>{bookInfo.title}</h2>
          <p>{bookInfo.author}</p>
          <p>{bookInfo.description}</p>
          <form onSubmit={handleCommentSubmit}>
            <label>
              Rating:
              <input
                type="number"
                min="1"
                max="10"
                value={rating}
                onChange={(event) => setRating(parseInt(event.target.value))}
                required
              />
            </label>
            <label>
              Comment:
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />
            </label>
            <button type="submit">
              {hasCommented ? 'Update Comment' : 'Submit Comment'}
            </button>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
