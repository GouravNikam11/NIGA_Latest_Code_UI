import { GET_ALL_INTENSITIES } from './types';
import CommonServices from '../../Services/CommonServices';
export const getIntensities = () => async dispatch => {
    try {
        const response = await CommonServices.getData(`/intensity`);
        dispatch({ type: GET_ALL_INTENSITIES, payload: response });
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
