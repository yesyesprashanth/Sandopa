import React, { createContext, useState, useContext } from 'react';

// Create a Context for sharing data globally
const DataContext = createContext();

// Custom hook to use the context in other components
export const useData = () => {
  return useContext(DataContext);
};

// The Provider component that will wrap your application
export const DataContextProvider = ({ children }) => {
  // Example state, you can customize this based on your app's needs  
  const [userData, setUserData] = useState({
    roleId:null,
    userId:null,
    emailId:null,
    organizationId:null,    
  });

  // Function to update the user data (example)
  const updateUserData = (data) => {
    setUserData(data);
  };


  const [clientScreeningData, setClientScreeningData] = useState({
    screeningQId:0,
    clientId:0,
    clientAge:0
  })

  const updateClientScreeningData = (data) => {
    setClientScreeningData(data);
  }

  const [clientDiagnosisData, setClientDiagnosisData] = useState({    
    clientId:"2025008",
    clientName: "Naveen",    
    clientAge: "5",
    phone: "9879879879",
    gender: "Male",
    refer: "Hearing Impairment",
    diagnosis:
      ""
  })

  const [selectedId, setSelectedId] = useState(null); // New state for selected ID
  const updateSelectedId = (id) => {
    setSelectedId(id);
  };

  const [tempDiagnosis, setTempDiagnosis] = useState("")
  const data = { userData, updateUserData, clientScreeningData, updateClientScreeningData, clientDiagnosisData, tempDiagnosis, setTempDiagnosis, selectedId, updateSelectedId}

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};
