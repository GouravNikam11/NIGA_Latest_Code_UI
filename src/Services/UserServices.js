import axios from 'axios';
import common from '../Common/common'
/**
 * Created Date     :   17 Dec 2019.
 * Purpose          :   API calls to master forms.
 * Author           ;   Chandrashekhar Salagar.
 */
export default {
    API_URL: common.API_URL,
    token: localStorage.getItem('API_TOKEN'),
    /**
     * Method to get all countries
     */
    getCountriesList() {
        return axios({
            method: 'GET',
            url: `${common.API_URL}/country`,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(function (response) {
            console.log(response.data);
            return response.data;
        }).catch(function (error) {
            console.log(error);
        });
    },
    saveUser(user) {
        return axios({
            method: 'POST',
            url: `${common.API_URL}/users`,
            data: JSON.stringify(user),
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            return error;
        });
    }
}
