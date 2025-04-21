class ScreeningQuestions{
    constructor(screeningName, id, testList){
        this.screeningName = screeningName
        this.id = id
        this.testList = testList
    }

    toJSON(){
        return {
            id: this.id,
            screeningName: this.screeningName,
            testList: this.testList            
        }    
    }

    toObject(id,screeningName, testList){
        this.id = id
        this.screeningName = screeningName
        this.testList = testList
    }
}

class StudentResponse{
    constructor(schoolId, studentId, screeningId, responseList, disorderStatus){
        this.schoolId = schoolId,
        this.studentId = studentId
        this.screeningId = screeningId, 
        this.responseList = responseList
        this.disorderStatus = disorderStatus
    }
}