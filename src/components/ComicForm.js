// ComicForm.js
import React, { useState } from 'react';
import { generateComic } from '../services/comicApi';
import './ComicForm.css';
import FeedbackForm from './FeedbackForm';

const ComicForm = () => {
  const [textInputs, setTextInputs] = useState(Array(10).fill(''));
  const [comicImages, setComicImages] = useState(Array(10).fill(null));
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, value) => {
    const newInputs = [...textInputs];
    newInputs[index] = value;
    setTextInputs(newInputs);
  };

  const handleGenerateComic = async () => {
    try {
      setLoading(true);
      const results = await Promise.all(textInputs.map(async (text) => {
        if (text) {
          return await generateComic(text);
        }
        return null;
      }));
      setComicImages(results.map(result => result ? URL.createObjectURL(result) : null));
      setError(null);
    } catch (error) {
      setComicImages(Array(10).fill(null));
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
        {textInputs.map((text, index) => (
          <div key={index} className="panel-row">
            <label className="label">{`Panel ${index + 1}: `}</label>
            <input
              type="text"
              value={text}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}
        <button type="submit">Generate Comic</button>
      </form>

      {loading && (
        <div className="spinner-container">
          <p className="loading">Loading...</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {comicImages.some(image => image !== null) && (
        <div className="generated-comic">
          {comicImages.map((image, index) => (
            image && (
              <div key={index}>
                <h2>{`Generated Comic - Panel ${index + 1}: ${textInputs[index] || 'No text entered'}`}</h2>
                <img src={image} alt={`Generated Comic - Panel ${index + 1}: ${textInputs[index] || 'No text entered'}`} />
              </div>
            )
          ))}
        </div>
      )}

    <FeedbackForm />
    </div>
  );
};

export default ComicForm;
