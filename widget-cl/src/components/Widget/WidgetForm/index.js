import React,{ Component } from "react";
import ApiCL from './../../../services/ApiCL';
import ApiLocation from './../../../services/ApiLocation';
import WclLoader from './../../WclLoader/WclLoader';
import {Typeahead,AsyncTypeahead} from 'react-bootstrap-typeahead';
import WidgetCertificate from "../WidgetCertificate";
import xml2js from 'xml2js';
import {localApi, devApi, stagingApi, prodApi, localZipCodeApi, devZipCodeApi, stagingZipCodeApi, prodZipCodeApi} from './../../../constants/ApiPath'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import "./styles.css";


class WidgetForm extends Component {

    setTextToCertificate = (response) => {
        if(response.data_area.xml_interface[0].error[0] === 'false'){
            let availableCars = ""
            if(response.data_area.vin_list[0] !== ""){
                availableCars = response.data_area.vin_list[0].vin.length;
            }else{
                availableCars = 0;
            }
            
            const rooftopName = response.data_area.rooftop_data[0].name;
            let newTitle = 'Congrats!';
            let newText = `You've qualified for ${availableCars} vehicles available at your local ${rooftopName}!`;
            
            if(availableCars < 10){
                newText = `You've qualified for awesome vehicles  at your local ${rooftopName}!`;
            }

            if(availableCars === 0){
                newTitle = "Sorry!"
                newText = `There are not vehicles for you at your local ${rooftopName}!`;
            }

            this.setState({
                loadingDataFromPull: false,
                titleCertificate: newTitle,
                textCertificate: newText,
                showCertificate: true,
                showForm: false,
            })
        }

        if(response.data_area.xml_interface[0].error[0] === 'true'){
            const errorData = response.data_area.xml_interface[0].error_descript[0].substring(
                response.data_area.xml_interface[0].error_descript[0].lastIndexOf(")") + 1,
                response.data_area.xml_interface[0].error_descript[0].length);

            this.state.errors.connection = errorData;
            this.setState({
                loadingDataFromPull: false,
            })
        }

        
    }

    validateZipCode = (zipCode) => {
        let errors = this.state.errors;

        if(zipCode.length < 5 ) {
            errors.zipCode = 'Zip Code should be 5 digits'
            this.forceUpdate();
        }

        if(zipCode.length === 5){
            errors.zipCode = '';
            const regex = RegExp("[0-9]{5}");
            let zipcodeValid = regex.test(zipCode);
            errors.zipCode = zipcodeValid ? '' : 'Zip Code should be 5 digits'
        }
        

    }

    selectLocation = (selected) =>{
        let errors = this.state.errors;
        if(selected.length > 0){
            const stateId = selected[0].state;
            const newState = this.getStates().find(element => element.state === stateId);
            const newSelectedState = [newState];

            errors.state = '';
            errors.city = '';  
            this.setState ({
                errors,
                zipCode: selected[0].id,
                city: selected[0].city,
                state: newState.state,
                selectedState: newSelectedState,
            });

        }
    }

    getLocation = async (selected) => {
        this.setState({isLoading: true});
        try{
            const response = await ApiLocation(selected);
            const data = {id: response.data.id , city: response.data.city, state: response.data.state};
            this.setState ({
                isLoading: false,
                options: [data],
            });
        }catch( err ) {
            this.state.errors.zipCode = "Zip Code not found"
            this.setState ({
                isLoading: false,
            });
        }
    }

    selectState = (selected) =>{
        let errors = this.state.errors;

        if(selected.length > 0){
            errors.state = '';
            this.setState ({
                state: selected[0].name,
                selectedState: selected,
                errors
            });
        }
    }

