import React, { useEffect, useState } from 'react';
import { TextField, Container, Button, Grid, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {useData} from '../utils/DataContext';
import {registerParticipant} from '../api/userapi';
import { getScreeningQuestionnaireList } from '../api/screeningapi';

const ClientRegistration = () => {

  const [screeningQList, setScreeningQList] = useState([{
    "id":1,
    "screening_name":"screening Test"
  }])

  const [formData, setFormData] = useState({
    participantId: '',
    participantName: '',
    participantAge: '',
    gender: '',   
    phone:'',
    screeningQId: 1     
  });

  const navigate = useNavigate()
  const { userData, updateClientScreeningData } = useData()

  const [errors, setErrors] = useState({
    participantId: false,
    participantName: false,
    participantAge: false,
  });  
  

  useEffect(()=>{
    const getScreeningList = async () =>{
      const response = await getScreeningQuestionnaireList(userData.organizationId)
      console.log(response);
      console.log(response.data);
      setScreeningQList(response.data)

      //update screeningQid to first position
      setFormData((prevData) => ({
        ...prevData,
        screeningQId: response.data[0].id,
      }));
    }
    getScreeningList()
  },[])
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData({ ...formData, [name]: value });

    // Validate inputs
    if (name === 'participantName') {
      const isValidName = /^[a-zA-Z\s]+$/.test(value);
      setErrors((prevErrors) => ({ ...prevErrors, name: !isValidName }));
    }

    if (name === 'participantAge') {
      const isValidAge = /^[0-9]+$/.test(value);
      setErrors((prevErrors) => ({ ...prevErrors, age: !isValidAge }));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Final validation check
    const isValidName = /^[a-zA-Z\s]+$/.test(formData.participantName);
    const isValidAge = /^[0-9]+$/.test(formData.participantAge);

    if (!isValidName || !isValidAge) {      
      return;
    }

    const participantData = {
      participantId: formData.participantId,
      participantName: formData.participantName,
      participantAge: formData.participantAge,
      gender: formData.gender,
      phone:formData.phone,
      group_id:1,
      nodeId:userData.organizationId
    };

    updateClientScreeningData({
      screeningQId:formData.screeningQId,
      clientId:formData.participantId,
      clientAge:formData.participantAge
    })

    const response = await registerParticipant(participantData)
    console.log(response);          
    console.log('Submitted Data:', formData);
    navigate(`/ScreeningTestData`)
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 1, p: 4, boxShadow: 3, borderRadius: 2 }}>

        <Typography variant="h6" align="center" gutterBottom sx={{ color: "#a5e526" }}>
          Client Registration
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                label="Client Id"
                name="participantId"
                value={formData.participantId}
                onChange={handleInputChange}
                error={errors.participantId}
                helperText={errors.name ? 'Id is required and must contain only alphabets.' : ''}
                fullWidth
                variant="outlined"
                size="small"

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="participantName"
                value={formData.participantName}
                onChange={handleInputChange}
                error={errors.participantName}
                helperText={errors.participantName ? 'Name is required and must contain only alphabets.' : ''}
                fullWidth
                variant="outlined"
                size="small"

              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Age"
                name="participantAge"
                value={formData.participantAge}
                onChange={handleInputChange}
                error={errors.participantAge}
                helperText={errors.participantAge ? 'Age is required and must be a number.' : ''}
                fullWidth
                variant="outlined"
                size="small"

              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel sx={{ fontSize: "14px", top: "-5px" }}>Gender</InputLabel>
                <Select
                  name="gender" // Change from "class" to "gender"
                  value={formData.gender} // Ensure it matches state
                  onChange={handleInputChange}
                  label="Gender"
                  size="small"
                  variant="outlined"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        color: 'black',
                      },
                    },
                  }}
                  sx={{
                    height: "40px",
                    color: 'black',
                  }}
                  required
                >
                  <MenuItem value="Male" style={{ color: 'black' }}>Male</MenuItem>
                  <MenuItem value="Female" style={{ color: 'black' }}>Female</MenuItem>
                  <MenuItem value="Other" style={{ color: 'black' }}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}                
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel sx={{ fontSize: "14px", top: "-5px" }}>Screening Questionnaire</InputLabel>
                <Select
                  name="screeningQid" // Change from "class" to "gender"
                  value={formData.screeningQId} // Ensure it matches state
                  onChange={handleInputChange}
                  label="screeningQid"
                  size="small"
                  variant="outlined"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        color: 'black',
                      },
                    },
                  }}
                  sx={{
                    height: "40px",
                    color: 'black',
                  }}
                  required
                >                  
                  {screeningQList.map((screeningQ, index) => (
                    <MenuItem key={index} value={screeningQ.id}>
                      {screeningQ.screening_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

export default ClientRegistration;
