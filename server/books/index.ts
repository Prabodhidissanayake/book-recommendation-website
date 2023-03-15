import axios from 'axios';
import { getPreference } from '../preferences/index';

export const getRecommendations = async () => {
  const preference = await getPreference();
  const { genres } = preference;

  if (genres.length === 0) {
    return null;
  }

  const subjects = genres.map(genre => `subject:${genre}`);
  const query = subjects.join('+');
  const uri = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
  const { data: recommendations } = await axios.get(uri);

  if (recommendations.totalItems > 0) {
    return recommendations.items.map(item => ({
      id: item.id,
      ...item.volumeInfo,
    }));
  }
  return null;
};

export const getSearchResults = async (title, genre) => {
  const baseUri = 'https://www.googleapis.com/books/v1/volumes?q=';
  let queryString = '';

  if (title) {
    queryString += `${title}`;
  }
  if (genre) {
    queryString += `${title ? '+' : ''}subject:${genre}`;
  }

  const uri = `${baseUri}${queryString}`;
  const { data: recommendations } = await axios.get(uri);
  if (recommendations.totalItems > 0) {
    return recommendations.items.map(item => ({
      id: item.id,
      ...item.volumeInfo,
    }));
  }
  return null;
};

export const getBookById = async (id: string) => {
  const uri = `https://www.googleapis.com/books/v1/volumes/${id}`;

  try {
    const { data: book } = await axios.get(uri);

    if (book && book.volumeInfo) {
      return {
        id: book.id,
        ...book.volumeInfo,
      };
    }
    return null;
  } catch (e) {
    return null;
  }
};
