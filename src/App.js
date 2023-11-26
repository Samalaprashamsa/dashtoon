// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComicForm from './components/ComicForm';
import ComicDisplay from './components/ComicDisplay';
import { generateComic } from './services/comicApi';
import './App.css';

const App = () => {
  const [comicImages, setComicImages] = useState([]);

  const handleGenerateComic = (texts) => {
    generateComic(texts)
      .then((response) => {
        setComicImages(response.data.images);
      })
      .catch((error) => {
        console.error('Error generating comic:', error);
        // Handle error and provide user feedback
      });
  };

  return (
    <Router>
      <Routes>
  <Route path="/" element={<ComicForm onSubmit={handleGenerateComic} />} />
  <Route path="/comic" element={<ComicDisplay images={comicImages} />} />
</Routes>
    </Router>
  );
};

export default App;
