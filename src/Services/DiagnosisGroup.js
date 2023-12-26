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
     * Method to get all Diagnosis groups.
     */
    getDiagnosisGroups() {
        console.log("List Token" + this.token);

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
     * Method to save Diagnosis groups.
     */
    saveDiagnosisGroup(diagnosisGroupModel) {

        return axios({
            method: 'POST',
            url: `${common.API_URL}/diagnosisgroup`,
            data: JSON.stringify(diagnosisGroupModel),
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
     * Method to get diagnosis group for edit
     */
    getDiagnosisgroupForEdit(DiagnosisGroupId) {

        return axios({
            method: 'GET',
            url: `${common.API_URL}/diagnosisgroup/${DiagnosisGroupId}`,
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

    deleteDiagnosisgroup(diagnosisGroupModel) {

        return axios({
            method: 'POST',
            url: `${common.API_URL}/diagnosisgroup/DeleteDiagnosisGroup`,
            data: JSON.stringify(diagnosisGroupModel),
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
    getDiagnosis() {
        return axios({
            method: 'GET',
            url: `${common.API_URL}/diagnosisgroup/GetDiagnosis`,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(function (response) {
            return response.data;
        }).catch(function (error) {
            console.log(error);
        });
    },

}