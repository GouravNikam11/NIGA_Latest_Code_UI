import {
    GET_SECTIONS,
    GET_BODY_PARTS_BY_SECTION,
    GET_SUB_SECTIONS_BY_BODY_PART,
    SEARCH_SUB_SECTIONS,
    ADD_RUBRICS,
    DELETE_RUBRICS,
    GET_REMEDY_COUNTS,
    USER_LOGGED_OUT,
    GET_DIAGNOSIS
} from '../actions/types';
const initialState = {
    sections: {},
    bodyParts: {},
    subsections: {},
    selectedRubrics: [],
    remedyCount: {},
    Diagnosis: []
}
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_SECTIONS:
            return {
                ...state,
                sections: action.payload
            };
        case GET_DIAGNOSIS:
            return {
                ...state,
                Diagnosis: action.payload
            }

        case GET_BODY_PARTS_BY_SECTION: {
            return {
                ...state,
                bodyParts: action.payload
            }
        };

        case GET_SUB_SECTIONS_BY_BODY_PART: {
            return {
                ...state,
                subsections: action.payload
            }
        };

        case SEARCH_SUB_SECTIONS: {
            return {
                ...state,
                subsections: action.payload
            }
        };

        case ADD_RUBRICS: {
            console.log('selectedRubrics == ', state.selectedRubrics)
            return {
                ...state,
                selectedRubrics: [...state.selectedRubrics, action.selectedRubric]
            }
        };
        case DELETE_RUBRICS: {
            return {
                ...state,
                selectedRubrics: action.selectedRubric
            }
        };
        case GET_REMEDY_COUNTS: {
            return {
                ...state,
                remedyCount: action.payload
            }
        };
        case USER_LOGGED_OUT: {
            return {
                state: undefined
            }
        };
        default:
            return state
    }
}