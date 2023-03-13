import Preference from '../types/preference';
import * as mongoDB from 'mongodb';
import client from '../db/client';

const collectionName = 'perference';

const addPreference = async (preference: Preference): Promise<Preference> => {
  const col: mongoDB.Collection = client.db().collection(collectionName);
  await col.insertOne(preference);
  return preference;
};

export default {
  addPreference,
};
