
import React, { useEffect, useState } from 'react';
import './DashBoard.css';
import { useData } from '../utils/DataContext';
import AdoptCard from '../components/card/AdoptCard';
import { getReferredCaseList, getClinicianList, getNodeList, getScreeningList, getFacilitatorList, getCampList, getAdoptedNodeList } from '../api/participantapi';
import EditView from '../components/card/EditView';
import ViewCard from '../components/card/ViewCard';

const Dashboard = () => {
  const { userData, tempDiagnosis } = useData();
  const [referredCaseList, setReferredCaseList] = useState([])
  const [adoptedCaseList, setAdoptedCaseList] = useState([])
  const [clinicianList, setClinicianList] = useState([])
  const [nodeList, setNodeList] = useState([])
  const [screeningList, setScreeningList] = useState([])
  const [facilitatorList, setFacilitatorList] = useState([])
  const [campList, setCampList] = useState([])
  const [adoptedNodeList, setAdoptedNodeList] = useState([])


  useEffect(() => {
    console.log("referrred cases")
    const fetchReferredCaseList = async () => {
      const response = await getReferredCaseList("JP1")
      console.log(response);
      console.log(response.data);

      const data = response.data.map((item) => {        
        const newItem = {...item}; // create a copy
        if(newItem.referred_disorder_names == "")
            newItem.referred_disorder_names = "Pass"
        return newItem
      })

      //write a map function to filter the data where referred_disorder_names is not empty
      const data1 = response.data.filter((item) => {
        return item.referred_disorder_names != ""
      })

      console.log(`TempDiag ${tempDiagnosis}`)
      if(tempDiagnosis!="")
        // add the tempDiagnosis data to data1."Provisional diagnosis" key where id = 4
        data1.map((item) => {
          if(item.id == 4 )
            item["Provisional diagnosis"] = tempDiagnosis
        })           

      console.log(`data1 ${JSON.stringify(data1)}`);
        
      setReferredCaseList(data)
      setAdoptedCaseList(data1)
    } 

    fetchReferredCaseList()
  }, [])



  useEffect(()=>{
    const fetchClinicianList = async () => {
      const response = await getClinicianList()
      console.log(response);
      // console.log(response);
      setClinicianList(response)
    }

    fetchClinicianList();
  }, [])

  useEffect(()=>{
    const fetchNodeList = async () => {
      const response = await getNodeList()
      console.log(response);
      // console.log(response);
      setNodeList(response)
    }

    fetchNodeList();

  }, [])

  useEffect(()=>{
    const fetchScreeningList = async () => {
      const response = await getScreeningList()
      console.log(response);
      // console.log(response);
      setScreeningList(response)
    }

    fetchScreeningList();
  }, [])

  useEffect(()=>{
    const fetchFacilitatorList = async () => {
      const response = await getFacilitatorList()
      console.log(response);
      // console.log(response);
      setFacilitatorList(response)
    }

    fetchFacilitatorList();
  }, [])

  useEffect(()=>{
    const fetchCampList = async () => {
      const response = await getCampList()
      console.log(response);
      // console.log(response);
      setCampList(response)
    }

    fetchCampList();
  }, [])

  useEffect(()=>{
    const fetchAdoptedNodeList = async () => {
      const response = await getAdoptedNodeList()
      console.log(response);
      // console.log(response);
      setAdoptedNodeList(response)
    }

    fetchAdoptedNodeList();
  }, [])

  return (
    <section className="custom-overview">
      {/* Display BlueCard and ScreeningCard for Nodal users */}
      {userData.roleId?.toLowerCase() === 'hub' && (
        <div className="custom-navigation-buttons">
         <EditView cardName={"Material"} data={referredCaseList} dataHeading={["Sl no", "Id", "Name", "Referred Case"]} navigateEdit="/material" navigateView="/material" navigateCreate="/material" />
       
        </div>
      )}

      {/* Display InstituteCard when logged in as Institute */}
      {userData.roleId?.toLowerCase() === 'center' && (
        <div className='custom-navigation-buttons'>
          <EditView cardName={"Clinician"} data={clinicianList} dataHeading={["Id", "Name", "Phone", "Email"]} navigateEdit="/clinician" navigateView="/clinician" navigateCreate="/clinician" />
          <AdoptCard cardName={"Nodes (Schools, Camps)"} data={nodeList} dataHeading={["Id", "Name", "Contact", "Phone", "Email"]} />
          <ViewCard cardName={"Adopted Nodes(Schools, Camps)"} data={adoptedNodeList} dataHeading={["id", "Name", "Date", "Location"]} navigateView={"/student"}/>
          <EditView cardName={"Screening"} data={screeningList} dataHeading={["Id", "Name", "Dipartment"]} navigateEdit="/screening" navigateView="/screening" navigateCreate="/screening" />
        </div>
      )}

      {/* Display SchoolListCard when logged in as School */}
      {userData.roleId?.toLowerCase() === 'node' && (
        <div className='custom-navigation-buttons'>
          <EditView cardName={"Facilitator (Teachers/Clinicians)"} data={facilitatorList} dataHeading={["Id", "Name", "Phone", "Email"]} navigateEdit="/facilitator" navigateView="/facilitator" navigateCreate="/facilitator" />
        </div>
      )}
      {userData.roleId?.toLowerCase() === 'facilitator' && (
        <div className='custom-navigation-buttons'>
        <EditView cardName={"Client List"} data={referredCaseList} dataHeading={["Sl no", "Id", "Name", "Age", "Gender", "Phone", "Referred Case"]} navigateEdit="/client" navigateView="/client" navigateCreate="/client" />
        </div>
   
      )}
      {userData.roleId?.toLowerCase() === 'clinician' && (
        <div className='custom-navigation-buttons'>
          {/* <AdoptCard rows = {referredCaseList} cardName={"Referred Case List"} row_name={["Sl no", "Id", "Name", "Referred Disorder" ]} create_navigate={"/student"} /> */}
          <AdoptCard cardName={"Referred Case List"} data={referredCaseList} dataHeading={["Sl no", "Id", "Name", "Age", "Gender", "Phone", "Referred Case"]} navigateCreate={"/student"} />
          <ViewCard cardName={"Adopted Case List"} data={adoptedCaseList} dataHeading={["Sl no", "Id", "Name", "Age", "Gender", "Phone", "Referred Case"]} navigateView={"/diagnosis"}/>
          <ViewCard cardName={"Nodes (Camps)"} data={campList} dataHeading={["id", "Name", "Date", "Location"]} navigateView={"/diagnosis"}/>
        </div>
      )}
      {/* Display UserCard for other roles (excluding Nodal and Institute) */}
      {/* {userData.role?.toLowerCase() !== 'nodal' && userData.role?.toLowerCase() !== 'institute' && (
        <UserCard />
      )} */}
    </section>
  );
};

export default Dashboard;

