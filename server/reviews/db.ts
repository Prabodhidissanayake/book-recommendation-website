import * as mongoDB from 'mongodb';
import client from '../db/client';
import Review from '../types/review';

const collectionName = 'reviews';

const addReview = async (review:Review): Promise<Review> => {
  const col: mongoDB.Collection = client.db().collection(collectionName);
  await col.insertOne(review);
  return review;
};

const getReview = async (id: string): Promise<Review> => {
  const col: mongoDB.Collection = client.db().collection(collectionName);
  const review = await col.findOne({ _id: id });
  return review;
};
export default { addReview, getReview };
