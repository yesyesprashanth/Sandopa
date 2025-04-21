import axios from "axios"
import { convertObjectToSnakeCase } from "../utils/camelCaseToSnakeCase"

//read REACT_USER_URL from env
const userUrl = process.env.REACT_APP_USER_URL


  export const getScreeningQuestions = async(screeningData) =>{
    try{
        screeningData = convertObjectToSnakeCase(screeningData)
        const response = await axios.post(userUrl + '/screening', screeningData)
      
        return response.data
    }catch(error){
        console.log(error)
    }
  }

  export const getScreeningQuestionnaireList = async(nodeId) =>{
    try{
      console.log(`Center_id ${nodeId}`)
      const response = await axios.get(userUrl + '/screening/sq-list', {params: {"node_id": nodeId}})
      return response.data
    }
    catch(error){
      console.log(error)
    }
  }

  export const saveScreeningResult = async(screeningData) =>{
    try{
      const screeningResult = convertObjectToSnakeCase(screeningData)
      console.log(screeningResult)
      const response = await axios.post(userUrl + '/participant/save-participant-response', screeningResult)
      return response.data
    }
    catch(error){
      console.log(error)
    }
  }