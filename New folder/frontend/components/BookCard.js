import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookCard.css';

const BookCard = ({ title, author, description, coverImage, infoLink }) => {
  const navigate = useNavigate();

  const handleMoreInfoClick = () => {
    navigate('/library');
  };

  return (
    <div className="book-card">
      <img className="book-cover" src={coverImage} alt="Book Cover" />
      <div className="book-info">
        <h3 className="book-title">{title}</h3>
    
        <button onClick={handleMoreInfoClick} className="info-button">
          Read
        </button>
      </div>
    </div>
  );
};

export default BookCard;
