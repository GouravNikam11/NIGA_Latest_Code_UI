import axios from 'axios';
import common from '../Common/common'
/**
 * Created Date     :   20 Dec 2019.
 * Purpose          :   Authenticate user.
 * Author           ;   Chandrashekhar Salagar.
 */
export default {
    API_URL: common.API_URL,
    token: localStorage.getItem('API_TOKEN'),

    /**
     * Method to authenticate user.
     * @param {} user 
     */
    authenticate(user) {

        return axios({
            method: 'POST',
            url: `${common.API_URL}/Login/authenticate`,
            data: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then((response) => {
            return response;
        }).catch((error) => {
            return error;
        });
    }
}
