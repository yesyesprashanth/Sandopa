
import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ScreeningQuestionnaire = () => {
  // State for form fields
  const [department, setDepartment] = useState("");
  const [screening, setScreening] = useState("");
  const [ageRange, setAgeRange] = useState({ min: "", max: "" });
  const [diagnosis, setDiagnosis] = useState("");
  const [question, setQuestion] = useState("");
  const [questionsList, setQuestionsList] = useState([]);

  // State for "New" options
  const [isDepartmentNew, setIsDepartmentNew] = useState(false);
  const [isScreeningNew, setIsScreeningNew] = useState(false);
  const [isDiagnosisNew, setIsDiagnosisNew] = useState(false);

  // State for storing disorder-wise questions
  const [disorderQuestions, setDisorderQuestions] = useState([]);

  // Sample data structure with IDs
  const initialData = [
    {
      id: "dept1",
      name: "Cardiology",
      screenings: [
        {
          id: "scr1",
          name: "Heart Disease Screening",
          ageRange: "18-60",
          diagnoses: [
            {
              id: "diag1",
              name: "Heart Disease",
              questions: [],
            },
          ],
        },
      ],
    },
    {
      id: "dept2",
      name: "Neurology",
      screenings: [
        {
          id: "scr2",
          name: "Stroke Screening",
          ageRange: "40-80",
          diagnoses: [
            {
              id: "diag2",
              name: "Stroke",
              questions: [],
            },
          ],
        },
      ],
    },
  ];

  const [data, setData] = useState(initialData);
  const [submittedData, setSubmittedData] = useState([]);
  // Get current department
  const currentDepartment = data.find((dept) => dept.id === department);

  // Get current screening
  const currentScreening = currentDepartment?.screenings?.find(
    (scr) => scr.id === screening
  );

  // Handle department selection
  const handleDepartmentChange = (e) => {
    const value = e.target.value;
    if (value === "New") {
      setIsDepartmentNew(true);
      setDepartment("");
    } else {
      setIsDepartmentNew(false);
      setDepartment(value);
    }
    setScreening("");
    setDiagnosis("");
    setQuestionsList([]);
    setDisorderQuestions([]);
  };

  // Handle screening selection
  const handleScreeningChange = (e) => {
    const value = e.target.value;
    if (value === "New") {
      setIsScreeningNew(true);
      setScreening("");
    } else {
      setIsScreeningNew(false);
      setScreening(value);
    }
    setDiagnosis("");
    setQuestionsList([]);
    setDisorderQuestions([]);
  };

  // Handle diagnosis selection
  const handleDiagnosisChange = (e) => {
    const value = e.target.value;
    if (value === "New") {
      setIsDiagnosisNew(true);
      setDiagnosis("");
    } else {
      setIsDiagnosisNew(false);
      setDiagnosis(value);
    }
    setQuestionsList([]);
  };

  // Add new department
  const addNewDepartment = () => {
    if (department.trim()) {
      const newDept = {
        id: `dept${data.length + 1}`,
        name: department,
        screenings: [],
      };
      setData([...data, newDept]);
      setDepartment("");
      setIsDepartmentNew(false);
    }
  };

  // Add new screening
  const addNewScreening = () => {
    if (screening.trim() && department && ageRange.min && ageRange.max) {
      const newScr = {
        id: `scr${currentDepartment.screenings.length + 1}`,
        name: screening,
        ageRange: `${ageRange.min}-${ageRange.max}`,
        diagnoses: [],
      };
      const updatedData = data.map((dept) =>
        dept.id === department
          ? { ...dept, screenings: [...dept.screenings, newScr] }
          : dept
      );
      setData(updatedData);
      setScreening("");
      setAgeRange({ min: "", max: "" });
      setIsScreeningNew(false);
    }
  };

  // Add new diagnosis
  const addNewDiagnosis = () => {
    if (diagnosis.trim() && department && screening) {
      const newDiag = {
        id: `diag${currentScreening.diagnoses.length + 1}`,
        name: diagnosis,
        questions: [],
      };
      const updatedData = data.map((dept) =>
        dept.id === department
          ? {
            ...dept,
            screenings: dept.screenings.map((scr) =>
              scr.id === screening
                ? { ...scr, diagnoses: [...scr.diagnoses, newDiag] }
                : scr
            ),
          }
          : dept
      );
      setData(updatedData);
      setDiagnosis("");
      setIsDiagnosisNew(false);
    }
  };

  // Add question to the list
  const addQuestion = () => {
    if (question.trim() && diagnosis) {
      const updatedDisorderQuestions = [...disorderQuestions];
      const existingDisorder = updatedDisorderQuestions.find(
        (d) => d.diagnosis === diagnosis
      );

      if (existingDisorder) {
        existingDisorder.questions.push(question);
      } else {
        updatedDisorderQuestions.push({
          diagnosis,
          questions: [question],
        });
      }

      setDisorderQuestions(updatedDisorderQuestions);
      setQuestion("");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!department || !screening || disorderQuestions.length === 0) {
      alert("Please fill all fields and add at least one question!");
      return;
    }
    // Create the submission object
    const submission = {
      department: currentDepartment.name,
      screening: currentScreening.name,
      ageRange: currentScreening.ageRange,
      disorders: disorderQuestions.map((disorder) => ({
        name: currentScreening.diagnoses.find((d) => d.id === disorder.diagnosis)?.name,
        questions: disorder.questions,
      })),
    };

    // Add to submitted data
    setSubmittedData([...submittedData, submission]);
    // Add questions to the data structure
    const updatedData = data.map((dept) =>
      dept.id === department
        ? {
          ...dept,
          screenings: dept.screenings.map((scr) =>
            scr.id === screening
              ? {
                ...scr,
                diagnoses: scr.diagnoses.map((diag) => {
                  const disorder = disorderQuestions.find(
                    (d) => d.diagnosis === diag.id
                  );
                  return disorder
                    ? { ...diag, questions: [...diag.questions, ...disorder.questions] }
                    : diag;
                }),
              }
              : scr
          ),
        }
        : dept
    );
    setData(updatedData);

    // Reset form
    setDepartment("");
    setScreening("");
    setAgeRange({ min: "", max: "" });
    setDiagnosis("");
    setQuestion("");
    setQuestionsList([]);
    setDisorderQuestions([]);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 1, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h6" align="center" gutterBottom sx={{ color: "#a5e526" }}>
          Screening Questionnaire
        </Typography>



        <form onSubmit={handleSubmit}>
          {/* Department Section */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel sx={{ fontSize: "14px", top: "-5px" }}>Department</InputLabel>
            {isDepartmentNew ? (
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    size="small" // Ensuring the same height as RCI ID field
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    onClick={addNewDepartment}
                    startIcon={<AddIcon />}
                    sx={{ padding: "5px 10px", fontSize: "14px", minHeight: "40px" }} // Adjusted to match button height with small TextField
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Select
                value={department}
                onChange={handleDepartmentChange}
                label="Department"
                sx={{
                  height: "40px", // Matches small TextField height
                  fontSize: "14px",
                  "& .MuiSelect-select": { padding: "8px" },
                }}
              >
                <MenuItem value="">
                  <em>Select Department</em>
                </MenuItem>
                {data.map((dept) => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))}
                <MenuItem value="New">New Department</MenuItem>
              </Select>
            )}
          </FormControl>


          {/* Screening Section */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel sx={{ fontSize: "14px", top: "-5px" }}>Screening Name</InputLabel>
            {isScreeningNew ? (
              <Box>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                    
                      value={screening}
                      size="small"
                      onChange={(e) => setScreening(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          type="number"
                          label="Min Age"
                          size="small"
                          value={ageRange.min}
                          onChange={(e) =>
                            setAgeRange({ ...ageRange, min: e.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          type="number"
                          label="Max Age"
                            size="small"
                          value={ageRange.max}
                          onChange={(e) =>
                            setAgeRange({ ...ageRange, max: e.target.value })
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      onClick={addNewScreening}
                      startIcon={<AddIcon />}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <Select
                value={screening}
                onChange={handleScreeningChange}
                label="Screening Name"
                sx={{
                  height: "40px", // Matches small TextField height
                  fontSize: "14px",
                  "& .MuiSelect-select": { padding: "8px" },
                }}
              >
                <MenuItem value="">
                  <em>Select Screening</em>
                </MenuItem>
                {currentDepartment?.screenings?.map((scr) => (
                  <MenuItem key={scr.id} value={scr.id}>
                    {scr.name} ({scr.ageRange})
                  </MenuItem>
                ))}
                <MenuItem value="New">New Screening</MenuItem>
              </Select>
            )}
          </FormControl>

          {/* Diagnosis Section */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel sx={{ fontSize: "14px", top: "-5px" }}>Disorder Name</InputLabel>
            {isDiagnosisNew ? (
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                  
                    value={diagnosis}
                      size="small"
                    onChange={(e) => setDiagnosis(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    onClick={addNewDiagnosis}
                    startIcon={<AddIcon />}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Select
                value={diagnosis}
                onChange={handleDiagnosisChange}
                label="Disorder Name"
                sx={{
                  height: "40px", // Matches small TextField height
                  fontSize: "14px",
                  "& .MuiSelect-select": { padding: "8px" },
                }}
              >
                <MenuItem value="">
                  <em>Select Diagnosis</em>
                </MenuItem>
                {currentScreening?.diagnoses?.map((diag) => (
                  <MenuItem key={diag.id} value={diag.id}>
                    {diag.name}
                  </MenuItem>
                ))}
                <MenuItem value="New">New Diagnosis</MenuItem>
              </Select>
            )}
          </FormControl>

          {/* Question Section */}
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  label="Question"
                    size="small"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={addQuestion}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Submit Button */}
           <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                      </Button>
                    </Grid>
        </form>

        {/* Display Disorder-wise Questions */}
        {disorderQuestions.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Added Questions
            </Typography>
            {disorderQuestions.map((disorder, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>
                      {
                        currentScreening?.diagnoses?.find(
                          (d) => d.id === disorder.diagnosis
                        )?.name
                      }
                    </strong>
                  </Typography>
                  <List dense>
                    {disorder.questions.map((q, idx) => (
                      <ListItem key={idx}>
                        <ListItemText primary={`${idx + 1}. ${q}`} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ScreeningQuestionnaire;