    getStates = () => {
        const states = [
            {state: 'AL' , name: 'Alabama'},
            {state: 'AK' , name: 'Alaska'},
            {state: 'AS' , name: 'American Samoa'},
            {state: 'AZ' , name: 'Arizona'},
            {state: 'AR' , name: 'Arkansas'},
            {state: 'AE' , name: 'Armed Forces Europe'},
            {state: 'AP' , name: 'Armed Forces Pacific'},
            {state: 'AA' , name: 'Armed Forces the Americas'},
            {state: 'CA' , name: 'California'},
            {state: 'CO' , name: 'Colorado'},
            {state: 'CT' , name: 'Connecticut'},
            {state: 'DE' , name: 'Delaware'},
            {state: 'DC' , name: 'District of Columbia'},
            {state: 'FM' , name: 'Federated States of Micronesia'},
            {state: 'FL' , name: 'Florida'},
            {state: 'GA' , name: 'Georgia'},
            {state: 'GU' , name: 'Guam'},
            {state: 'HI' , name: 'Hawaii'},
            {state: 'ID' , name: 'Idaho'},
            {state: 'IL' , name: 'Illinois'},
            {state: 'IN' , name: 'Indiana'},
            {state: 'IA' , name: 'Iowa'},
            {state: 'KS' , name: 'Kansas'},
            {state: 'KY' , name: 'Kentucky'},
            {state: 'LA' , name: 'Louisiana'},
            {state: 'ME' , name: 'Maine'},
            {state: 'MH' , name: 'Marshall Islands'},
            {state: 'MD' , name: 'Maryland'},
            {state: 'MA' , name: 'Massachusetts'},
            {state: 'MI' , name: 'Michigan'},
            {state: 'MN' , name: 'Minnesota'},
            {state: 'MS' , name: 'Mississippi'},
            {state: 'MO' , name: 'Missouri'},
            {state: 'MT' , name: 'Montana'},
            {state: 'NE' , name: 'Nebraska'},
            {state: 'NV' , name: 'Nevada'},
            {state: 'NH' , name: 'New Hampshire'},
            {state: 'NJ' , name: 'New Jersey'},
            {state: 'NM' , name: 'New Mexico'},
            {state: 'NY' , name: 'New York'},
            {state: 'NC' , name: 'North Carolina'},
            {state: 'ND' , name: 'North Dakota'},
            {state: 'MP' , name: 'Northern Mariana Islands'},
            {state: 'OH' , name: 'Ohio'},
            {state: 'OK' , name: 'Oklahoma'},
            {state: 'OR' , name: 'Oregon'},
            {state: 'PA' , name: 'Pennsylvania'},
            {state: 'PR' , name: 'Puerto Rico'},
            {state: 'RI' , name: 'Rhode Island'},
            {state: 'SC' , name: 'South Carolina'},
            {state: 'SD' , name: 'South Dakota'},
            {state: 'TN' , name: 'Tennessee'},
            {state: 'TX' , name: 'Texas'},
            {state: 'UT' , name: 'Utah'},
            {state: 'VT' , name: 'Vermont'},
            {state: 'VI' , name: 'Virgin Islands, U.S.'},
            {state: 'VA' , name: 'Virginia'},
            {state: 'WA' , name: 'Washington'},
            {state: 'WV' , name: 'West Virginia'},
            {state: 'WI' , name: 'Wisconsin'},
            {state: 'WY' , name: 'Wyoming'}
        ]
        return states;
    }
    
    getDynamicCss = () => {
        const dynamicStyle = {
            backgroundColor: this.props.primaryColor,
            color: this.props.fontColor,
        };
        const dynamicStyleButton = {
            backgroundColor: this.props.secondaryColor,
            color: this.props.primaryColor,
            borderColor: this.props.secondaryColor
        };
        const dynamicLabelFont = {
            color: this.props.fontColor,
        }
        return {dynamicStyle, dynamicStyleButton, dynamicLabelFont};
    }
    
