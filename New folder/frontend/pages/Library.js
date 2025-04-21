import React, { useState, useRef } from 'react';
import './Library.css';
import music from '../assest/music.png';  
import sound from '../assest/sound.png';
import frequency from '../assest/frequency.png';
import central from '../assest/central.png';

const Library = () => {
  const [activeBook, setActiveBook] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [expandedSubChapter, setExpandedSubChapter] = useState(null);
  const bookRefs = useRef({});

  const chapters = [
    {
      id: 1,
      title: 'Yoga Therapy',
      subChapters: [
        {
          id: 1,
          title: 'ಶೀತಲೀಕರಣ ವ್ಯಾಯಾಮಗಳು',
          books: [
            {
              id: 1,
              title: 'ಶ್ವಾಸಕ್ರಿಯೆ ೧ : ಅಭ್ಯಾಸದ ವಿಧಾನ',
              cover: music,
              pdf: '/public/pdf/m1.pdf',
            },
            {
              id: 2,
              title: 'ಶ್ವಾಸಕ್ರಿಯೆ ೨ : ಅಭ್ಯಾಸದ ವಿಧಾನ',
              cover: sound,
              pdf: '/pdf/to1.pdf',
            },
            {
              id: 3,
              title: 'ಅರ್ಧಚಕ್ರಾಸನ ಮತ್ತು ಪಾದಹಸ್ತಾಸನ: ಅಭ್ಯಾಸದ ವಿಧಾನ',
              cover: frequency,
              pdf: '/public/pdf/f1.pdf',
            },
            {
              id: 4,
              title: 'ಕಟೀಚಕ್ರಾಸನ ಅಭ್ಯಾಸದ ವಿಧಾನ :',
              cover: central,
              pdf: '/public/pdf/ti1.pdf',
            },
          ],
        },
        {
          id: 2,
          title: 'ಪ್ರಾಣಾಯಾಮಗಳು',
          books: [
            {
              id: 1,
              title: 'ವಿಭಾಗೀಯ ಪ್ರಾಣಾಯಾಮ',
              cover: music,
              pdf: '/public/pdf/m1.pdf',
            },
            {
              id: 2,
              title: 'ಉಜ್ಜಾಯಿ ಪ್ರಾಣಾಯಾಮ',
              cover: sound,
              pdf: '/pdf/to1.pdf',
            },
            {
              id: 3,
              title: 'ನಾಡೀಶುದ್ಧಿ ಪ್ರಾಣಾಯಾಮ',
              cover: frequency,
              pdf: '/public/pdf/f1.pdf',
            },
            {
              id: 4,
              title: 'ಭಸ್ತ್ರಿಕ ಪ್ರಾಣಾಯಾಮ',
              cover: central,
              pdf: '/public/pdf/ti1.pdf',
            },
            {
              id: 5,
              title: 'ಕಪಾಲಭಾತಿ :',
              cover: central,
              pdf: '/public/pdf/ti1.pdf',
            },
          ],
        },
      
      
      ],
    },
    {
      id: 2,
      title: 'Vestibular',
      subChapters: [
        {
          id: 1,
          title: 'ತ್ರಾಟಕ ವ್ಯಾಯಾಮಗಳು',
          books: [
            {
              id: 1,
              title: 'ಬಿಂದು ತ್ರಾಟಕ',
              cover: music,
              pdf: '/public/pdf/m1.pdf',
            },
            {
              id: 2,
              title: 'ಕಣ್ಣನ್ನು ಕೇಂದ್ರೀಕರಿಸಿ ಕುತ್ತಿಗೆಯ ಚಲನೆ:',
              cover: sound,
              pdf: '/pdf/to1.pdf',
            },
            {
              id: 3,
              title: 'ಕುತ್ತಿಗೆ ಮತ್ತು ಕಣ್ಣಿನ ಚಲನೆ',
              cover: frequency,
              pdf: '/public/pdf/f1.pdf',
            },
          
          ],
        },
        {
          id: 2,
          title: 'ಸಮತೋಲನ ವ್ಯಾಯಾಮಗಳು',
          books: [
            {
              id: 1,
              title: 'ತಾಡಾಸನ',
              cover: music,
              pdf: '/public/pdf/m1.pdf',
            },
          
          ],
        },
        {
          id: 3,
          title: 'ಶೀತಲೀಕರಣ ವ್ಯಾಯಾಮಗಳು',
          books: [
            {
              id: 1,
              title: 'ಹಸ್ತದ ಮಣಿಗಂಟಿನ ಚಲನೆ :',
              cover: music,
              pdf: '/public/pdf/m1.pdf',
            },
            {
              id: 2,
              title: 'ಮೊಣಕೈ ಚಲನೆ:',
              cover: sound,
              pdf: '/pdf/to1.pdf',
            },
            {
              id: 3,
              title: 'ಭುಜದ ಚಲನೆ:',
              cover: frequency,
              pdf: '/public/pdf/f1.pdf',
            },
            {
              id: 4,
              title: 'ಸೊಂಟದ ಚಲನೆ:',
              cover: frequency,
              pdf: '/public/pdf/f1.pdf',
            },
            {
              id: 5,
              title: 'ಮಂಡಿಯ ವ್ಯಾಯಾಮ:',
              cover: frequency,
              pdf: '/public/pdf/f1.pdf',
            },
            {
              id: 6,
              title: 'ಪಾದದ ಮಣಿಗಂಟಿನ ಚಲನೆ:',
              cover: frequency,
              pdf: '/public/pdf/f1.pdf',
            },
          
          ],
        },
        {
          id: 4,
          title: 'ಉಸಿರಾಟದ ವ್ಯಾಯಾಮಗಳು',
          books: [
            {
              id: 1,
              title: 'ಕೈಗಳ ಹೊರ -ಒಳ ಚಲನೆ :',
              cover: music,
              pdf: '/public/pdf/m1.pdf',
            },
            {
              id: 2,
              title: 'ಕೈಗಳನ್ನು ಚಾಚುವ ವ್ಯಾಯಾಮ :',
              cover: sound,
              pdf: '/pdf/to1.pdf',
            },
            {
              id: 3,
              title: 'ಹುಲಿಯಾ  ಉಸಿರಾಟದ ಕ್ರಿಯೆ :',
              cover: frequency,
              pdf: '/public/pdf/f1.pdf',
            },
            {
              id: 4,
              title: 'ಶಶಾಂಕಾಸದನ ವ್ಯಾಯಾಮಗಳು:',
              cover: frequency,
              pdf: '/public/pdf/f1.pdf',
            },
          
          ],
        },
        {
          id: 5,
          title: 'ಆಸನಗಳು',
          books: [
            {
              id: 1,
              title: 'ಅರ್ಧಕಟಿಚಕ್ರಾಸನ:',
              cover: music,
              pdf: '/public/pdf/m1.pdf',
            },
            {
              id: 2,
              title: 'ತ್ರಿಕೋನಾಸನ:',
              cover: sound,
              pdf: '/pdf/to1.pdf',
            },
            {
              id: 3,
              title: 'ವೀರಭದ್ರಾಸನ ೧:',
              cover: frequency,
              pdf: '/public/pdf/f1.pdf',
            },
            {
              id: 4,
              title: 'ವಕ್ರಾಸನ .',
              cover: frequency,
              pdf: '/public/pdf/f1.pdf',
            },
            {
              id: 5,
              title: 'ಭುಜಂಗಾಸನ :',
              cover: frequency,
              pdf: '/public/pdf/f1.pdf',
            },
            {
              id: 6,
              title: 'ಪವನಮುಕ್ತಸನ:',
              cover: frequency,
              pdf: '/public/pdf/f1.pdf',
            },
          
          ],
        },
        {
          id: 6,
          title: 'ಪ್ರಾಣಾಯಾಮ',
          books: [
            {
              id: 1,
              title: ' ವಿಭಾಗಿಯಾ ಪ್ರಾಣಾಯಾಮ ',
              cover: music,
              pdf: '/public/pdf/m1.pdf',
            },
            {
              id: 2,
              title: 'ಕಪಾಲಭಾತಿ ಪ್ರಾಣಾಯಾಮ:',
              cover: sound,
              pdf: '/pdf/to1.pdf',
            },
            {
              id: 3,
              title: 'ನಾಡೀಶುದ್ಧಿ ಪ್ರಾಣಾಯಾಮ:',
              cover: frequency,
              pdf: '/public/pdf/f1.pdf',
            },
            {
              id: 4,
              title: 'ಭ್ರಮರಿ ಪ್ರಾಣಾಯಾಮ :',
              cover: frequency,
              pdf: '/public/pdf/f1.pdf',
            },
          
          ],
        },
      
      
      ],
    },
  ];

  // Handle sidebar click to animate & scroll to book card
  const handleSidebarClick = (chapterId, subChapterId, bookId) => {
    const bookKey = `${chapterId}-${subChapterId}-${bookId}`;
    setActiveBook(bookKey);
    if (bookRefs.current[bookKey]) {
      bookRefs.current[bookKey].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleAnimationEnd = () => {
    setActiveBook(null);
  };

  // Open PDF on clicking the book card
  const handleBookClick = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  // Toggle chapter expansion
  const toggleChapter = (chapterId) => {
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
    // Reset subchapter when chapter changes
    setExpandedSubChapter(null);
  };

  // Toggle subchapter expansion
  const toggleSubChapter = (subChapterId) => {
    setExpandedSubChapter(expandedSubChapter === subChapterId ? null : subChapterId);
  };

  return (
    <div className="library-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Chapters</h2>
        <ul>
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <span
                className="chapter-link"
                onClick={() => toggleChapter(chapter.id)}
                style={{ cursor: 'pointer' }}
              >
                {chapter.title}
              </span>
              {expandedChapter === chapter.id && chapter.subChapters && (
                <ul>
                  {chapter.subChapters.map((subChapter) => (
                    <li key={subChapter.id}>
                      <span
                        className="subchapter-link"
                        onClick={() => toggleSubChapter(subChapter.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        {subChapter.title}
                      </span>
                      {expandedSubChapter === subChapter.id && (
                        <ul>
                          {subChapter.books.map((book) => (
                            <li key={book.id}>
                              <a
                                href={`#book-${chapter.id}-${subChapter.id}-${book.id}`}
                                className="book-link"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleSidebarClick(chapter.id, subChapter.id, book.id);
                                }}
                              >
                                {book.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="content">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="chapter-section">
            <h2 className="chapter-title">{chapter.title}</h2>
            {chapter.subChapters && chapter.subChapters.map((subChapter) => (
              <div id={`subchapter-${chapter.id}-${subChapter.id}`} key={subChapter.id} className="subchapter-section">
                <h3 className="subchapter-title">{subChapter.title}</h3>
                <div className="books-grid">
                  {subChapter.books.map((book) => {
                    const bookKey = `${chapter.id}-${subChapter.id}-${book.id}`;
                    return (
                      <div
                        id={`book-${chapter.id}-${subChapter.id}-${book.id}`}
                        key={book.id}
                        className={`book-card ${activeBook === bookKey ? 'active' : ''}`}
                        ref={(el) => (bookRefs.current[bookKey] = el)}
                        onClick={() => handleBookClick(book.pdf)}
                        onAnimationEnd={handleAnimationEnd}
                      >
                        <img src={book.cover} alt={book.title} className="book-cover" />
                        <h5 className="book-title">{book.title}</h5>
                        <p className="book-author">{book.author}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
