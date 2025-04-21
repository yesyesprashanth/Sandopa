

import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Container } from '@mui/material';
import { useData } from '../utils/DataContext';
import { registerClinician } from '../api/userapi';

const ClinicianRegistration = () => {
  const { userData } = useData();
  const [formData, setFormData] = useState({
    clinicianId: '',
    clinicianName: '',
    phone: '',
    emailId: '',      
  });

  const [errors, setErrors] = useState({
    clinicianId: false,
    clinicianName: false,
    phone: false,
    emailId: false,   
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validation for specific fields
    if (name === 'clinicianName' && !/^[A-Za-z\s]*$/.test(value)) return;
    if (name === 'phone' && !/^\d*$/.test(value)) return;

    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Check for empty fields
    const newErrors = {
      clinicianId: formData.clinicianId.trim() === '',
      clinicianName: formData.clinicianName.trim() === '' || !/^[A-Za-z\s]+$/.test(formData.clinicianName),
      phone: formData.phone.trim() === '' || !/^\d{10}$/.test(formData.phone),
      email: formData.emailId.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId),     
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {

      const clinicianData = {
        clinicianId: formData.clinicianId,
        clinicianName: formData.clinicianName,
        phone: formData.phone,
        emailId: formData.emailId,
        centerId: userData.userId
      };     
      
      const response = await registerClinician(clinicianData)      
      console.log(response);          
      alert('Registration successful!');        
    }
  };

  return (
    <Container maxWidth="xs">
       <Box sx={{ mt: 1, p: 4, boxShadow: 3, borderRadius: 2 }}>
   
        <Typography variant="h6" align="center" gutterBottom sx={{ color: "#a5e526" }}>
          Clinician Registration
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="RCI ID"
                name="clinicianId"
                value={formData.clinicianId}
                onChange={handleInputChange}
                error={errors.clinicianId}
                helperText={errors.clinicianId ? 'RCI ID is required.' : ''}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="clinicianName"
                value={formData.clinicianName}
                onChange={handleInputChange}
                error={errors.clinicianName}
                helperText={errors.clinicianName ? 'Name must contain only alphabets.' : ''}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                error={errors.phone}
                helperText={errors.phone ? 'Must be 10 digits.' : ''}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email ID"
                name="emailId"
                value={formData.emailId}
                onChange={handleInputChange}
                error={errors.emailId}
                helperText={errors.emailId ? 'A valid email is required.' : ''}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>           
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
   
      </Box>
    </Container>
  );
};

export default ClinicianRegistration;

