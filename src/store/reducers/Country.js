import { GET_COUNTRIES, GET_STATES } from '../actions/types';
const initialState = {
    countries: [],
    states: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            };

        case GET_STATES:
            return {
                ...state,
                states: action.payload
            }
        default:
            return state
    }
}