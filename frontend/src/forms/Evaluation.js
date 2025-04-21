import React from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Grid,
  Button
} from "@mui/material";
import { useData } from "../utils/DataContext";
import { useNavigate } from "react-router-dom";

const Evaluation = () => {
  const { clientDiagnosisData, setTempDiagnosis} = useData();
  // Hard-coded data object
  const rowData = clientDiagnosisData
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const diagnosis = e.target.elements.diagnosis.value;
    setTempDiagnosis(diagnosis);
    console.log("Submitted Diagnosis:", diagnosis);
    alert("Diagnosis Saved Successfully")
    navigate("/dashboard");
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 4,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#fff"
        }}
      >
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{ color: "#a5e526", fontWeight: "bold" }}
        >
          Evaluation Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* ID Row */}
            <Grid item xs={4}>
              <Typography variant="body1">ID</Typography>
            </Grid>
            <Grid item xs={1} sx={{ textAlign: "center" }}>
              <Typography variant="body1">:</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="body1">{rowData.clientId}</Typography>
            </Grid>

            {/* Name Row */}
            <Grid item xs={4}>
              <Typography variant="body1">Name</Typography>
            </Grid>
            <Grid item xs={1} sx={{ textAlign: "center" }}>
              <Typography variant="body1">:</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="body1">{rowData.clientName}</Typography>
            </Grid>
            
            {/* Age Row */}
            <Grid item xs={4}>
              <Typography variant="body1">Age</Typography>
            </Grid>
            <Grid item xs={1} sx={{ textAlign: "center" }}>
              <Typography variant="body1">:</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="body1">{rowData.clientAge}</Typography>
            </Grid>

            {/* Phone Row */}
            <Grid item xs={4}>
              <Typography variant="body1">Phone</Typography>
            </Grid>
            <Grid item xs={1} sx={{ textAlign: "center" }}>
              <Typography variant="body1">:</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="body1">{rowData.phone}</Typography>
            </Grid>

            {/* Gender Row */}
            <Grid item xs={4}>
              <Typography variant="body1">Gender</Typography>
            </Grid>
            <Grid item xs={1} sx={{ textAlign: "center" }}>
              <Typography variant="body1">:</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="body1">{rowData.gender}</Typography>
            </Grid>

            {/* Refer Row */}
            <Grid item xs={4}>
              <Typography variant="body1">Refer</Typography>
            </Grid>
            <Grid item xs={1} sx={{ textAlign: "center" }}>
              <Typography variant="body1">:</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="body1">{rowData.refer}</Typography>
            </Grid>

            {/* Diagnosis Row */}
            <Grid item xs={4}>
              <Typography variant="body1">Diagnosis</Typography>
            </Grid>
            <Grid item xs={1} sx={{ textAlign: "center" }}>
              <Typography variant="body1">:</Typography>
            </Grid>
            <Grid item xs={7}>
              <TextField
                label="Diagnosis"
                name="diagnosis"
                variant="outlined"
                fullWidth
                size="small"
                multiline
                rows={4}
                defaultValue={rowData.diagnosis}
              />
            </Grid>
          </Grid>
          {/* Submit Button */}
          <Grid container spacing={2} sx={{ mt: 3 }}>
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

export default Evaluation;