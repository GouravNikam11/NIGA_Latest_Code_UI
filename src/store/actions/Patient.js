import { SAVE_PATIENT, GET_PATIENT, SET_IDS, SET_LIST, GET_SUBSECTION } from './types';
import CommonServices from '../../Services/CommonServices';
export const savePatient = patient => async dispatch => {
    try {
        const response = await CommonServices.postData(patient, '/patient');
        dispatch({ type: SAVE_PATIENT, payload: response });
        return response;
    }
    catch (error) {
        if (error.response) {
            if (error.response.data) {
                throw new Error(error.response.data)
            }
            throw new Error("Something went wrong")
        } else {
            throw error;
        }
    }
}

export const getPatient = (id, caseId) => async dispatch => {
    debugger;
    try {
        const response = await CommonServices.getDataBymultiId(id, caseId, '/patient/GetPatientDetails');
        dispatch({ type: GET_PATIENT, payload: response });
        return response;
    }
    catch (error) {
        if (error.response) {
            if (error.response.data) {
                throw new Error(error.response.data)
            }
            throw new Error("Something went wrong")
        } else {
            throw error;
        }
    }
}


export const getSubSection = (referencesectionId) => async dispatch => {
    debugger
    await CommonServices.getDataById(referencesectionId, `/subsection/GetSubSections`).then((temp) => {
        debugger
        dispatch({ type: GET_SUBSECTION, Getallsubsections: temp })
    });

};


export const setIds = (questionSectionId, questionGroupId, questionSubgroupId, bodyPartId) => async dispatch => {
    debugger;
    CommonServices.getData(`/clinicalquestions/GetQuestionsBySelectedId?QuestionGroupId=` + questionGroupId + `&QuestionSectionId=` + questionSectionId + `&QuestionSubgroupId=` + questionSubgroupId + `&BodyPartId=` + bodyPartId).then((temp) => {
        debugger;
        console.log('setIds====', temp)

        var copyTableData = temp;
        let distinctValues = new Set();
        let array = []
        copyTableData.forEach(element => {
            let value = parseInt(element.questionSubgroupId);
            let label = element.questionSubgroup1;

            if (!distinctValues.has(value)) {
                let obj = {
                    value: value,
                    label: label
                };
                array.push(obj);
                distinctValues.add(value);
            }
        });
        console.log("array=====", array)

        var copyTableData = temp;
        let array1 = [];
        let distinctValues1 = new Set();

        copyTableData.forEach(element => {
            if (element.bodyPartId !== null && element.bodyPartName !== null) {
                let value = parseInt(element.bodyPartId);
                let label = element.bodyPartName;

                if (!distinctValues1.has(value)) {
                    let obj = {
                        value: value,
                        label: label
                    };
                    array1.push(obj);
                    distinctValues1.add(value);
                }
            }
        });
        console.log("array1=====", array1)

        dispatch({
            type: SET_LIST, GetQuestionsBySelectedIdforclinicalquestion: temp,
            SubGroupQuestionSection: array, BodyPartforclinicalquestion: array1
        })
        dispatch({ type: SET_IDS, questionSectionId: questionSectionId, questionGroupId: questionGroupId })
    })
}
