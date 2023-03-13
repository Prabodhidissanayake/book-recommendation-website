import Preference from '../types/preference';
import db from './db';
const { v4: uuidv4 } = require('uuid');

export const addPreference = async (preference: Preference): Promise<Preference> => {
  preference._id = uuidv4();
  return db.addPreference(preference);
};
