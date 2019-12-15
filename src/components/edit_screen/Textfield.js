import React from 'react';
import Draggable from 'react-draggable'

class Textfield extends React.Component {
    handleSelect = () =>{
        const thisTextfield = this.props.controlObj;
        this.props.processComponentSelectedTextfield(thisTextfield);
    }

    divStyle = () =>{
        const thisTextfield = this.props.controlObj;
        return {cursor: 'grab',
            zIndex: '2',
            borderStyle: 'solid',
            
            backgroundColor: thisTextfield.background_color,
            borderColor: thisTextfield.border_color,
            borderWidth: thisTextfield.border_thickness,
            borderRadius: thisTextfield.border_radius,
            fontSize: thisTextfield.font_size,
            color: thisTextfield.text_color,
            width: '250px'
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
                style={this.divStyle()}
                onClick={this.handleSelect}>{this.props.controlObj.text}</div>
            </div>
        </Draggable>
        );
    }
}
export default Textfield;