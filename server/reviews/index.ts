import Review from '../types/review';
import db from './db';

const { v4: uuidv4 } = require('uuid');

const username: string = 'dummyUser';

export const addReview = async (
  bookId: string,
  rating: number,
  comment: string,
): Promise<Review> => {
  const review: Review = {
    _id: uuidv4(),
    username,
    bookId,
    rating,
    comment,
  };
  return db.addReview(review);
};

export const getReview = async (id: string): Promise<Review> => db.getReview(id);

export const updateReview = async (
  id: string,
  rating: number,
  comment: string,
): Promise<Review> => db.updateReview(id, rating, comment);
