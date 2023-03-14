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

const updateReview = async (id:string, rating:number, comment:string): Promise<Review> => {
  const col: mongoDB.Collection = client.db().collection(collectionName);
  const updatedReview = await col.findOneAndUpdate(
    { _id: id },
    { $set: { rating, comment } },
    { returnOriginal: false },
  );
  return updatedReview.value;
};

const deleteReview = async (id: string): Promise<void> => {
  const col: mongoDB.Collection = client.db().collection(collectionName);
  await col.deleteOne({ _id: id });
};

export default {
  addReview, getReview, updateReview, deleteReview,
};