    validateForm = () => {
        let valid = true;
        

        //Check error object
        Object.values(this.state.errors).forEach(
          (val) => val.length > 0 && (valid = false)
        );

        //Check if fields are empty (First time)
        if(this.state.firstName === ''){
            valid = false;
            this.state.errors.firstName= 'First Name mandatory';
        }
        if(this.state.lastName === ''){
            valid = false;
            this.state.errors.lastName= 'Last Name mandatory';
        }
        if(this.state.streetAddress === ''){
            valid = false;
            this.state.errors.streetAddress= 'Street Address mandatory';
        }
        if(this.state.city === ''){
            valid = false;
            this.state.errors.city= 'City mandatory';
        }
        if(this.state.state === ''){
            valid = false;
            this.state.errors.state= 'State mandatory';
        }
        if(this.state.zipCode === ''){
            valid = false;
            this.state.errors.zipCode= 'Zip Code mandatory';
        }


        return valid;
    }

    //Form fields validation
    handleChange = (event) => {
        event.preventDefault();

        let { name, value } = event.target;
        let errors = this.state.errors;
        let validField  = false;
        switch(name){
            case "firstName":
                if(value !== ''){
                    validField = true;
                }
                errors.firstName = validField ? '' : 'First Name Mandatory';
                break;

            case "lastName":
                if(value !== ''){
                    validField = true;
                }
                errors.lastName = validField ? '' : 'First Name Mandatory';
                break;
            
            case "streetAddress":
                if(value !== ''){
                    validField = true;
                }
                errors.streetAddress = validField ? '' : 'Street Address Mandatory';
                break;

            case "city":
                if(value !== ''){
                    validField = true;
                }
                errors.city = validField ? '' : 'City Mandatory';
                break;
        }

        this.setState ({
            errors,
            [name]: value
        });

    }

    
    
