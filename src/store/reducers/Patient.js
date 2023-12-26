import { SAVE_PATIENT, GET_PATIENT, SET_IDS, SET_LIST, SET_EXISTANCE,GET_SUBSECTION } from "../actions/types";
const initialState = {
    patient: {},
    questionSectionId: 0,
    questionGroupId: 0,
    questionSubgroupId: 0,
    bodyPartId: 0,
    GetQuestionsBySelectedIdforclinicalquestion: [],
    SubGroupQuestionSection: [],
    BodyPartforclinicalquestion: [],
    existance: [],
    Getallsubsections:[]

};

export default (state = initialState, action) => {
    switch (action.type) {
        case SAVE_PATIENT:
            return {
                ...state,
                patient: action.payload
            };
        case GET_PATIENT:
            return {
                ...state,
                patient: action.payload
            };
        case SET_IDS:
            return {
                ...state,
                questionSectionId: action.questionSectionId,
                questionGroupId: action.questionGroupId,
                questionSubgroupId: action.questionSubgroupId,
                bodyPartId: action.bodyPartId,
            };
        case SET_LIST:
            return {

                ...state,
                GetQuestionsBySelectedIdforclinicalquestion: action.GetQuestionsBySelectedIdforclinicalquestion,
                SubGroupQuestionSection: action.SubGroupQuestionSection,
                BodyPartforclinicalquestion: action.BodyPartforclinicalquestion
            };
        case SET_EXISTANCE:
            console.log('SET_EXISTANCE==', action.existance)
            return {

                ...state,
                existance: action.existance
            };
            case GET_SUBSECTION:
                return {
                    ...state,
                    Getallsubsections: action.Getallsubsections
                };
        default:
            return state;
    }
}