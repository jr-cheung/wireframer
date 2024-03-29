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
            diagram: null,
            redirectDiagram: false,
            containers: [],
            labels: [],
            buttons: [],
            textfields: [],
            componentSelected: null,
            isContainer: false,
            isButton: false,
            isLabel: false,
            isTextfield: false,
            goHome: false
    }

    removeElement(array, elem){
        var index = array.indexOf(elem);
        if (index > -1) {
            array.splice(index, 1);
        }
    }

    processDeleteComponent=()=>{
        if (this.state.componentSelected !== null){
            const component = this.state.componentSelected;
            const key=component.key;
            const containers = this.state.containers;
            const labels = this.state.labels;
            const buttons = this.state.buttons;
            const textfields = this.state.textfields;
            for (var i=0; i< containers.length; i++){
                if (containers[i].key === key){
                    this.removeElement(containers, containers[i]);
                    this.setState({containers: containers});
                    return;
                }
            }
            for (var i=0; i< labels.length; i++){
                if (labels[i].key === key){
                    this.removeElement(labels, labels[i]);
                    this.setState({labels: labels});
                    return;
                }
            }
            for (var i=0; i< buttons.length; i++){
                if (buttons[i].key === key){
                    this.removeElement(buttons, buttons[i]);
                    this.setState({buttons: buttons});
                    return;
                }
            }
            for (var i=0; i< textfields.length; i++){
                if (textfields[i].key === key){
                    this.removeElement(textfields, textfields[i]);
                    this.setState({textfields: textfields});
                    return;
                }
            }
        }
    }

    processCloseWireframe=()=>{
        this.setState({
            goHome: true
        });
    }

    processSaveWireframe=()=>{
        const diagram = this.props.diagram;
        const id = diagram.id;
        const firestore = getFirestore();
        firestore.collection('diagrams').doc(id).update({containers: this.state.containers});
        firestore.collection('diagrams').doc(id).update({labels: this.state.labels});
        firestore.collection('diagrams').doc(id).update({textfields: this.state.textfields});
        firestore.collection('diagrams').doc(id).update({buttons: this.state.buttons});
        this.processCloseWireframe();
    }

    processBackgroundColorChange=(color)=>{
        const component = this.state.componentSelected;
        component.background_color = color;
        this.setState({
            redirectDiagram: true
        });
    }
    processBorderColorChange=(color)=>{
        const component = this.state.componentSelected;
        component.border_color = color;
        this.setState({
            redirectDiagram: true
        });
    }
    processBorderThicknessChange=(px)=>{
        const component = this.state.componentSelected;
        component.border_thickness = px +"px";
        this.setState({
            redirectDiagram: true
        });
    }
    processBorderRadiusChange=(px)=>{
        const component = this.state.componentSelected;
        component.border_radius = px +"px";
        this.setState({
            redirectDiagram: true
        });
    }
    processTextChange=(text)=>{
        const component = this.state.componentSelected;
        component.text = text;
        this.setState({
            redirectDiagram:true
        });
    }
    processTextColorChange=(color)=>{
        const component = this.state.componentSelected;
        component.text_color = color;
        this.setState({
            redirectDiagram: true
        })
    }
    processFontSizeChange=(px)=>{
        const component = this.state.componentSelected;
        component.font_size = px + "px";
        this.setState({
            redirectDiagram: true
        });

    }
    processComponentSelectedContainer=(component)=>{
        this.setState({
            componentSelected: component,
            isContainer: true,
            isButton: false,
            isLabel: false,
            isTextfield: false
        });
    }

    processComponentSelectedLabel = (component) =>{
        this.setState({
            componentSelected: component,
            isContainer: false,
            isButton: false,
            isLabel: true,
            isTextfield: false
        });
    }

    processComponentSelectedButton = (component)=>{
        this.setState({
            componentSelected: component,
            isContainer: false,
            isButton: true,
            isLabel: false,
            isTextfield: false
        });

    }
    processComponentSelectedTextfield=(component)=>{
        this.setState({
            componentSelected: component,
            isContainer: false,
            isButton: false,
            isLabel: false,
            isTextfield: true
        });
    }

    createContainer=()=>{
        const uuidv4 = require('uuid/v4');
        var value = uuidv4();
        const newContainer={
            "key": value,
            "idNumber": value,
            "top": 0,
            "left": 0,

            "background_color": "#ffffff",
            "border_color": "#000000",
            "border_thickness": "1px",
            "border_radius": "2px",
        }
        this.setState({containers: [...this.state.containers, newContainer]});
    }
    createLabel = () =>{
        const uuidv4 = require('uuid/v4');
        var value = uuidv4();
        const newLabel={
            "key": value,
            "idNumber": value,
            "top": 0,
            "left": 0,

            "text": "Prompt for Input:",
            "font_size": "12px",
            "background_color": "#ffffff",
            "border_color": "#ffffff",
            "text_color": "#000000",
            "border_thickness": "1px",
            "border_radius": "2px",
        }
        this.setState({labels: [...this.state.labels, newLabel]});
    }
    createButton = () =>{
        const uuidv4 = require('uuid/v4');
        var value = uuidv4();
        const newButton={
            "key": value,
            "idNumber": value,
            "top": 0,
            "left": 0,

            "text": "Submit",
            "font_size": "12px",
            "background_color": "#c0c0c0",
            "border_color": "#000000",
            "text_color": "#000000",
            "border_thickness": "1px",
            "border_radius": "2px",
        }
        this.setState({buttons: [...this.state.buttons, newButton]});
    }
    createTextfield = () =>{
        const uuidv4 = require('uuid/v4');
        var value = uuidv4();
        const newTextfield={
            "key": value,
            "idNumber": value,
            "top": 0,
            "left": 0,

            "text": "Input",
            "font_size": "12px",
            "background_color": "#ffffff",
            "border_color": "#000000",
            "text_color": "#c0c0c0",
            "border_thickness": "1px",
            "border_radius": "2px",
        }
        this.setState({textfields: [...this.state.textfields, newTextfield]});
    };

    componentDidUpdate = (prevProps) =>{
        if (this.props.diagram !== prevProps.diagram){
            const diagram = this.props.diagram;
            this.setState({
                diagram: diagram,
                containers: diagram.containers,
                labels: diagram.labels,
                buttons: diagram.buttons,
                textfields: diagram.textfields,
            });
        }
    }

    render(){
        if (!this.props.auth.uid){
            return <Redirect to="/login" />;
        }
        const redirectAndHome = this.state.goHome;
        if (redirectAndHome){
            return <Redirect to="/"/>
        }
        return(
            <div className="row">
                <div className="column controls_panel">
                <div className= "save_wireframe" onClick={this.processSaveWireframe}>
                        Save
                </div>
                <div className= "close_wireframe" onClick={this.processCloseWireframe}>
                        Close
                </div>

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
                                idNumber={container.idNumber}
                                key={container.key}

                                background_color={container.background_color}
                                border_color={container.border_color}
                                border_radius={container.border_radius}
                                border_thickness={container.border_thickness}
                                top={container.top}
                                left={container.left}

                                processComponentSelectedContainer={this.processComponentSelectedContainer}
                            />
                    ))}

                    {this.state.labels.map((label)=>(
                        <Label
                            controlObj = {label}
                            idNumber={label.idNumber}
                            key={label.key}

                            background_color={label.background_color}
                            border_color={label.border_color}
                            border_thickness={label.border_thickness}
                            border_radius={label.border_radius}
                            top={label.top}
                            left={label.left}
                            text={label.text}
                            text_color={label.text_color}
                            font_size={label.font_size}

                            processComponentSelectedLabel={this.processComponentSelectedLabel}
                            />
                    ))}

                    {this.state.buttons.map((button)=>(
                        <Button
                            controlObj = {button}
                            idNumber={button.idNumber}
                            key={button.key}

                            background_color={button.background_color}
                            border_color={button.border_color}
                            border_thickness={button.border_thickness}
                            border_radius={button.border_radius}
                            top={button.top}
                            left={button.left}
                            text={button.text}
                            text_color={button.text_color}
                            font_size={button.font_size}

                            processComponentSelectedButton={this.processComponentSelectedButton}
                            />
                    ))}

                    {this.state.textfields.map(textfield => (
                        <Textfield
                        controlObj = {textfield}
                        idNumber={textfield.idNumber}
                        key={textfield.key}

                        background_color={textfield.background_color}
                        border_color={textfield.border_color}
                        border_thickness={textfield.border_thickness}
                        border_radius={textfield.border_radius}
                        top={textfield.top}
                        left={textfield.left}
                        text={textfield.text}
                        text_color={textfield.text_color}
                        font_size={textfield.font_size}

                        processComponentSelectedTextfield={this.processComponentSelectedTextfield}
                        />
                    ))}
                </div>

        
                <div className="column controls_prop_panel">
                        <Properties 
                            componentSelected={this.state.componentSelected}
                            isContainer={this.state.isContainer}
                            isButton={this.state.isButton}
                            isLabel={this.state.isLabel}
                            isTextfield={this.state.isTextfield}
                            processTextChange={this.processTextChange}
                            processFontSizeChange={this.processFontSizeChange}
                            processBackgroundColorChange={this.processBackgroundColorChange}
                            processBorderColorChange={this.processBorderColorChange}
                            processTextColorChange={this.processTextColorChange}
                            processBorderThicknessChange={this.processBorderThicknessChange}
                            processBorderRadiusChange={this.processBorderRadiusChange}
                        />  
                        <div className="delete_component" onClick={this.processDeleteComponent}>Delete Component</div>      
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {id} = ownProps.match.params;
    const {diagrams} = state.firestore.data;
    const diagram = diagrams ? diagrams[id] : null;
    if (diagram){
        diagram.id = id;
    }
    console.log(state);
    return {
        diagram,
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'diagrams' },
    ]),
  )(EditScreen);