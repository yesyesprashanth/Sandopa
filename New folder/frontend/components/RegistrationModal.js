import React, { useState } from 'react';
import InstituteRegistration from '../forms/CenterRegistration';
import SchoolRegistration from '../forms/NodeRegistration';
import './RegistrationModal.css';

const RegistrationModal = ({ closeModal }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const resetCategory = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="registration-modal">
      {/* Show heading only if no category is selected */}
      {!selectedCategory && <h2>Select Registration Type</h2>}

      <button className="close-modal-btn" onClick={closeModal}>
        X
      </button>

      {!selectedCategory ? (
        <div className="options">
          <button onClick={() => handleCategoryClick('Institute/Clinics')}>Center</button>
          <button onClick={() => handleCategoryClick('School')}>Node</button>
        </div>
      ) : (
        <div className="modal-content">
          {selectedCategory === 'Institute/Clinics' && <InstituteRegistration closeModal={closeModal} />}
          {selectedCategory === 'School' && <SchoolRegistration closeModal={closeModal} />}
        </div>
      )}
    </div>
  );
};

export default RegistrationModal;
