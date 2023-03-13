import Preference from '../types/preference';
import db from './db';
const { v4: uuidv4 } = require('uuid');

const username: string = 'dummyUser';

export const addPreference = async (
  preference: Preference
): Promise<Preference> => {
  preference._id = uuidv4();
  preference.username = username;
  return db.addPreference(preference);
};

export const getPreference = async (): Promise<Preference> => {
  return db.getPreferenceForUser(username);
};
