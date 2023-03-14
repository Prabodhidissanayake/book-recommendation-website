import Review from '../types/review';
import db from './db';

const username: string = 'dummyUser';

export const addReview = async (
  bookId: string,
  rating: number,
  comment: string
): Promise<Review> => {
  const review: Review = {
    username,
    bookId,
    rating,
    comment,
  };
  return db.addReview(review);
};

export const getReview = async (bookId: string): Promise<Review> =>
  db.getReview(bookId, username);

export const updateReview = async (
  bookId: string,
  rating: number,
  comment: string
): Promise<Review> => db.updateReview(bookId, username, rating, comment);

export const deleteReview = async (bookId: string): Promise<void> =>
  db.deleteReview(bookId, username);
