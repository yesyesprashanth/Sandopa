import { useState, useEffect } from 'react';
import { TextField, MenuItem, Select, FormHelperText, InputLabel, FormControl, Button, Grid, Container, Typography } from '@mui/material';
import { getHubList, RegisterCenter } from '../api/userapi';

const InstituteRegistration = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    centerId: '',
    centerName: '',
    contactName: '',
    phone: '',
    emailId: '',
    address: '',
    city: '',
    state: '',
    country: 'India',
    hub_id: ''
  });

  const [errors, setErrors] = useState({
    centerId: false,
    centerName: false,
    contactName: false,
    phone: false,
    emailId: false,
    address: false,
    city: false,
    state: false,
    country: false,
    hub_id: false
  });

  const [hubList, setHubList] = useState([]);

  useEffect(() => {
    const fetchHubs = async () => {
      const hubs = await getHubList();
      setHubList(hubs || []);
    };
    fetchHubs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name' || name === 'contactPerson') {
      if (!/^[A-Za-z\s]*$/.test(value)) return;
    }

    if (name === 'phone') {
      if (!/^\d{0,10}$/.test(value)) return;
    }

    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      centerId: formData.centerId.trim() === '',
      centerName: formData.centerName.trim() === '' || !/^[A-Za-z\s]+$/.test(formData.centerName),
      contactName: formData.contactName.trim() === '' || !/^[A-Za-z\s]+$/.test(formData.contactName),
      phone: formData.phone.trim() === '' || !/^\d{10}$/.test(formData.phone),
      emailId: formData.emailId.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId),
      address: formData.address.trim() === '',
      city: formData.city.trim() === '',
      state: formData.state.trim() === '',
      hub_id: formData.hub_id === ''
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      const response = await RegisterCenter(formData);
      if (response.status === "success") {
        alert('Registration successful!');
        closeModal();
      } else {
        alert('Registration failed!');
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <div className="modal-backdrop">
        <div className="modal-content">
          <Typography variant="h5" gutterBottom>
            Center Registration (Institutes/Clinics)
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="RCI Id"
                  name="centerId"
                  value={formData.centerId}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  size="small"
                  error={errors.centerId}
                  helperText={errors.centerId ? "This field is required" : ""}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Center Name"
                  name="centerName"
                  value={formData.centerName}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  size="small"
                  error={errors.centerName}
                  helperText={errors.centerName ? "Please enter a valid name" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contact Name"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  size="small"
                  error={errors.contactName}
                  helperText={errors.contactName ? "Please enter a valid contact person name" : ""}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  size="small"
                  error={errors.phone}
                  helperText={errors.phone ? "Please enter a valid 10-digit phone number" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  size="small"
                  error={errors.emailId}
                  helperText={errors.emailId ? "Please enter a valid email address" : ""}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  size="small"
                  error={errors.address}
                  helperText={errors.address ? "This field is required" : ""}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  size="small"
                  error={errors.city}
                  helperText={errors.city ? "This field is required" : ""}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  size="small"
                  error={errors.state}
                  helperText={errors.state ? "This field is required" : ""}
                />
              </Grid>

              {/* Hub dropdown */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small" error={errors.hub_id}>
                  <InputLabel>Hub</InputLabel>
                  <Select
                    label="Hub"
                    name="hub_id"
                    value={formData.hub_id}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="">Select Hub</MenuItem>
                    {hubList.map((hub) => (
                      <MenuItem key={hub.id} value={hub.id}>
                        {hub.hub_name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.hub_id && <FormHelperText>Please select a hub</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth size="small">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default InstituteRegistration;
