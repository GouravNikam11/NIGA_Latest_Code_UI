import { GET_DOCTORS, GET_DOCTOR } from './types';
import CommonServices from '../../Services/CommonServices';

export const getDoctors = () => async dispatch => {
    try {
        const response = await CommonServices.getData('/mastersAPI/GetDoctors');
        dispatch({ type: GET_DOCTORS, payload: response });
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

export const getDoctor = id => async dispatch => {
    try {
        const response = await CommonServices.getDataById(id, '/mastersAPI/GetDoctorDetails');
        dispatch({ type: GET_DOCTOR, payload: response });
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