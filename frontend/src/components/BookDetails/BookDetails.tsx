import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BookDetails() {
  const [bookInfo, setBookInfo] = useState<any>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
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
    fetchBookInfo();
  }, [id, navigate]);

  async function submitReview() {
    if (rating === 0) {
      alert('Please enter a rating');
      return;
    }
    const body = {
      bookId: id,
      rating,
      comment,
    };
    try {
      const response = await fetch('http://localhost:3000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        alert('Review submitted successfully');
        setRating(0);
        setComment('');
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
          <div>
            <label htmlFor="rating">Rating:</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button onClick={submitReview}>Submit Review</button>
        </div>
      ) : (
        <p>No book found. Redirecting to home page...</p>
      )}
    </div>
  );
}
