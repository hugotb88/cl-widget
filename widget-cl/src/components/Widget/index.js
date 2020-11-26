import React, {Component} from 'react';
import WidgetLeft from './WidgetLeft';

//Class Component
class Widget extends Component {
    //When the component is created
    constructor(props){
        //always invoked
        super(props);
        
        this.state = {
            showForm: false,
            showCertificate: true,
            primaryColor: "#0074A1",
            secondaryColor: "#DADADA",
            fontColor: "#FFFFFF",
            company:"DZ7-8G9-D3E-DB2-BXE"
        };

    }


    render() {
        const { primaryColor, secondaryColor, fontColor, company} = this.props;
        return (
            <div>
                <div>
                    <WidgetLeft
                        primaryColor={primaryColor} 
                        secondaryColor={secondaryColor} 
                        fontColor={fontColor}
                        company={company}>
                    </WidgetLeft>
                </div>
                
            </div>
        );
    }
}
    

export default Widget;