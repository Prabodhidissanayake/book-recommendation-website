import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BookDetails() {
  const [bookInfo, setBookInfo] = useState<any>(null);
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

  return (
    <div>
      {bookInfo ? (
        <div>
          <h2>{bookInfo.title}</h2>
          <p>{bookInfo.author}</p>
          <p>{bookInfo.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
