import React, { useState, useContext, useEffect } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Divider,
  FormHelperText,
} from "@mui/material";
import { getScreeningQuestions, saveScreeningResult } from "../api/screeningapi";
import { useData } from "../utils/DataContext";
import { useNavigate } from "react-router-dom";

const ScreeningTestData = () => {
  const [formData, setFormData] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({}); // Tracks Yes/No selections by disorderId
  const [errors, setErrors] = useState({});
  const [screeningData, setScreeningData] = useState([]);
  const { clientScreeningData } = useData();

  const navigate = useNavigate()

  useEffect(() => {
    const getQuestions = async () => {
      const screeningDetails = {
        screeningId: clientScreeningData.screeningQId,
        clientAge: clientScreeningData.clientAge,
      };
      console.log(screeningDetails);
      const response = await getScreeningQuestions(screeningDetails);
      console.log(response);
      if (response.data) setScreeningData(response.data);
    };

    getQuestions();
  }, []);

  const handleSelectionChange = (disorderId, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [disorderId]: value, // Store selection ("Yes" or "No") by disorderId
    }));

    // If "No" is selected, clear any answers for this disorder
    if (value === "No") {
      setFormData((prevData) => {
        const newData = { ...prevData };
        delete newData[disorderId];
        return newData;
      });
    }
  };

  const handleRadioChange = (disorderId, question, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [disorderId]: {
        ...prevData[disorderId],
        [question]: value,
      },
    }));
  };

  const handleSubmit = async() => {
    let formErrors = {};
    screeningData.forEach((screening) => {
      screening.testList.forEach((test) => {
        const disorderId = test.disorderId;

        // Check if "Yes" is selected for this disorder
        if (selectedOptions[disorderId] === "Yes") {
          test.questions.forEach((question) => {
            if (!formData[disorderId]?.[question]) {
              formErrors = {
                ...formErrors,
                [disorderId]: {
                  ...formErrors[disorderId],
                  [question]: "This question must be answered.",
                },
              };
            }
          });
        }
      });
    });

    if (Object.keys(formErrors).length === 0) {
      // Extract disorderIds where "Yes" was selected
      const selectedDisorderIds = screeningData
        .flatMap((screening) =>
          screening.testList
            .filter((test) => selectedOptions[test.disorderId] === "Yes")
            .map((test) => test.disorderId)
        );
      
      const result = selectedDisorderIds.length>0?"Refer":"Pass"

      const screeningDetails = {
        "screeningId": clientScreeningData.screeningQId,
        "participantId": clientScreeningData.clientId,
        "disorderIds": selectedDisorderIds,   
        "result":result            
      };

      console.log("Result:", screeningDetails);

      const response = await saveScreeningResult(screeningDetails);
      
      if(response.status == "success")
      {
        // alert(response.message);
        if(screeningDetails.disorderIds=="")
          alert("Screening Result: Pass")
        else
          alert("Screening Result: Refer")

        navigate('/dashboard')
      }      
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      {screeningData.map((screening) => (
        <Card
          key={screening.id}
          sx={{
            width: "100%",
            maxWidth: "600px",
            margin: "auto",
            marginBottom: 3,
            borderRadius: 2,
            boxShadow: 5,
            padding: 2,
            backgroundColor: "#f5f5f5",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: 3,
                color: "#1976d2",
              }}
            >
              {screening.screeningName}
            </Typography>

            {screening.testList.map((test, testIndex) => {
              const disorderId = test.disorderId;

              return (
                <Box key={testIndex} sx={{ marginBottom: 3 }}>
                  {/* Disorder Name + Yes/No on the Right */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                  >
                    <FormLabel sx={{ fontWeight: "bold" }}>
                      {test.disorderName}
                    </FormLabel>

                    <RadioGroup
                      row
                      value={selectedOptions[disorderId] || ""}
                      onChange={(e) =>
                        handleSelectionChange(disorderId, e.target.value)
                      }
                    >
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </Box>

                  {/* Questions Section (Shown Only If "Yes" Is Selected) */}
                  {selectedOptions[disorderId] === "Yes" && (
                    <>
                      <Divider sx={{ marginBottom: 2 }} />
                      {test.questions.map((question, qIndex) => (
                        <Box
                          key={qIndex}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 1,
                          }}
                        >
                          <Typography variant="body2" sx={{ flex: 1 }}>
                            {`${qIndex + 1}. ${question}`}
                          </Typography>

                          <FormControl component="fieldset">
                            <RadioGroup
                              row
                              value={formData[disorderId]?.[question] || ""}
                              onChange={(e) =>
                                handleRadioChange(
                                  disorderId,
                                  question,
                                  e.target.value
                                )
                              }
                            >
                              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                              <FormControlLabel value="No" control={<Radio />} label="No" />
                            </RadioGroup>
                          </FormControl>
                          {errors[disorderId]?.[question] && (
                            <FormHelperText>
                              {errors[disorderId][question]}
                            </FormHelperText>
                          )}
                        </Box>
                      ))}
                    </>
                  )}
                </Box>
              );
            })}
          </CardContent>

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{
                padding: "8px 16px",
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
            >
              Submit
            </Button>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default ScreeningTestData;