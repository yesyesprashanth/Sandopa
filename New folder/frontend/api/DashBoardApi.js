 const clinicianList = [
    { id: 1, name: "Hemath", department: "Audiology", age: 10, completedCases: 5 },
    { id: 2, name: "Vishal", department: "Speech", age: 8, completedCases: 3 },
    { id: 3, name: "Narashima", department: "Speech", age: 12, completedCases: 6 },
    { id: 4, name: "Jeevan", department: "Audiology", age: 15, completedCases: 10 },
  ] 
  
 export const getClinicianList =async () => {
    return clinicianList;
  } 
 
  const campList = [
    { id: 1, name: "Camp Alpha", totalCases: 50, daigonis: "Normal" },
    { id: 2, name: "Camp Beta", totalCases: 30, daigonis: "Pending" },
    { id: 3, name: "Camp Gamma", totalCases: 40, daigonis: "Abnormal" },
  ];
  export const getCampList =async () => {
    return campList;
  }

  const centerList = [
    { id: 1, name: 'Material 1', department: 'Science' },
    { id: 2, name: 'Material 2', department: 'Mathematics' },
    { id: 3, name: "Charlie", department: 'English' },
  ];
  export const getCenterList =async () => {
    return centerList;
  }
  const clientList = [
    { id: 1, name: "John Doe", group: "A", age: 20 },
    { id: 2, name: "Jane Doe", group: "B", age: 22 },
    { id: 3, name: "Alice", group: "A", age: 19 },
  ];
  export const getClientList =async () => {
    return clientList;
  }

  const caseList = [
    { id: 1, name: "Alice", age: 30, phone: "123-456-7890", diagonosis: "Normal" },
    { id: 2, name: "Bob", age: 25, phone: "234-567-8901", diagonosis: "Pending" },
    { id: 3, name: "Charlie", age: 28, phone: "345-678-9012", diagonosis: "Abnormal" },
  ];
  export const getCaseList =async () => {
    return caseList;
  }
  const daigonisList = [
    { id: 1, school: "School A", count: 10 },
    { id: 2, school: "School B", count: 8 },
    { id: 3, school: "School C", count: 12 },
  ];
  export const getDaigonisList =async () => {
    return daigonisList;
  }
  const facilitatorList = [
    { id: 1, name: "Facilitator 1", phone: "123-456-7890", numberOfCases: "10" },
    { id: 2, name: "Facilitator 2", phone: "234-567-8901", numberOfCases: "8" },
    { id: 3, name: "Facilitator 3", phone: "345-678-9012", numberOfCases: "12" },
  ];
  export const getFacilitatorList =async () => {
    return facilitatorList;
  }

  const nodeList = [
    { id: 1, name: 'Material 1', department: 'Science' },
    { id: 2, name: 'Material 2', department: 'Mathematics' },
    { id: 3, name: "Charlie", department: 'English' },
  ];
  export const getNodeList =async () => {
    return nodeList;
  }
  const screeningList = [
    { id: 1, name: "John Doe", phone: "123-456-7890", cases: "3/5" },
    { id: 2, name: "Jane Smith", phone: "234-567-8901", cases: "2/4" },
    { id: 3, name: "Alice Johnson", phone: "345-678-9012", cases: "1/3" },
  ];
  export const getScreeningList =async () => {
    return screeningList;
  }
  const adoptList = [
    { id: 1, name: "John Doe", phone: "123-456-7890" },
    { id: 2, name: "Jane Doe", phone: "234-567-8901" },
    { id: 3, name: "Alice Smith", phone: "345-678-9012" },
  ];
  export const getAdoptList =async () => {
    return adoptList;
  }