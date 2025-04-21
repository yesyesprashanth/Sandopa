import React, { useEffect, useState } from "react";
import { useData } from "../utils/DataContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ClinicianRegistration from "../forms/ClinicianRegistration";
import TeacherRegistration from "../forms/TeacherRegistration";
import StudentRegistration from "../forms/StudentRegistration";
import "./Card.css";

const UserCard = () => {
  const { userData } = useData();
  const [open, setOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);

  useEffect(() => {
    // Automatically open modal for "Institute" role on login
    if (userData.role === "Institute") {
      setSelectedForm(<ClinicianRegistration />);
      setOpen(true);
    }
  }, [userData.role]); // Run when userData.role updates

  const handleCreateClick = () => {
    switch (userData.role) {
      case "Institute":
        setSelectedForm(<ClinicianRegistration />);
        break;
      case "School":
        setSelectedForm(<TeacherRegistration />);
        break;
      case "Teacher":
        setSelectedForm(<StudentRegistration />);
        break;
      default:
        setSelectedForm(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedForm(null);
  };

  return (
    <div className="custom-card">
      <h3>User</h3>
      {userData.role?.toLowerCase() !== "clinician" &&
        userData.role?.toLowerCase() !== "nodal" && (
          <button onClick={handleCreateClick} className="custom-create-button">
            Create
          </button>
        )}

      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box">
          <button className="close-modal-btn" onClick={handleClose}>X</button>
          {selectedForm}
        </Box>
      </Modal>
    </div>
  );
};

export default UserCard;
