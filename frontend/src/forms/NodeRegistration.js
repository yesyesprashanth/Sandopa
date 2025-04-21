import { useState, useEffect } from 'react';
import { TextField, Container, MenuItem, Select, InputLabel, FormControl, Button, Grid } from '@mui/material';
import { registerNode, getHubList, getCentersByHub } from '../api/userapi';

const NodeRegistration = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    nodeId: '',
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    hubId: '',
    centerId: ''
  });

  const [hubList, setHubList] = useState([]);
  const [centerList, setCenterList] = useState([]);

  const [errors, setErrors] = useState({
    nodeId: false,
    name: false,
    contactPerson: false,
    phone: false,
    email: false,
    address: false,
    city: false,
    state: false,
    hubId: false
  });

  useEffect(() => {
    const fetchHubs = async () => {
      const hubs = await getHubList();
      if (hubs) {
        setHubList(hubs);
      }
    };
    fetchHubs();
  }, []);

  const handleHubChange = async (e) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, hubId: value, centerId: '' }));
    if (value) {
      const centers = await getCentersByHub(value);
      if (centers) {
        setCenterList(centers);
      }
    } else {
      setCenterList([]);
    }
  };

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
      nodeId: formData.nodeId.trim() === '',
      name: formData.name.trim() === '' || !/^[A-Za-z\s]+$/.test(formData.name),
      contactPerson: formData.contactPerson.trim() === '' || !/^[A-Za-z\s]+$/.test(formData.contactPerson),
      phone: formData.phone.trim() === '' || !/^\d{10}$/.test(formData.phone),
      email: formData.email.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      address: formData.address.trim() === '',
      city: formData.city.trim() === '',
      state: formData.state.trim() === '',
      hubId: formData.hubId.trim() === ''
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      const nodeData = {
        nodeId: formData.nodeId,
        node_name: formData.name,
        contactPerson: formData.contactPerson,
        phone: formData.phone,
        emailId: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: "India",
        subscription: "Free",
        hubId: formData.hubId,
        centerId: formData.centerId || null // Optional center ID
      };

      try {
        const response = await registerNode(nodeData)
        if (response.status === "success") {
          alert('Registration successful!');
          closeModal();
        } else {
          alert('Registration failed!');
        }
      } catch (error) {
        alert('Registration failed!');
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <div className="modal-backdrop">
        <div className="modal-content">
          <h2 className="form-header">Node Registration (Schools, Camps)</h2>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Node ID"
                  name="nodeId"
                  value={formData.nodeId}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  size="small"
                  error={errors.nodeId}
                  helperText={errors.nodeId ? "This field is required" : ""}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Node Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  size="small"
                  error={errors.name}
                  helperText={errors.name ? "Please enter a valid name" : ""}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contact Person Name"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  size="small"
                  error={errors.contactPerson}
                  helperText={errors.contactPerson ? "Please enter a valid contact person name" : ""}

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
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  size="small"
                  error={errors.email}
                  helperText={errors.email ? "Please enter a valid email address" : ""}

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

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small" error={errors.hubId}>
                  <InputLabel>Hub</InputLabel>
                  <Select
                    label="Hub"
                    name="hubId"
                    value={formData.hubId}
                    onChange={handleHubChange}
                  >
                    <MenuItem value="">--Select Hub--</MenuItem>
                    {hubList.map((hub) => (
                      <MenuItem key={hub.id} value={hub.id}>
                        {hub.hub_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Center (Optional)</InputLabel>
                  <Select
                    label="Center (Optional)"
                    name="centerId"
                    value={formData.centerId}
                    onChange={handleInputChange}
                    disabled={!formData.hubId}
                  >
                    <MenuItem value="">--Select Center--</MenuItem>
                    {centerList.map((center) => (
                      <MenuItem key={center.id} value={center.id}>
                        {center.center_name}
                      </MenuItem>
                    ))}
                  </Select>
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

export default NodeRegistration;
