import axios from "axios"
import { convertObjectToSnakeCase } from "../utils/camelCaseToSnakeCase"

//read REACT_USER_URL from env
const userUrl = process.env.REACT_APP_USER_URL


export const verifyUser = async(userCredentials) =>{
    try
    {
        const userCred = convertObjectToSnakeCase(userCredentials)   
        const response = await axios.post(userUrl + '/user/verify-credentials', userCred)
        return response.data
    }
    catch (error)
    {
        console.log(error)
    }
}

export const getHubList = async() => {    
    try
    {
        const response = await axios.get(userUrl + '/hub/list-hub')
        return response.data.data
    }
    catch (error)
    {
        console.log(error)
    }
}

export const RegisterCenter = async (centerData) => {    
    const center = convertObjectToSnakeCase(centerData)   
    try
    {        
        const response = await axios.post(userUrl+'/center', center)
        return response.data
    }
    catch (error)
    {
        console.log(error)
    }
}

export const registerClinician = async (clinicianData) => {
    const clinician = convertObjectToSnakeCase(clinicianData)
    console.log(clinician);
    try
    {
        const response = await axios.post(userUrl + '/clinician', clinician)
        return response.data
    }
    catch (error)
    {
        console.log(error)
    }
}

export const registerNode =async(nodeData)=>{
    const node = convertObjectToSnakeCase(nodeData)
    console.log(node)
    try
    {
        const response = await axios.post(userUrl + '/node', node)
        return response.data
    }
    catch (error)
    {
        console.log(error)
    }
}

export const registerFacilitator = async(facilitatorData) =>{
    const facilitator = convertObjectToSnakeCase(facilitatorData)    
    try
    {
        const response = await axios.post(userUrl + '/facilitator', facilitator)
        return response.data
    }
    catch (error)
    {
        console.log(error)
    }

}

export const registerParticipant = async(participantData) =>{
    const participant = convertObjectToSnakeCase(participantData)    
    console.log(participant)
    try
    {
        const response = await axios.post(userUrl + '/participant', participant)
        return response.data
    }
    catch (error)
    {
        console.log(error)
    }
}

export const getCentersByHub = async(hubId) => {    
    try {
        const response = await axios.get(`${userUrl}/center/by-hub/${hubId}`)
        return response.data.data
    } catch (error) {
        console.log(error)
        return []
    }
}