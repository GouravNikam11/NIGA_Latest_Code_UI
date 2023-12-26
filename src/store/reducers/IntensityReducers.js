import { GET_ALL_INTENSITIES } from '../actions/types';
const initialState = {
    Intensities: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_INTENSITIES:
            return {
                ...state,
                Intensities: action.payload
            };
        default:
            return state
    }
}
