import React from 'react';
import Draggable from 'react-draggable'

class Container extends React.Component {

    handleSelect = () =>{
        const thisContainer = this.props.controlObj;
        this.props.processComponentSelectedContainer(thisContainer);
    }

    divStyle = () =>{
        const thisContainer = this.props.controlObj;
        return {position: 'relative',
            width: '500px',
            height: '500px',
            cursor: 'grab',
            zIndex: '2',
            borderStyle: 'solid',
        
            backgroundColor: thisContainer.background_color,
            borderColor: thisContainer.border_color,
            borderWidth: thisContainer.border_thickness,
            borderRadius: thisContainer.border_radius
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
                      onClick={this.handleSelect}></div>
                </div>
        </Draggable>
        );
    }
}
export default Container;