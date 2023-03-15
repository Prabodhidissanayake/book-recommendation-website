import * as mongoDB from 'mongodb';
import client from '../db/client';
import Review from '../types/review';

const collectionName = 'reviews';

const addReview = async (review: Review): Promise<Review> => {
  const col: mongoDB.Collection = client.db().collection(collectionName);
  await col.insertOne(review);
  return review;
};

const getReview = async (bookId: string, username: string): Promise<Review> => {
  const col: mongoDB.Collection = client.db().collection(collectionName);
  const review = await col.findOne({ bookId, username });
  return review;
};

const updateReview = async (
  bookId: string,
  username: string,
  rating: number,
  comment: string,
): Promise<Review> => {
  const col: mongoDB.Collection = client.db().collection(collectionName);
  const updatedReview = await col.findOneAndUpdate(
    { bookId, username },
    { $set: { rating, comment } },
    { returnOriginal: false },
  );
  return updatedReview.value;
};

const deleteReview = async (
  bookId: string,
  username: string,
): Promise<void> => {
  const col: mongoDB.Collection = client.db().collection(collectionName);
  await col.deleteOne({ bookId, username });
};

export default {
  addReview,
  getReview,
  updateReview,
  deleteReview,
};
