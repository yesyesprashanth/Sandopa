import React from 'react';
import Modal from 'react-modal';
import './LoginForm.css';
import BookCard from '../components/BookCard';
import VideoCard from '../components/VideoCard';
import LoginCard from '../components/LoginCard';

// Import dummy images
import gate from '../assest/gate.jpeg';
import mocking from '../assest/mocking.jpeg';
import ninteen from '../assest/ninteen.png';
import moby from '../assest/moby.jpeg';
import tinnitus from '../assest/tinnitus.png'
import vestibular from '../assest/vestibular.png'
import centralaudi from '../assest/centralaudi.png'
import communication from '../assest/communication.png'

Modal.setAppElement('#root');

// Dummy data for books
const dummyBooks = [
  {
    id: 1,
    title: "Tinitus",
    coverImage: tinnitus
  },

  {
    id: 2,
    title: "Vestibular Disorders",
    coverImage: vestibular
  },
  {
    id: 3,
    title: "Communication and Listining Training Unit",
    coverImage: communication
  },
  {
    id: 4,
    title: "Central Auditory Processing Disorder",
    coverImage: centralaudi
  },

];

// Dummy data for videos
const dummyVideos = [
  {
    id: 1,
    title: "Tinnitus",
    thumbnail: gate,
    videoUrl: "https://youtu.be/aEWv9KOgHg4?si=sJ6WKIKfpMVHJO0h",
  },
  {
    id: 2,
    title: "JavaScript Basics",
    thumbnail: moby,
    videoUrl: "https://www.youtube.com/watch?v=upDLs1sn7g4",
  },
  {
    id: 3,
    title: "HTML for Beginners",
    thumbnail: centralaudi,
    videoUrl: "https://www.youtube.com/watch?v=pQN-pnF0RA0",
  },
  {
    id: 4,
    title: "CSS Advanced",
    thumbnail: mocking,
    videoUrl: "https://www.youtube.com/watch?v=1Rs2ND1ryY4",
  },


];

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="logging">
        <div className="left-side">
          <div className="explanation">
            <h2>Sandopa</h2>
             <p>
              Emphasizing early identification and rehabilitation support for students.
             </p>
          </div>
        </div>
        <div className="right-side">
          <LoginCard />
        </div>
      </div>

      <div className="cards-container">
      <div className="book-cards">
          <h2>Videos</h2>
          <div className="card-grid">
            {dummyVideos.map((video) => (
              <VideoCard
                key={video.id}
                title={video.title}
                thumbnail={video.thumbnail}
                videoUrl={video.videoUrl}
              />
            ))}
          </div>
        </div>
        <div className="book-cards">
          <h2>Reading Material</h2>
          <div className="card-grid">
            {dummyBooks.map((book) => (
              <BookCard
                key={book.id}
                title={book.title}
                author={book.author}
                description={book.description}
                coverImage={book.coverImage}
                infoLink={book.infoLink}
              />
            ))}
          </div>
        </div>

     
      </div>
    </div>
  );
};

export default LoginPage;
