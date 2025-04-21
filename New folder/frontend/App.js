

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import ClinicianRegistration from './forms/ClinicianRegistration';
import Dashboard from './pages/DashBoard';
import './App.css';
import { DataContextProvider } from './utils/DataContext';
import Library from './pages/Library';
import LibraryVideo from './pages/LibraryVideo';
import ScreeningQuestionnaire from './forms/ScreeningQuestionnaire';
import Navbar from './components/Navbar'; // Import Navbar
import Footer from './components/Footer'; // Import Footer
import MaterialPage from './pages/MaterialPage';

import ScreeningTestData from './forms/ScreeningTestData';
import InstituteCard from './components/card/CenterCard';
import ExaminerRegistration from './forms/ExaminerRegistration';
import HubRegistration from './forms/HubRegistration';
import CenterRegistration from './forms/CenterRegistration';
import NodeRegistration from './forms/NodeRegistration';
import ClientRegistration from './forms/ClientRegistration';

const Layout = ({ children }) => {
  const location = useLocation(); // Get current location

  return (
    <div>
      {/* Conditionally render Navbar and Footer based on the current route */}
      {location.pathname !== "/" && <Navbar />} {/* Don't show navbar on LoginPage */}
      <div>{children}</div> {/* Render children components here */}
      {location.pathname !== "/" && <Footer />} {/* Don't show footer on LoginPage */}
    </div>
  );
};

const App = () => {
  return (
    <DataContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/forgot-password" element= {<ForgotPassword />} />
          <Route path="/change-password" element={<Layout><ChangePassword /></Layout>} />
          <Route path="/hub" element={<Layout><HubRegistration/></Layout>} />
          <Route path="/center" element={<CenterRegistration/>} />
          <Route path="/clinic" element={<Layout><ClinicianRegistration /></Layout>} />
          <Route path="/school" element={<Layout><NodeRegistration/></Layout>} />
          <Route path="/examiner" element={<Layout><ExaminerRegistration/></Layout>} />
          <Route path="/student" element={<Layout><ClientRegistration/></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/library" element={<Layout><Library /></Layout>} />
          <Route path="/libraryvideo" element={<Layout><LibraryVideo /></Layout>} />
          <Route path="/screening" element={<Layout><ScreeningQuestionnaire /></Layout>} />
          <Route path="/material" element={ <Layout><MaterialPage/></Layout>} />
          <Route path="/screeningtest" element={<Layout><ScreeningTestData/></Layout>}/>
          <Route path="/institute-card" element={<Layout><InstituteCard/></Layout>}/>
        </Routes>
      </Router>
    </DataContextProvider>
  );
};

export default App;
