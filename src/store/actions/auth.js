
import CommonServices from '../../Services/CommonServices';

export const login = (userData) => async dispatch => {
    try {
        const response = await CommonServices.postData(userData, `/Login/authenticate`);
        console.warn(response);
        if (response.status == "200") {
            localStorage.setItem('API_TOKEN', response.data.token);
            localStorage.setItem('UserName', response.data.userName);
            localStorage.setItem('UserId', response.data.userId);
            localStorage.setItem('RoleName', response.data.role);
            localStorage.setItem('RoleId', response.data.roleId);
            localStorage.setItem('isAuthenticateUser', true);
        }
        return response;
    }
    catch (error) {
    }
}