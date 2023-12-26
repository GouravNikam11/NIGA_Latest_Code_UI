import {
    GET_SECTIONS,
    GET_BODY_PARTS_BY_SECTION,
    GET_SUB_SECTIONS_BY_BODY_PART,
    SEARCH_SUB_SECTIONS,
    ADD_RUBRICS,
    DELETE_RUBRICS,
    GET_REMEDY_COUNTS,
    GET_REMEDY_NAME,
    GET_DIAGNOSIS

} from './types';
import CommonServices from '../../Services/CommonServices';
import debounce from 'lodash.debounce';

export const getSections = () => async dispatch => {
    try {
        const response = await CommonServices.getData(`/mastersAPI/GetSections`)
        dispatch({ type: GET_SECTIONS, payload: response });
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
};




export const GetAllDiagnosis = () => async dispatch => {
    try {
        const response = await CommonServices.getData(`/diagnosis/GetDiagnosis`)
        dispatch({ type: GET_DIAGNOSIS, payload: response });
       // console.log('GetAllDiagnosis=======',response)
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
};

export const getBodyPartsBySection = (sectionId) => async dispatch => {
    try {
        const response = await CommonServices.getDataById(sectionId, `/bodypart/GetBodyPartsBySection`);
        dispatch({ type: GET_BODY_PARTS_BY_SECTION, payload: response });
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
};

export const getSubSectionsByBodyPart = bodyPartId => async dispatch => {
    try {
        const response = await CommonServices.getDataById(bodyPartId, `/mastersAPI/GetSubSectionByBodyPart`);
        dispatch({ type: GET_SUB_SECTIONS_BY_BODY_PART, payload: response });
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
};
export const searchSubSections = keyword => async dispatch => {
    try {
        const response = await CommonServices.getDataById(keyword, `/mastersAPI/SearchSubSections`);
        dispatch({ type: SEARCH_SUB_SECTIONS, payload: response });
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

export const addRubrics = (rubric, intensity) => dispatch => {
    dispatch({ type: ADD_RUBRICS, selectedRubric: rubric });
    return rubric;
}

export const deleteRubrics = (rubric) => dispatch => {
    dispatch({ type: DELETE_RUBRICS, selectedRubric: rubric });
    return rubric;
}

export const getRemedyCounts = subSectionId => async dispatch => {
    try {
        const response = await CommonServices.getDataById(subSectionId, `/RubricRemedy/GetRemedyCounts`);
        dispatch({ type: GET_REMEDY_COUNTS, payload: response });
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

export const getRemedyName = subSectionId => async dispatch => {
    debugger;
    try {
        const response = await CommonServices.getDataById(subSectionId, `/remedy/GetRemediesBySubSection`);
        dispatch({ type: GET_REMEDY_NAME, payload: response });
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