    handleSubmit = async (event) => {
        event.preventDefault();
        this.state.errors.connection = "";

        if(this.validateForm()) {
            
            const data = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                streetAddress: this.state.streetAddress,
                city: this.state.city,
                state: this.state.state,
                zipCode: this.state.zipCode,
                company: this.props.company
            }
            
            this.setState({
                loadingDataFromPull: true
            })
            this.forceUpdate();

            try{
                const response = await ApiCL(data);
                let responseParsed = ""

                //Parse XML response to JSON to simplify read of values
                xml2js.parseString(response.data, function (err, result) {
                    responseParsed = result;
                });

                this.setTextToCertificate(responseParsed);
            }catch( err ) {
                this.state.errors.connection = "Server Error, try again later."
                this.setState({
                    loadingDataFromPull: false,    
                })
            }

        }else{
            this.state.errors.connection = "Invalid Form"
            this.forceUpdate();
        }
        
    }

    constructor(props){
        super(props);
        
        //Initial State of the component
        this.state = {
            showForm: this.props.showForm,
            showCertificate: false,
            titleCertificate:"Congrats!",
            textCertificate:"",
            firstName: "",
            lastName: "",
            streetAddress: "",
            city: "",        
            state: "",
            selectedState:[],
            zipCode: "",
            options: [],
            company: this.props.company,
            loadingDataFromPull: false,
            isLoading: false,
            errors: {
                firstName: "",
                lastName: "",
                streetAddress: "",
                city: "",        
                state: "",
                zipCode: "",
                connection: ""
            },
        };
    }

    render() {
        //Values
        const {showForm, showCertificate} = this.state;
        let {firstName, lastName, streetAddress, city, state, selectedState, zipCode, options, loadingDataFromPull, isLoading, errors, textCertificate, titleCertificate} = this.state;
        const { primaryColor, secondaryColor, fontColor} = this.props;
        //Get Dynamic Style
        const {dynamicStyle,dynamicStyleButton, dynamicLabelFont} = this.getDynamicCss();
        return(
            <>
                {showForm?
                <div className="wclForm" style={dynamicStyle}>
                    
            
                    <form id="FormWidget" onSubmit={this.handleSubmit} >
                        <fieldset disabled={loadingDataFromPull} >
                        <label className="formTitle" style={dynamicLabelFont}>Credit Pre-Qualification</label>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label className="wclLabel" style={dynamicLabelFont} htmlFor="inputFirstName" >First Name</label>
                                <input
                                    id="inputFirstName"
                                    name="firstName"
                                    className="form-control " 
                                    type="text" 
                                    placeholder="First Name" 
                                    onChange={this.handleChange} 
                                    value={firstName}
                                    />
                                {errors.firstName !== '' && 
                                <span className='error'>{errors.firstName}</span>}
                            </div>

                            <div className="form-group col-md-6">
                                <label className="wclLabel" style={dynamicLabelFont} htmlFor="inputLastName">Last Name</label>
                                    <input
                                        id="inputLastName"
                                        name="lastName"
                                        className="form-control" 
                                        type="text" 
                                        placeholder="Last Name"
                                        onChange={this.handleChange} 
                                        value={lastName}
                                        />
                                    {errors.lastName !== '' && 
                                <span className='error'>{errors.lastName}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="wclLabel" style={dynamicLabelFont} htmlFor="inputStreetAddress">Street Address</label>
                            <input 
                                id="inputStreetAddress"
                                name="streetAddress" 
                                type="text" 
                                className="form-control "
                                onChange={this.handleChange} 
                                value={streetAddress} 
                                placeholder="Street Address"/>
                            {errors.streetAddress !== '' && 
                                <span className='error'>{errors.streetAddress}</span>}
                        </div>

                        <div className="form-group">
                            <label className="wclLabel" style={dynamicLabelFont} htmlFor="inputZipCode">ZipCode</label>
                            <AsyncTypeahead 
                                id="inputZipCode"
                                name="zipCode"
                                placeholder="Zip Code"
                                minLength={5}
                                isLoading={isLoading}
                                value={zipCode}
                                labelKey={option => `${option.id}`}
                                onSearch={this.getLocation}
                                onChange={this.selectLocation}
                                onInputChange={this.validateZipCode}
                                options={options}
                                renderMenuItemChildren={(option) => (
                                <div>
                                    <small>{option.city}, {option.state} </small>
                                </div>
                                )}
                            />
                            {errors.zipCode !== '' && 
                            <span className='error'>{errors.zipCode}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label className="wclLabel" style={dynamicLabelFont} htmlFor="inputCity">City</label>
                                <input
                                    id="inputCity" 
                                    name="city"
                                    className="form-control " 
                                    type="text" 
                                    placeholder="City" 
                                    onChange={this.handleChange} 
                                    value={city}
                                    />
                                {errors.city !== '' && 
                                <span className='error'>{errors.city}</span>}
                            </div>
                            
                            <div className="form-group col-md-6">
                                <label className="wclLabel" style={dynamicLabelFont} htmlFor="inputState">State</label>
                                <Typeahead 
                                    id="inputState"
                                    name="state"
                                    placeholder="State"
                                    value={state}
                                    selected={selectedState}
                                    labelKey="name"
                                    onChange = {this.selectState}
                                    onInputChange = {this.validateState}
                                    options = {this.getStates()}
                                    minLength={2}
                                />
                                {errors.state !== '' && 
                                <span className='error'>{errors.state}</span>}
                            </div>
                        </div>

                        <button style={dynamicStyleButton}
                            type="submit" 
                            className="btn btn-primary btn-lg btn-block">
                                { loadingDataFromPull ?
                                    <WclLoader/>
                                    :
                                    'Submit'
                                }
                        </button>
                        {errors.connection.length > 0 && 
                                <span className='error'>{errors.connection}</span>}

                        </fieldset>
                    </form>
                    
                    
                </div>
                :
                null 
                }
                {showCertificate?
                    <WidgetCertificate
                        primaryColor={primaryColor} 
                        secondaryColor={secondaryColor} 
                        fontColor={fontColor} 
                        text={textCertificate}
                        title={titleCertificate}
                    >
                    </WidgetCertificate>
                    :
                    null
                }
                
            </>   
        );
    }
}

export default WidgetForm;