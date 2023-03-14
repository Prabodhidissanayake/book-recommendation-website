import Review from '../types/review';
import db from './db';

const { v4: uuidv4 } = require('uuid');

const username: string = 'dummyUser';

export const addReview = async (
  rating: number,
  comment: string
): Promise<Review> => {
  const review: Review = { _id: uuidv4(), username, rating, comment };
  return db.addReview(review);
};
