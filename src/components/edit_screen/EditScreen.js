import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { getFirestore } from 'redux-firestore'
import Draggable from 'react-draggable'
import { isAbsolute } from 'path'



 

class EditScreen extends Component{
    state = {
        redirectDiagram: false,
    }

    render(){
        return(
            <div className="row">
                <div className="column controls_panel">
                    <div className="add_container">
                        <div className= "add_container_pic"></div>
                        Container
                    </div>

                    <div className = "add_label">
                        <div className = "add_label_pic">
                            Prompt for Input:
                        </div>
                        Label
                    </div>

                    <div className = "add_button">
                        <div className="add_button_pic">
                            Submit
                        </div>
                        Button
                    </div>

                    <div className = "add_textfield">
                        <div className = "add_textfield_pic">
                            Input
                        </div>
                        Textfield
                    </div>
                </div>


                <div className="column edit_panel">
                    <Draggable
                        defaultPosition={{x: 0, y: 0}}
                        position={null}
                        scale={1}
                        onStart={this.handleStart}
                        onDrag={this.handleDrag}
                        onStop={this.handleStop}>
                        <div>
                        <div className="control_container"></div>
                        </div>
                    </Draggable>

                    <Draggable
                        defaultPosition={{x: 0, y: 0}}
                        position={null}
                        scale={1}
                        onStart={this.handleStart}
                        onDrag={this.handleDrag}
                        onStop={this.handleStop}>
                        <div>
                        <div className="control_label">Test</div>
                        </div>
                    </Draggable>

                    <Draggable
                        defaultPosition={{x: 0, y: 0}}
                        position={null}
                        scale={1}
                        onStart={this.handleStart}
                        onDrag={this.handleDrag}
                        onStop={this.handleStop}>
                        <div>
                        <div className="control_textfield">Test</div>
                        </div>
                    </Draggable>

                    <Draggable
                        defaultPosition={{x: 0, y: 0}}
                        position={null}
                        scale={1}
                        onStart={this.handleStart}
                        onDrag={this.handleDrag}
                        onStop={this.handleStop}>
                        <div>
                        <div className="control_button">Test</div>
                        </div>
                    </Draggable>
                </div>

                
                <div className="column controls_prop_panel">
                    PROPERTIES
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