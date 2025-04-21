import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookCard.css'; // Reuse BookCard styles

const VideoCard = ({ title, thumbnail, videoUrl }) => {
  const navigate = useNavigate();

  const handleMoreInfoClick = () => {
    navigate('/libraryvideo');
  };

  return (
    <div className="book-card">
      <img className="book-cover" src={thumbnail} alt="Video Thumbnail" />
      <div className="book-info">
        <h3 className="book-title">{title}</h3>
        <button onClick={handleMoreInfoClick} className="info-button">
          Watch Video
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
