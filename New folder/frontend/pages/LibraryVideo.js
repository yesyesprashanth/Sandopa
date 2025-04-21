import React from 'react';
import ReactPlayer from 'react-player';
import './LibraryVideo.css';

const LibraryVideo = () => {
  const chapters = [
    {
      id: 1,
      title: 'Yoga Therapy',
      subChapters: [
        {
          id: 1,
          title: 'Sound Therapy',
          videos: [
            {
              id: 1,
              title: 'Music Therapy',
              url: 'https://youtu.be/yifIihi-xzk'
            },
            {
              id: 2,
              title: 'Tone Therapy',
              url: 'https://youtu.be/aEWv9KOgHg4?si=sJ6WKIKfpMVHJO0h'
            },
            {
              id: 3,
              title: 'Frequency Discrimination Task',
              url: '/videos/manswi.mp4'
            },
            {
              id: 4,
              title: 'Tinnitus Retraining Therapy',
              url: '/videos/deepthe.mp4'
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="library-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Chapters</h2>
        {chapters.map((chapter) => (
          <div key={chapter.id} className="chapter-sidebar">
            <span className="chapter-link">{chapter.title}</span>
            {chapter.subChapters && chapter.subChapters.map((subChapter) => (
              <div key={subChapter.id} className="subchapter-sidebar">
                <span className="subchapter-link">{subChapter.title}</span>
                <ul>
                  {subChapter.videos.map((video) => (
                    <li key={video.id}>
                      <a
                        href={`#video-${chapter.id}-${subChapter.id}-${video.id}`}
                        className="chapter-link"
                      >
                        {video.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="content">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="chapter-section">
            <h2 className="chapter-title">{chapter.title}</h2>
            {chapter.subChapters && chapter.subChapters.map((subChapter) => (
              <div
                key={subChapter.id}
                id={`subchapter-${chapter.id}-${subChapter.id}`}
                className="subchapter-section"
              >
                <h3 className="subchapter-title">{subChapter.title}</h3>
                <div className="video-grid-container">
                  {subChapter.videos.map((video) => (
                    <div
                      id={`video-${chapter.id}-${subChapter.id}-${video.id}`}
                      key={video.id}
                      className="video-item-card"
                    >
                      <ReactPlayer
                        className="video-element"
                        url={video.url}
                        controls
                        width="100%"
                        height="180px"
                      />
                      <h5 className="video-item-title">{video.title}</h5>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryVideo;
