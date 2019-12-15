import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { getFirestore } from 'redux-firestore'
import Draggable from 'react-draggable'
import { isAbsolute } from 'path'
import Container from './Container'
import Label from './Label'
import Button from './Button'
import Textfield from './Textfield'
import Properties from './Properties'



class EditScreen extends Component{
    state = {
            redirectDiagram: false,
            containers: [],
            labels: [],
            buttons: [],
            textfields: [],
            componentSelected: null,
            isContainer: false,
            isButtonLabelTextfield: false
    }

    processTextChange=(value)=>{

    }
    processFontSizeChange=(size)=>{

    }
    processBackgroundColorChange=(color)=>{
        const component = this.state.componentSelected;
        component.background_color = color;
        this.setState({
            redirectDiagram: true
        });

    }
    processBorderColorChange=(color)=>{

    }
    processTextColorChange=(color)=>{

    }
    processBorderThicknessChange=(px)=>{

    }
    processBorderRadiusChange=(px)=>{

    }

    processComponentSelectedContainer=(component)=>{
        this.setState({
            componentSelected: component,
            isContainer: true,
            isButtonLabelTextfield: false,
        });
    }

    createContainer=()=>{
        const uuidv4 = require('uuid/v4');
        var value = uuidv4();
        const newContainer={
            "background_color": "#ffffff",
            "border_color": "#000000",
            "border_radius": "2px",
            "border_thickness": "1px",
            "idNumber": value,
            "key": value,
            "top": 0,
            "right": 0,
        }
        this.setState({containers: [...this.state.containers, newContainer]});
    }

    createLabel = () =>{
        this.setState(previousState => ({
            labels: [...previousState.labels, <Label />]
    }))};

    createButton = () =>{
        this.setState(previousState => ({
            buttons: [...previousState.buttons, <Button />]
    }))};
    createTextfield = () =>{
        this.setState(previousState => ({
            textfields: [...previousState.textfields, <Textfield />]
    }))};



    render(){
        return(
            <div className="row">
                <div className="column controls_panel">
                    <div className="add_container" onClick={this.createContainer}>
                        <div className= "add_container_pic"></div>
                        Container
                    </div>
                    <div className = "add_label" onClick={this.createLabel}>
                        <div className = "add_label_pic">
                            Prompt for Input:
                        </div>
                        Label
                    </div>
                    <div className = "add_button" onClick={this.createButton}>
                        <div className="add_button_pic">
                            Submit
                        </div>
                        Button
                    </div>
                    <div className = "add_textfield" onClick={this.createTextfield}>
                        <div className = "add_textfield_pic">
                            Input
                        </div>
                        Textfield
                    </div>
                </div>


                <div className="column edit_panel">
                    {this.state.containers.map((container)=>(
                            <Container      
                                controlObj = {container}
                                background_color={container.background_color}
                                border_color={container.border_color}
                                border_radius={container.border_radius}
                                border_thickness={container.border_thickness}
                                idNumber={container.idNumber}
                                key={container.key}
                                top={container.top}
                                right={container.right}
                                processComponentSelectedContainer={this.processComponentSelectedContainer}
                            />
                    ))}

                    {this.state.labels}
                    {this.state.buttons}
                    {this.state.textfields}
                </div>

                
                <div className="column controls_prop_panel">
                        <Properties 
                            componentSelected={this.state.componentSelected}
                            isContainer={this.state.isContainer}
                            isButtonLabelTextfield={this.state.isButtonLabelTextfield}
                            processTextChange={this.processTextChange}
                            processFontSizeChange={this.processFontSizeChange}
                            processBackgroundColorChange={this.processBackgroundColorChange}
                            processBorderColorChange={this.processBorderColorChange}
                            processTextColorChange={this.processTextColorChange}
                            processBorderThicknessChange={this.processBorderThicknessChange}
                            processBorderRadiusChange={this.processBorderRadiusChange}
                        />        
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'diagrams' },
    ]),
  )(EditScreen);