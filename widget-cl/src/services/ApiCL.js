import axios from 'axios';
import moment from 'moment';
import {localApi, devApi, stagingApi, prodApi} from './../constants/ApiPath';

//Post to CL API 
const pull = (form, headersData, requestBody) => {
    const config= headersData;
    
    //Set Headers
    return axios.post(
        `${localApi}${form.company}`,
        requestBody,
        config,
    )
};


const getHeaders = () => {
    const config = {
        headers: {
            'Content-Type': 'application/xml'
        },
    };
    return config;
}


const getAppId = (form) => {
    let appId = "WCL";
    const timeId = moment().format('YYYYMMDDhhmmss');
    let company = form.company.substr(form.company.length - 7);
    company = company.replace('\-', '')
    
    appId += timeId;
    appId += company;

    return appId; 
}



const ApiCL = async form => {
    const headersData = getHeaders();
    const id = getAppId(form);
    
    const requestBody = `<?xml version="1.0" encoding="UTF-8"?>
    <data_area>
        <header_data>
            <action>S</action>
            <single_joint>0</single_joint>
            <xml_format>1</xml_format>
            <app_id>${id}</app_id>
        </header_data>
        <applicant_data>
            <applicant type="primary">
                <person_name>
                    <first_name>${form.firstName}</first_name>
                    <last_name>${form.lastName}</last_name>
                </person_name>
                <address_data>
                    <address type="current">
                        <line_one>${form.streetAddress}</line_one>
                        <city>${form.city}</city>
                        <state_or_province>${form.state}</state_or_province>
                        <postal_code>${form.zipCode}</postal_code>
                    </address>
                </address_data>
            </applicant>
        </applicant_data>
    </data_area>`;

    const response = pull(form, headersData, requestBody);

    return response;
}

export default ApiCL;