// import  {useState,useEffect} from 'react';
// import './DashBoard.css';
// import { useData , } from '../utils/DataContext';

// import BlueCard from '../components/card/BlueCard';
// import ScreeningCard from '../components/card/ScreeningCard';
// import ClinicianCard from '../components/card/ClinicianCard';
// import CenterCard from '../components/card/CenterCard';
// import NodeCard from '../components/card/NodeCard';
// import ExaminerCard from '../components/card/ExaminerCard';
// import ClientCard from '../components/card/ClientCard';
// import AdoptCard from '../components/card/AdoptCard';
// import DiagonosisCard from '../components/card/DiagonosisCard';
// import CampCard from '../components/card/CampCard';
// import { getClinicianList } from '../api/DashBoardApi';


// const Dashboard = () => {
//   const { userData } = useData();
//   const [clinicianList,setClinicianList] = useState()
 
//  useEffect(()=>{
//   const fetchData = async () => {
//     try {
//       const response = await getClinicianList();
//       console.log(response)
//       setClinicianList(response);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   fetchData()
//   },[])

//   return (
//     <section className="custom-overview">
//       {/* Display BlueCard and ScreeningCard for Nodal users */}
//       {userData.role?.toLowerCase() === 'nodal' && (
//         <div className="custom-navigation-buttons">
//           <BlueCard rows={clinicianList} />
//           <AdoptCard/>
//           <DiagonosisCard/>
//           <ScreeningCard />
//         </div>
//       )}

//       {/* Display InstituteCard when logged in as Institute */}
//       {userData.role?.toLowerCase() === 'institute' && (
//         <div className='custom-navigation-buttons'>
//           <CenterCard/>
//           <NodeCard/>
//         </div>
//       )}

//       {/* Display SchoolListCard when logged in as School */}
//       {userData.role?.toLowerCase() === 'school' && (
//         <div className='custom-navigation-buttons'>
//           <ExaminerCard />
//         </div>
//       )}
      
//       {userData.role?.toLowerCase() === 'teacher' && (
//         <div className='custom-navigation-buttons'>
//           <ClientCard/>
//         </div>
//       )}
      
//       {userData.role?.toLowerCase() === 'clinician' && (
//         <div className='custom-navigation-buttons'>
//           <ClinicianCard/>
//           <CampCard/>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import './DashBoard.css';
import { useData } from '../utils/DataContext';

import BlueCard from '../components/card/EditView';
import ScreeningCard from '../components/card/ScreeningCard';
import ClinicianCard from '../components/card/ClinicianCard';
import CenterCard from '../components/card/CenterCard';
import NodeCard from '../components/card/NodeCard';
import ExaminerCard from '../components/card/ExaminerCard';
import ClientCard from '../components/card/ClientCard';
import AdoptCard from '../components/card/AdoptCard';
import DiagonosisCard from '../components/card/DiagonosisCard';
import CampCard from '../components/card/CampCard';

import { 
  getClinicianList, 
  getCampList, 
  getCenterList, 
  getClientList, 
  getCaseList, 
  getDaigonisList, 
  getFacilitatorList, 
  getNodeList, 
  getScreeningList,
  getAdoptList
} from '../api/DashBoardApi';
import EditView from '../components/card/EditView';

const Dashboard = () => {
  const { userData } = useData();
  
  // State variables for each list
  const [clinicianList, setClinicianList] = useState([]);
  const [campList, setCampList] = useState([]);
  const [centerList, setCenterList] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [caseList, setCaseList] = useState([]);
  const [daigonisList, setDaigonisList] = useState([]);
  const [facilitatorList, setFacilitatorList] = useState([]);
  const [nodeList, setNodeList] = useState([]);
  const [screeningList, setScreeningList] = useState([]);
  const [adoptList, setAdoptList] = useState([]);

  // Fetch all data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clinicians = await getClinicianList();
        setClinicianList(clinicians);

        const camps = await getCampList();
        setCampList(camps);

        const centers = await getCenterList();
        setCenterList(centers);

        const clients = await getClientList();
        setClientList(clients);

        const cases = await getCaseList();
        setCaseList(cases);

        const daigonis = await getDaigonisList();
        setDaigonisList(daigonis);

        const facilitators = await getFacilitatorList();
        setFacilitatorList(facilitators);

        const nodes = await getNodeList();
        setNodeList(nodes);

        const screenings = await getScreeningList();
        setScreeningList(screenings);
        const adopts = await getAdoptList();
        setAdoptList(adopts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="custom-overview">
      {/* For Nodal users */}
      {userData.role?.toLowerCase() === 'nodal' && (
        <div className="custom-navigation-buttons">
          <EditView cardName="Material List" data={centerList} dataHeading={["slno","name","department"]}  navigateTo="/clinician" />
          <AdoptCard cardName="Clinician List " data={clinicianList} dataHeading={["slno","name","department","age","cases"]} navigateTo="/clinician"  />
          <DiagonosisCard rows={daigonisList} />
          <ScreeningCard rows={screeningList} />
        </div>
      )}

      {/* For Institute users */}
      {userData.role?.toLowerCase() === 'institute' && (
        <div className='custom-navigation-buttons'>
          <CenterCard rows={centerList} />
          <NodeCard rows={nodeList} />
        </div>
      )}

      {/* For School users */}
      {userData.role?.toLowerCase() === 'school' && (
        <div className='custom-navigation-buttons'>
          <ExaminerCard rows={facilitatorList} />
        </div>
      )}

      {/* For Teacher users */}
      {userData.role?.toLowerCase() === 'teacher' && (
        <div className='custom-navigation-buttons'>
          <ClientCard rows={clientList} />
        </div>
      )}

      {/* For Clinician users */}
      {userData.role?.toLowerCase() === 'clinician' && (
        <div className='custom-navigation-buttons'>
          <ClinicianCard rows={clinicianList} />
          <CampCard rows={campList} />
        </div>
      )}
    </section>
  );
};

export default Dashboard;
