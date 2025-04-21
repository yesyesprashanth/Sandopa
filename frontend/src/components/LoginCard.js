
import { useState } from 'react';
import './LoginCard.css';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import RegistrationModal from '../components/RegistrationModal';
import { useData } from '../utils/DataContext'; // Import useData hook
import { verifyUser } from '../api/userapi';

Modal.setAppElement('#root');

export default function LoginCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { updateUserData } = useData(); // Access updateUserData from context

  const navigate = useNavigate();

  const roleMapping = {
    'center@gmail.com': 'Institute',
    'node@gmail.com': 'School',
    'teacher@gmail.com': 'Teacher',
    'clinician@gmail.com': 'Clinician',
    'nodal@gmail.com': 'nodal'
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const userCredentials = {
      emailId: email,
      password: password,
    };

    try {
      const response = await verifyUser(userCredentials);

      console.log(JSON.stringify(response.data))

      if (response.data) {
        const userDetails = {
          "roleId": response.data.user_type,
          "userId": response.data.user_id,
          "emailId": response.data.email_id,
          "organizationId": response.data.organization_id
        }

        console.log(`user details ${JSON.stringify(userDetails)}`)
        
        updateUserData(userDetails);
        navigate('/dashboard');
      }
      else
        alert('Invalid email or password');

    } catch (error) {
      console.log(error);
      alert('Invalid email or password');
    }    
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
        <a href="forgot-password" className="forgot-password">
          Forgot password?
        </a>
        <p className="register-link">
          Don't have an account?{' '}
          <a
            onClick={() => {
              openModal();
              console.log('Register link clicked!');
            }}
          >
            Register
          </a>
        </p>
      </form>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Registration Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <RegistrationModal closeModal={closeModal} />
      </Modal>
    </div>
  );
}
