
import CommonServices from '../../Services/CommonServices';

export const login = (userData) => async dispatch => {
    try {
        const response = await CommonServices.postData(userData, `/Login/authenticate`);
        console.log("login response", response);
        if (response.status == "200") {
            localStorage.setItem('API_TOKEN', response.data.token);
            localStorage.setItem('UserName', response.data.userName);
            localStorage.setItem('UserId', response.data.userId);
            localStorage.setItem('RoleName', response.data.role);
            localStorage.setItem('RoleId', response.data.roleId);
            localStorage.setItem('isAuthenticateUser', true);
            localStorage.setItem('isPlanActive', response.data.isPlanActive);
            localStorage.setItem('islastFiveDays', response.data.islastFiveDays);
            localStorage.setItem('daysRemaining', response.data.daysRemaining);
        }
        return response;
    }
    catch (error) {
    }
}