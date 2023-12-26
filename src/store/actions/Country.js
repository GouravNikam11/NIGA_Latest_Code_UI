import { GET_COUNTRIES, GET_STATES } from "./types";
import CommonServices from '../../Services/CommonServices';
export const getCountries = () => async dispatch => {
    try {
        const response = await CommonServices.getData("/country/");
        dispatch({ type: GET_COUNTRIES, payload: response });
        return response;
    }
    catch (error) {
        if (error.response) {
            console.log('error.response.data: ', error.response);
            if (error.response.data) {
                throw new Error(error.response.data)
            }
            throw new Error("Something went wrong")
        } else {
            throw error;
        }
    }
}

export const getStates = () => async dispatch => {
    try {
        const response = await CommonServices.getData('/mastersAPI/GetStates/');
        dispatch({ type: GET_STATES, payload: response });
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