import axios from 'axios';

export default class {
    static postData(data, URL) {
        const API_URL = "https://json.astrologyapi.com/v1";
        const userId = '618179';
        const apiKey = 'd210eea6239df2ca27d15a77aa271876';
        return axios({
            method: 'POST',
            url: `${API_URL}` + `${URL}`,
            data: JSON.stringify(data),
            headers: {
                "authorization": "Basic " + btoa(userId + ":" + apiKey),
                "Content-Type": 'application/json'
            }
        }).then((response) => {
            return response;
        }).catch((error) => {
            return error;
        });
    };
}
