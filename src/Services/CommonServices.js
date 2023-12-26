import axios from 'axios';
import common from '../Common/common'
/**
 * Created Date     :   20 Dec 2019.
 * Purpose          :   Common service for all API methods
 * Author           ;   Chandrashekhar Salagar.
 */
export default class {
    /**
     * Method to authenticate user.
     * @param {} data 
     */
    static postData(data, URL) {
        debugger;
        const API_URL = common.API_URL;
        const token = localStorage.getItem('API_TOKEN');
        return axios({
            method: 'POST',
            url: `${API_URL}` + `${URL}`,
            data: JSON.stringify(data),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then((data) => {
            debugger;
            console.log('response ==', data)
            return data;
        }).catch((error) => {
            return error;
        });
    };




    static post(data, URL) {
        debugger;
        const API_URL = common.API_URL;
        const token = localStorage.getItem('API_TOKEN');
        return axios({
            method: 'POST',
            url: `${API_URL}` + `${URL}`,
            data: JSON.stringify(data),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json; text/plain; charset=UTF-8'
            }
        }).then((data) => {
            debugger;
            console.log('response ==', data)
            return data;
        }).catch((error) => {
            return error;
        });
    };
    /**
     * Common method to get all data.
     */
    static getData(URL) {

        const API_URL = common.API_URL;

        const token = localStorage.getItem('API_TOKEN');
        return axios({
            method: 'GET',
            url: `${API_URL}` + `${URL}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('API_TOKEN')}`,
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(function (response) {
            // console.log(response.data);
            return response.data;
        }).catch(function (error) {
            // console.log(error);
        });
    };




    /**
     * Common method to get all data.
     */
    static getDataById(Id, URL) {

        const API_URL = common.API_URL;

        const token = localStorage.getItem('API_TOKEN');
        // console.log(`${common.API_URL}` + `${URL}/` + `${Id}`);                
        return axios({
            method: 'GET',
            url: `${API_URL}` + `${URL}/` + `${Id}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(function (response) {
           // console.log('console', response.data);
            return response.data;
        }).catch(function (error) {

            // console.log(error);
        });
    };



    static getDataByIdmonogram(Id, URL) {

        const API_URL = common.API_URL;

        const token = localStorage.getItem('API_TOKEN');
        debugger
        // console.log(`${common.API_URL}` + `${URL}/` + `${Id}`);                
        return axios({

            method: 'GET',
            url: `${API_URL}` + `${URL}` + `${Id}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(function (response) {
            console.log('console', response.data);
            return response.data;
        }).catch(function (error) {

            // console.log(error);
        });
    };

    /**
        * Common method to get all data using multi Id.
        */

    static getDataBymultiId(Id, caseId, URL) {

        const API_URL = common.API_URL;

        const token = localStorage.getItem('API_TOKEN');
        // console.log(`${common.API_URL}` + `${URL}/` + `${Id}`);                
        return axios({
            method: 'GET',
            url: `${API_URL}` + `${URL}/` + `${Id}/` + `${caseId}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(function (response) {
            // console.log(response.data);
            return response.data;
        }).catch(function (error) {

            // console.log(error);
        });
    };
}
