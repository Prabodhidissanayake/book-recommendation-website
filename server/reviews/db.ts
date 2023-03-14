import client from "../db/client";
import Review from "../types/review";
import * as mongoDB from 'mongodb';

const collectionName = 'reviews';

 const addReview = async (review:Review): Promise<Review> => {
  const col: mongoDB.Collection = client.db().collection(collectionName);
  await col.insertOne(review);
  return review;
};

export default {addReview}