import React from 'react';
import Draggable from 'react-draggable'

class Button extends React.Component {
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
            <div className="control_button">Submit</div>
            </div>
        </Draggable>
        );
    }
}
export default Button;