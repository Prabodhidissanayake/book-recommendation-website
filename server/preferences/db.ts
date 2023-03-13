import * as mongoDB from 'mongodb';
import Preference from '../types/preference';
import client from '../db/client';

const collectionName = 'perference';

const addPreference = async (preference: Preference): Promise<Preference> => {
  const col: mongoDB.Collection = client.db().collection(collectionName);
  await col.insertOne(preference);
  return preference;
};

const getPreferenceForUser = async (username: string): Promise<Preference> => {
  const col: mongoDB.Collection = client.db().collection(collectionName);
  const cart = await col.findOne({ username });
  return cart;
};

const updatePreferenceGenres = async (username: string, genres: string[]): Promise<Preference> => {
  const col: mongoDB.Collection = client.db().collection(collectionName);
  const updatedPreference = await col.findOneAndUpdate(
    { username },
    { $set: { genres } },
    { returnOriginal: false },
  );
  return updatedPreference.value;
};

export default {
  addPreference, getPreferenceForUser, updatePreferenceGenres,
};
