import React, { useEffect, useState } from 'react';

export default function Preferences() {
  const [preferences, setPreferences] = useState<any>(null);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    async function fetchPreferences() {
      try {
        const response = await fetch('http://localhost:3000/api/preferences');
        if (response.ok) {
          const data = await response.json();
          setPreferences(data);
          setSelectedGenres(data.genres || []);
        } else {
          //   throw new Error('Something went wrong');
        }
      } catch (error) {
        // console.error(error);
      }
    }
    async function fetchGenres() {
      try {
        const response = await fetch('http://localhost:3000/api/genres');
        if (response.ok) {
          const data = await response.json();
          setGenres(data);
        } else {
          throw new Error('Something went wrong');
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchPreferences();
    fetchGenres();
  }, []);

  async function handlePreferencesSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    try {
      const method = preferences ? 'PATCH' : 'POST';
      const url = 'http://localhost:3000/api/preferences';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          genres: selectedGenres,
        }),
      });
      if (response.ok) {
        alert('Preferences saved!');
        const data = await response.json();
        setPreferences(data);
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleGenreSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (selectedGenres.includes(value)) {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
    } else {
      setSelectedGenres([...selectedGenres, value]);
    }
  }

  return (
    <div>
      <div>
        {/* <h2>{preferences.username}'s Preferences</h2> */}
        <form onSubmit={handlePreferencesSubmit}>
          {genres.map((genre) => (
            <div key={genre}>
              <input
                type="checkbox"
                value={genre}
                checked={selectedGenres.includes(genre)}
                onChange={handleGenreSelect}
              />
              <label>{genre}</label>
            </div>
          ))}
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
