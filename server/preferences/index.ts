import Preference from '../types/preference';
import db from './db';

const { v4: uuidv4 } = require('uuid');

const username: string = 'dummyUser';

export const addPreference = async (
  genres:string[],
): Promise<Preference> => {
  const preferenceToSave:Preference = {
    _id: uuidv4(),
    username,
    genres,
  };
  return db.addPreference(preferenceToSave);
};

export const getPreference = async (): Promise<Preference> => db.getPreferenceForUser(username);

export const updateGenres = async (genres:string[]):Promise<Preference> => db.updatePreferenceGenres(username, genres);
