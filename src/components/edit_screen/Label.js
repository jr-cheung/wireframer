import React from 'react';
import Draggable from 'react-draggable'

class Label extends React.Component {
    handleSelect = () =>{
        const thisLabel = this.props.controlObj;
        this.props.processComponentSelectedLabel(thisLabel);
    }

    divStyle = () =>{
        const thisLabel = this.props.controlObj;
        return {cursor: 'grab',
            display: 'inline-block',
            zIndex: '2',
            borderStyle: 'solid',

            backgroundColor: thisLabel.background_color,
            borderColor: thisLabel.border_color,
            borderWidth: thisLabel.border_thickness,
            borderRadius: thisLabel.border_radius,
            fontSize: thisLabel.font_size,
            color: thisLabel.text_color,
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
export default Label;