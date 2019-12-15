import React from 'react';
import Draggable from 'react-draggable'

class Button extends React.Component {
    handleSelect = () =>{
        const thisButton = this.props.controlObj;
        this.props.processComponentSelectedButton(thisButton);
    }

    divStyle = () =>{
        const thisButton = this.props.controlObj;
        return {cursor: 'grab',
            display: 'inline-block',
            zIndex: '2',
            borderStyle: 'solid',
            textAlign: 'center',

            backgroundColor: thisButton.background_color,
            borderColor: thisButton.border_color,
            borderWidth: thisButton.border_thickness,
            borderRadius: thisButton.border_radius,
            fontSize: thisButton.font_size,
            color: thisButton.text_color,
        };
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
            <div
                style = {this.divStyle()}
                onClick = {this.handleSelect}>{this.props.controlObj.text}</div>
            </div>
        </Draggable>
        );
    }
}
export default Button;