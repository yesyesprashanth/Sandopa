import React, { useState, useContext } from 'react';
import {useData} from '../utils/DataContext';
import {
  TextField,
  Container,
  Button,
  Grid,
  Typography,
  Box
} from '@mui/material';
import { registerFacilitator } from '../api/userapi';

const ExaminerRegistration = () => {
  const {userData} = useData()

  const [formData, setFormData] = useState({
    facilitatorName: '',
    phone: '',
    emailId: '',
    nodeId:userData.userId,
  });

  const [errors, setErrors] = useState({
    facilitatorName: false,
    phone: false,
    emailId: false,
    nodeId:false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Allow only valid input for phone and name fields
    if (name === 'phone' && !/^\d*$/.test(value)) return;
    if (name === 'name' && !/^[A-Za-z\s]*$/.test(value)) return;

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = async (e) => {    
    e.preventDefault();

    formData.nodeId = userData.userId
    console.log(formData);   
    
    // Validate fields
    const newErrors = {
      name: formData.facilitatorName.trim() === '' || !/^[A-Za-z\s]+$/.test(formData.facilitatorName),
      phone: formData.phone.trim() === '' || !/^\d{10}$/.test(formData.phone),
      email: formData.emailId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId),      
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      console.log('Submitted Data:', formData);  
      try{
        const response = await registerFacilitator(formData)
        if(response){
          alert('Facilitator Registration successful!');
        }else
        alert('Facilitator Registration failed!');

      }catch(error){
        console.log(error);
        alert('Facilitator Registration failed!');
      }
          
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 1, p: 4, boxShadow: 3, borderRadius: 2 }}>

        <Typography variant="h6" align="center" gutterBottom sx={{ color: "#a5e526" }}>
          Facilitator Registration (Clinician/Teacher)
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="facilitatorName"
                value={formData.facilitatorName}
                onChange={handleInputChange}
                error={errors.facilitatorName}
                helperText={errors.facilitatorName ? 'Name is required and must contain only alphabets.' : ''}
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
                helperText={errors.phone ? 'Phone number must be 10 digits.' : ''}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email (Optional)"
                name="emailId"
                value={formData.emailId}
                onChange={handleInputChange}
                error={errors.emailId}
                helperText={errors.emailId ? 'Enter a valid email address.' : ''}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>            
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default ExaminerRegistration;
