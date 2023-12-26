import { GET_LAB_TESTS, SAVE_LAB_ORDER, SAVE_LAB_ENTRY } from './types';
import CommonServices from '../../Services/CommonServices';

export const getLabs = () => async dispatch => {
    try {
        const response = await CommonServices.getData(`/PatientLab/GetAllLabTests`);
        dispatch({ type: GET_LAB_TESTS, payload: response });
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

export const saveLabOrder = LabOrder => async dispatch => {
    try {
        const response = await CommonServices.postData(LabOrder, `/PatientLab/SavePatientLabOrder`);
        dispatch({ type: SAVE_LAB_ORDER, payload: response });
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

export const saveLabEntry = labEntry => async dispatch => {
    try {
        const response = await CommonServices.postData(labEntry, `/PatientLab/SavePatientLabEntry`);
        dispatch({ type: SAVE_LAB_ENTRY, payload: response });
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