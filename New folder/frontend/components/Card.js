// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { DataGrid } from '@mui/x-data-grid';
// import { useData } from '../utils/DataContext';
// import Modal from '@mui/material/Modal';
// import './Card.css';
// import Box from '@mui/material/Box';
// import ClinicianRegistration from '../forms/ClinicianRegistration';
// import TeacherRegistration from '../forms/TeacherRegistration';
// import StudentRegistration from '../forms/StudentRegistration';



// // User Card Component with Modal
// export const UserCard = () => {
//   const { userData } = useData();
//   const [open, setOpen] = useState(false);
//   const [selectedForm, setSelectedForm] = useState(null);

//   const handleCreateClick = () => {
//     switch (userData.role) {
//       case 'Institute':
//         setSelectedForm(<ClinicianRegistration />);
//         break;
//       case 'School':
//         setSelectedForm(<TeacherRegistration />);
//         break;
//       case 'Teacher':
//         setSelectedForm(<StudentRegistration />);
//         break;
//       default:
//         setSelectedForm(null);
//     }
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedForm(null);
//   };

//   const modalStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: '#333',
//     boxShadow: 24,
//     p: 4,
//     borderRadius: '8px',
//   };

//   return (
//     <>
//       <div className="custom-card">
//         <h3 className='users'>User</h3>
//         {userData.role?.toLowerCase() !== 'clinician' &&
//           userData.role?.toLowerCase() !== 'nodal' && (
//             <button onClick={handleCreateClick} className="custom-create-button">
//               Create
//             </button>
//           )}
//       </div>

//     </>
//   );
// };

