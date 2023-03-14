import axios from 'axios';
import { getPreference } from '../preferences/index';

const getRecommendations = async () => {
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

export default { getRecommendations };
