// ComicForm.js
import React, { useState } from 'react';
import { generateComic } from '../services/comicApi';
import './ComicForm.css';

const ComicForm = () => {
  const [textInput, setTextInput] = useState('');
  const [comicImage, setComicImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (value) => {
    setTextInput(value);
  };

  const handleGenerateComic = async () => {
    try {
      setLoading(true);
      const result = await generateComic(textInput);
      setComicImage(URL.createObjectURL(result));
      setError(null);
    } catch (error) {
      setComicImage(null);
      setError('Error generating comic. Please try again.');
      console.error('Error generating comic:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGenerateComic();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="comicInput">Enter your comic text:</label>
          <input
            id="comicInput"
            type="text"
            value={textInput}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        <button type="submit">Generate Comic</button>
      </form>

      {loading && (
        <div className="loading">
          <p>Loading...</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {comicImage && (
        <div className="generated-comic">
          <h2>Generated Comic</h2>
          <img src={comicImage} alt="Generated Comic" />
        </div>
      )}
    </div>
  );
};

export default ComicForm;
