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

const MaterialPage = () => {
  // Main data structure
  const [departments, setDepartments] = useState([
    {
      id: "dept1",
      name: "Cardiology",
      diagnoses: [
        {
          id: "diag1",
          name: "Heart Disease",
          chapters: [
            {
              id: "chap1",
              name: "Chapter 1",
              subchapters: [
                { id: "sub1", name: "Subchapter 1A" },
                { id: "sub2", name: "Subchapter 1B" },
              ],
            },
          ],
        },
      ],
    },
  ]);

  // Selected values
  const [selected, setSelected] = useState({
    departmentId: "",
    diagnosisId: "",
    chapterId: "",
    subchapterId: "",
  });

  // New entry inputs
  const [newEntry, setNewEntry] = useState({
    department: "",
    diagnosis: "",
    chapter: "",
    subchapter: "",
  });

  const [videoLink, setVideoLink] = useState("");
  const [documents, setDocuments] = useState([]);

  // Handle selection changes
  const handleSelect = (level, value) => {
    const newState = { ...selected };

    // Reset downstream selections
    switch (level) {
      case "departmentId":
        newState.diagnosisId = "";
        newState.chapterId = "";
        newState.subchapterId = "";
        break;
      case "diagnosisId":
        newState.chapterId = "";
        newState.subchapterId = "";
        break;
      case "chapterId":
        newState.subchapterId = "";
        break;
    }

    newState[level] = value;
    setSelected(newState);
  };

  // Add new entries
  const addNewEntry = (level) => {
    const value = newEntry[level].trim();
    if (!value) return;

    const newDepartments = [...departments];

    switch (level) {
      case "department":
        newDepartments.push({
          id: `dept${Date.now()}`,
          name: value,
          diagnoses: [],
        });
        break;

      case "diagnosis":
        const deptIndex = newDepartments.findIndex(
          (d) => d.id === selected.departmentId
        );
        if (deptIndex > -1) {
          newDepartments[deptIndex].diagnoses.push({
            id: `diag${Date.now()}`,
            name: value,
            chapters: [],
          });
        }
        break;

      case "chapter":
        const dept = newDepartments.find((d) => d.id === selected.departmentId);
        if (dept) {
          const diagIndex = dept.diagnoses.findIndex(
            (d) => d.id === selected.diagnosisId
          );
          if (diagIndex > -1) {
            dept.diagnoses[diagIndex].chapters.push({
              id: `chap${Date.now()}`,
              name: value,
              subchapters: [],
            });
          }
        }
        break;

      case "subchapter":
        const deptWithSub = newDepartments.find(
          (d) => d.id === selected.departmentId
        );
        if (deptWithSub) {
          const diag = deptWithSub.diagnoses.find(
            (d) => d.id === selected.diagnosisId
          );
          if (diag) {
            const chapIndex = diag.chapters.findIndex(
              (c) => c.id === selected.chapterId
            );
            if (chapIndex > -1) {
              diag.chapters[chapIndex].subchapters.push({
                id: `sub${Date.now()}`,
                name: value,
              });
            }
          }
        }
        break;
    }

    setDepartments(newDepartments);
    setNewEntry((prev) => ({ ...prev, [level]: "" }));
  };

  // Handle form submission
  const handleSubmit = () => {
    const formData = {
      department: departments.find((d) => d.id === selected.departmentId)?.name,
      diagnosis: departments
        .find((d) => d.id === selected.departmentId)
        ?.diagnoses.find((d) => d.id === selected.diagnosisId)?.name,
      chapter: departments
        .find((d) => d.id === selected.departmentId)
        ?.diagnoses.find((d) => d.id === selected.diagnosisId)
        ?.chapters.find((c) => c.id === selected.chapterId)?.name,
      subchapter: departments
        .find((d) => d.id === selected.departmentId)
        ?.diagnoses.find((d) => d.id === selected.diagnosisId)
        ?.chapters.find((c) => c.id === selected.chapterId)
        ?.subchapters.find((s) => s.id === selected.subchapterId)?.name,
      videoLink,
      documents: documents.map((file) => file.name),
    };

    console.log("Submitted Data:", formData);
    // Add your API call here
  };

  // Get current selections
  const currentDepartment = departments.find(
    (d) => d.id === selected.departmentId
  );
  const currentDiagnosis = currentDepartment?.diagnoses?.find(
    (d) => d.id === selected.diagnosisId
  );
  const currentChapter = currentDiagnosis?.chapters?.find(
    (c) => c.id === selected.chapterId
  );

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4, p: 4, boxShadow: 3, borderRadius: 2 }}>
         <Typography variant="h6" align="center" gutterBottom sx={{ color: "#a5e526" }}>
          Admin Page
        </Typography>

        {/* Department Section */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Department</InputLabel>
          <Select
            value={selected.departmentId}
            onChange={(e) => handleSelect("departmentId", e.target.value)}
            label="Department"
          >
            <MenuItem value="">
              <em>Select Department</em>
            </MenuItem>
            {departments.map((dept) => (
              <MenuItem key={dept.id} value={dept.id}>
                {dept.name}
              </MenuItem>
            ))}
          </Select>
          <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="New Department"
                value={newEntry.department}
                onChange={(e) =>
                  setNewEntry((p) => ({ ...p, department: e.target.value }))
                }
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                onClick={() => addNewEntry("department")}
                startIcon={<AddIcon />}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </FormControl>

        {/* Diagnosis Section */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Diagnosis</InputLabel>
          <Select
            value={selected.diagnosisId}
            onChange={(e) => handleSelect("diagnosisId", e.target.value)}
            label="Diagnosis"
            disabled={!selected.departmentId}
          >
            <MenuItem value="">
              <em>Select Diagnosis</em>
            </MenuItem>
            {currentDepartment?.diagnoses?.map((diag) => (
              <MenuItem key={diag.id} value={diag.id}>
                {diag.name}
              </MenuItem>
            ))}
          </Select>
          {selected.departmentId && (
            <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="New Diagnosis"
                  value={newEntry.diagnosis}
                  onChange={(e) =>
                    setNewEntry((p) => ({ ...p, diagnosis: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  onClick={() => addNewEntry("diagnosis")}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          )}
        </FormControl>

        {/* Chapter Section */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Chapter</InputLabel>
          <Select
            value={selected.chapterId}
            onChange={(e) => handleSelect("chapterId", e.target.value)}
            label="Chapter"
            disabled={!selected.diagnosisId}
          >
            <MenuItem value="">
              <em>Select Chapter</em>
            </MenuItem>
            {currentDiagnosis?.chapters?.map((chap) => (
              <MenuItem key={chap.id} value={chap.id}>
                {chap.name}
              </MenuItem>
            ))}
          </Select>
          {selected.diagnosisId && (
            <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="New Chapter"
                  value={newEntry.chapter}
                  onChange={(e) =>
                    setNewEntry((p) => ({ ...p, chapter: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  onClick={() => addNewEntry("chapter")}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          )}
        </FormControl>

        {/* Subchapter Section */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Subchapter</InputLabel>
          <Select
            value={selected.subchapterId}
            onChange={(e) => handleSelect("subchapterId", e.target.value)}
            label="Subchapter"
            disabled={!selected.chapterId}
          >
            <MenuItem value="">
              <em>Select Subchapter</em>
            </MenuItem>
            {currentChapter?.subchapters?.map((sub) => (
              <MenuItem key={sub.id} value={sub.id}>
                {sub.name}
              </MenuItem>
            ))}
          </Select>
          {selected.chapterId && (
            <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="New Subchapter"
                  value={newEntry.subchapter}
                  onChange={(e) =>
                    setNewEntry((p) => ({ ...p, subchapter: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  onClick={() => addNewEntry("subchapter")}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          )}
        </FormControl>

        {/* Media Section */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Video Link"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            placeholder="Enter video URL"
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <Button variant="contained" component="label">
            Upload Documents
            <input
              type="file"
              hidden
              multiple
              onChange={(e) => setDocuments([...e.target.files])}
            />
          </Button>
          {documents.length > 0 && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Files: {documents.map((f) => f.name).join(", ")}
            </Typography>
          )}
        </FormControl>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          size="large"
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default MaterialPage;