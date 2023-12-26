import { USER_LOGGED_IN, USER_LOGGED_OUT, UPDATE_USER_DATA } from '../actions/types'

const initialState = {
    userData: {
        city: null,
        classname: "est_cou_class",
        firstName: "Test999",
        lastName: null,
        role: "STUDENT",
        schoolId: null,
        schoolLogo: "School/Logo/2019/8/23bfc10b-e668-46b9-917f-72cea0d984d8.png",
        schoolName: "Grand Prix Driving School",
        studenAvatar: null,
        studentId: null,
        studentName: "Test999 Test999",
        studentPhoto: "/avatar/02-04-2020download (1).jpg",
        userId: "cad12ba8-e3a1-4b93-bcc4-05acd418eaa7",
        username: "Test999@yopmail.com"
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_DATA:
            return {
                ...state,
                userData: action.userData,
            };
        default:
            return state;
    }
}