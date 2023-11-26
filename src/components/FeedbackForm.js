// src/components/FeedbackForm.js
import React, { useState } from 'react';
import { db } from '../firebase';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (feedback.trim() !== '') {
        await db.collection('feedback').add({
          feedback,
          timestamp: new Date(),
        });
        alert('Feedback submitted successfully!');
        setFeedback('');
      } else {
        alert('Please enter your feedback before submitting.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error.message);
      alert('Oops! Something went wrong. Please try again.');
    }
  };

  return (
    <div className="feedback-container">
      <h2>Provide Your Feedback</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback here..."
        />
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
