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



class EditScreen extends Component{
    state = {
            redirectDiagram: false,
            containers: [],
            labels: [],
            buttons: [],
            textfields: [],
            componentSelected: null,
    }

    createContainer = () =>{
        this.setState(previousState => ({
            containers: [...previousState.containers, <Container />]
    }))};

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
                    {this.state.containers}
                    {this.state.labels}
                    {this.state.buttons}
                    {this.state.textfields}
                </div>

                
                <div className="column controls_prop_panel">

                    <div className = "text_container">Text
                        <input type="text"></input>
                    </div>

                    <div className = "font_size_container">Font Size
                        <input type="number"></input>
                    </div>

                    <div className = "background_color_container">Background Color
                        <input type="color"></input>
                    </div>

                    <div className = "border_color_container">Border Color
                        <input type="color"></input>
                    </div>
                      
                    <div className = "text_color_container">Text Color
                        <input type="color"></input>
                    </div>

                    <div className = "border_thickness_container">Border Thickness
                        <input type="number"></input>
                    </div>

                    <div className = "border_radius_container">Border Radius
                        <input type="number"></input>
                    </div>


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