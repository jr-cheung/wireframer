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
                    CONTROLS
                </div>
                <div className="column edit_panel">
                    EDIT
                    

                    <Draggable
                        defaultPosition={{x: 0, y: 0}}
                        position={null}
                        scale={1}
                        onStart={this.handleStart}
                        onDrag={this.handleDrag}
                        onStop={this.handleStop}>
                        <div>
                        <div className="handle"></div>
                        </div>
                    </Draggable>
                    

                    <Draggable
                        defaultPosition={{x: 0, y: 0}}
                        position={null}
                        scale={1}
                        onStart={this.handleStart}
                        onDrag={this.handleDrag}
                        onStop={this.handleStop}><div>Test</div></Draggable>
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