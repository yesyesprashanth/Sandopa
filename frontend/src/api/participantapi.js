import axios from "axios"
import { convertObjectToSnakeCase } from "../utils/camelCaseToSnakeCase"

//read REACT_USER_URL from env
const userUrl = process.env.REACT_APP_USER_URL


export const getReferredCaseList = async(nodeId) => {
    try
    {
        const response =  await axios.get(`${userUrl}/participant/get-referred-list`, {params:{"node_id":nodeId}})
        return response.data
    }
    catch(error)
    {
        console.log(error)
    }
}


const clinician = [
    {
        "id": "A12141",
        "Name":"Hemanth N",
        "Phone":"9986767778",
        "Email":"hemanth@gmail.com"

    },
    {
        "id": "A12142",
        "Name":"Narsimhan",
        "Phone":"9978761234",
        "Email":"narsimhan@gmail.com"
    },
    {
        "id": "A12143",
        "Name":"Vishal",
        "Phone":"9983467278",
        "Email":"vishal@gmail.com"
    },
    {
        "id": "A12144",
        "Name":"Guru",
        "Phone":"9986767348",
        "Email":"guru@gmail.com"
    },   
]

export const getClinicianList = async() => {
    try
    {
        return clinician
    }
    catch(error)
    {
        console.log(error)
    }
}

const nodeList = [
    {
        "id": "29200124118",
        "Name":"JSS Public School",
        "Contact Person": "Harish",
        "Phone": "7778788766",
        "Email": "harish@gmail.com"
    },
    {
        "id": "29200136213",
        "Name":"JSS Saraswathipuram School",
        "Contact Person": "Ravi",
        "Phone": "8771788736",
        "Email": "ravi@gmail.com"
    },
    {
        "id": "29200145125",
        "Name":"JSS Metagalli ",
        "Contact Person": "Sandesh",
        "Phone": "9778788734",
        "Email": "sandesh@gmail.com"
    }
]

export const getNodeList = async() => {
    try
    {
        return nodeList
    }
    catch(error)
    {
        console.log(error)
    }
}

const screeningList = [
    {
        "id": 1,
        "Name": "School screening for communication disorder",
        "Department": "Speech and Hearing"
    },
    {
        "id":2,
        "Name": "Vestibular screening",
        "Department": "Audiology"
    },
    {
        "id":3,
        "Name": "Screening for voice disorders among teacher",
        "Department": "Speech Science"
    }
]

export const getScreeningList = async() => {
    try
    {
        return screeningList
    }
    catch(error)
    {
        console.log(error)
    }
}

const FacilitatorList = [
    {
        "id": "3987",
        "Name":"Saritha N",
        "Phone":"9346767718",
        "Email":"saritha@gmail.com"

    },
    {
        "id": "4198",
        "Name":"Jeevan",
        "Phone":"9898761214",
        "Email":"jeevan@gmail.com"
    },
    {
        "id": "7657",
        "Name":"Suraj",
        "Phone":"8983467271",
        "Email":"suraj@gmail.com"
    },
    {
        "id": "2144",
        "Name":"Shivakumar",
        "Phone":"7986767348",
        "Email":"shiva@gmail.com"
    },   
]

export const getFacilitatorList = async() => {
    try
    {
        return FacilitatorList
    }
    catch(error)
    {
        console.log(error)
    }
}

const campList = [
    {
        "id": "1",
        "Name":"Uthrahalli Village-Hearing screening camp",
        "Date": "12-02-2025",        
        "Location": "Uthrahalli, Mysore"
    },
    {
        "id": "2",
        "Name":"Inkal Village-Speech langauge screening camp",
        "Date": "17-04-2025",
        "Location": "Inkal, Mysore"
        
    },
    {
        "id": "3",
        "Name":"Suttur Village-Screening for communication disorder camp",
        "Date": "22-05-2025",
        "Location": "Suttur, Mysore"
    }
]

export const getCampList = async() => {
    try
    {
        return campList
    }
    catch(error)
    {
        console.log(error)
    }
}

const adoptedNodeList = [
    {
        "id": "292001241357",
        "Name":"JSS Central School",
        "Contact Person": "Jagdeesh",
        "Phone": "7778788786",
        "Email": "jagdeesh@gmail.com"
    }    
]

export const getAdoptedNodeList = async() => {
    try
    {
        return adoptedNodeList
    }
    catch(error)
    {
        console.log(error)
    }
}