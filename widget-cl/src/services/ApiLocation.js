import axios from 'axios';
import {localZipCodeApi, devZipCodeApi, stagingZipCodeApi, prodZipCodeApi} from './../constants/ApiPath';

const ApiLocation = async zipCode => {
    const response = axios.get(
        `${localZipCodeApi}`, {
        params: {
            zip: zipCode
        },
    })
    return response;
}

export default ApiLocation;