import { GET_LAB_TESTS, SAVE_LAB_ORDER, SAVE_LAB_ENTRY } from '../actions/types';
const initialState = {
    labTests: [],
    labOrders: {},
    labEntries: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LAB_TESTS:
            return {
                ...state,
                labTests: action.payload
            }
        case SAVE_LAB_ORDER:
            return {
                ...state,
                labOrders: action.payload
            }
        case SAVE_LAB_ENTRY:
            return {
                ...state,
                labEntries: action.payload
            }
        default:
            return state
    }
}