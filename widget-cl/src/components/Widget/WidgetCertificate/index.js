import React, { Component } from 'react';
import pacifico from 'typeface-pacifico';
import './styles.css';

class WidgetCertificate extends Component {
    //Dynamic CSS
    getDynamicCss = () => {
        const dynamicStyle = {
            backgroundColor: this.props.primaryColor,
            color: this.props.fontColor,
            fontFamily: pacifico.fontFamily,
        };
        const dynamicStyleBar = {
            backgroundColor: this.props.secondaryColor,
        }
        return {dynamicStyle, dynamicStyleBar};
    }

    constructor(props){
        super(props);

        this.state = {
            text: "",
            title: "Congrats!"
        }
    }

    render(){
        //Get Dynamic Style
        const {dynamicStyle, dynamicStyleBar} = this.getDynamicCss();
        const {text, title} = this.props;
        return (
                <div>
                    <div className="wclCertificate" style={dynamicStyle}>
                        <div className="wclCertificateCongrats" style={dynamicStyle}>
                            <p>{title}</p>
                        </div>
                        <div className="wclCertificateLine" style={dynamicStyleBar}></div>
                        <div className="wclCertificateText" style={dynamicStyle}>
                            <p>{text}</p>
                        </div>
                    </div>
                </div> 
        );
    }
}

export default WidgetCertificate;