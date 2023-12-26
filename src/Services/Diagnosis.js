import axios from 'axios';
import common from '../Common/common'
/**
 * Created Date     :   19 Dec 2019.
 * Purpose          :   API calls to master forms.
 * Author           ;   
 */
export default {
    API_URL: common.API_URL,
    token: localStorage.getItem('API_TOKEN'),

    /**
     * Method to get all Diagnosis.
     */
    getDiagnosis() {
        var diagnosisId = 1;
        return axios({
            method: 'GET',
            url: `${common.API_URL}/diagnosis/getdiagnosis`,
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


    /**
    * Method to get all Diagnosis groups.
    */
    getDiagnosisGroups() {
        return axios({
            method: 'GET',
            url: `${common.API_URL}/diagnosisgroup`,
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
    /**
    * Method to get all section
    */
    getSectionList() {
        return axios({
            method: 'GET',
            url: `${common.API_URL}/mastersAPI/getsections`,
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

    /**
    * Method to get all subsection
    */
    getSubSectionList() {
        return axios({
            method: 'GET',
            url: `${common.API_URL}/mastersAPI/getsubsections`,
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
    /**
     * Method to save Diagnosis.
     */
    saveDiagnosis(diagnosisModel) {
        debugger;
        return axios({
            method: 'POST',
            url: `${common.API_URL}/diagnosis`,
            data: JSON.stringify(diagnosisModel),
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            return error;
        });
    },


    /**
     * Method to get diagnosis for edit
     */
    getDiagnosisForEdit(DiagnosisId) {
        debugger;
        return axios({
            method: 'GET',
            url: `${common.API_URL}/diagnosis/${DiagnosisId}`,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(function (response) {
            debugger;
            console.log(response.data);
            return response.data;
        }).catch(function (error) {
            console.log(error);
        });
    },

    deleteDiagnosis(diagnosisModel) {
        debugger;
        return axios({
            method: 'POST',
            url: `${common.API_URL}/diagnosis/deletediagnosis`,
            data: JSON.stringify(diagnosisModel),
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
