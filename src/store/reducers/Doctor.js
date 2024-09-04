import { GET_DOCTORS, GET_DOCTOR, SET_PARENT_OPTION, SET_CHILD_OPTION,HIDE_SHOW_SIDE_BAR } from '../actions/types';
const initialState = {
    doctors: {},
    doctor: {},
    parentObject: {},
    childObject: {},
    ishideshowsidebar:false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_DOCTORS:
            return {
                ...state,
                doctors: action.payload,
            }
        case GET_DOCTOR:
            return {
                ...state,
                doctor: action.payload
            };
        case SET_PARENT_OPTION:
            return {
                ...state,
                parentObject: action.payload
            }
        case SET_CHILD_OPTION:
            return {
                ...state,
                childObject: action.payload
            }
            case HIDE_SHOW_SIDE_BAR:
                return {
                    ...state,
                    ishideshowsidebar: action.payload
                }
        default:
            return state;
    }
}