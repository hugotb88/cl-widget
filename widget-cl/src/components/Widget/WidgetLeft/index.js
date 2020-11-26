import React, { Component } from 'react';
import './styles.css';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import WidgetForm from '../WidgetForm';

class  WidgetLeft extends Component {
    showOrHideWidgetForm = () => {
        let newShowForm = this.state.showForm;

        if(this.state.showForm){
            newShowForm = false;
        }else{
            newShowForm = true;
        }

        this.setState({
            showForm: newShowForm,
        });
    };

    //Dynamic CSS
    getDynamicCss = () => {
        const dynamicStyle = {
            backgroundColor: this.props.primaryColor,
            color: this.props.fontColor,
        };
        const dynamicStyleBar = {
            backgroundColor: this.props.secondaryColor,
        };
        return {dynamicStyle, dynamicStyleBar};
    }

    constructor(props){
        super(props);

        this.state = {
            showForm: false,
        }
    }

    render(){
        const {showForm} = this.state;
        const { primaryColor, secondaryColor, fontColor, company} = this.props;
        //Get Dynamic Style
        const {dynamicStyle, dynamicStyleBar} = this.getDynamicCss();
        return (
            <div >
                <div className="leftPanel" style={dynamicStyle} onClick={this.showOrHideWidgetForm}>
                    <div className="leftPanelText" style={dynamicStyle}>GET PRE-QUALIFIED</div>
                    <div className="leftPanelBar" style={dynamicStyleBar}></div>
                    <div className="leftPanelIcon">
                        <CheckCircleOutlineOutlinedIcon 
                            className="material-design"
                            style={dynamicStyle} 
                            fontSize="large">
                        </CheckCircleOutlineOutlinedIcon>
                    </div>
                </div>

                {showForm?
                    <WidgetForm 
                    primaryColor={primaryColor} 
                    secondaryColor={secondaryColor} 
                    fontColor={fontColor} 
                    company={company}
                    showForm={showForm}>
                     </WidgetForm>
                    :
                    null
                }
            </div> 
        );
    }
}

export default WidgetLeft;