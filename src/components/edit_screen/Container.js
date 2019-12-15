import React from 'react';
import Draggable from 'react-draggable'

class Container extends React.Component {
    
    
    handleSelect = () =>{
        console.log("clicked");

    }



    render() {
        return (
            <Draggable
            defaultPosition={{x: 0, y: 0}}
            position={null}
            scale={1}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}>
            <div>
            <div className="control_container" onClick={this.handleSelect}></div>
            </div>
        </Draggable>
        );
    }
}
export default Container;