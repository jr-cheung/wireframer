import React from 'react';
class Properties extends React.Component{
    
    handleTextChange=(event)=>{

    }
    handleFontSizeChange=(event)=>{

    }
    handleTextColorChange=(event)=>{

    }

    handleBackgroundColorChange=(event)=>{
        this.props.processBackgroundColorChange(event.target.value);
    }
    handleBorderColorChange=(event)=>{
        this.props.processBorderColorChange(event.target.value);
    }
    handleBorderThicknessChange=(event)=>{
        this.props.processBorderThicknessChange(event.target.value);
    }
    handleBorderRadiusChange=(event)=>{
        this.props.processBorderRadiusChange(event.target.value);
    }

    displayProperties=()=>{
        if (this.props.isContainer){
            return <div>
            <div className = "background_color_container">Background Color
                <input type="color" value={this.props.componentSelected.background_color} onChange={this.handleBackgroundColorChange}></input>
            </div>

            <div className = "border_color_container">Border Color
                <input type="color" value={this.props.componentSelected.border_color} onChange={this.handleBorderColorChange}></input>
            </div>

            <div className = "border_thickness_container">Border Thicknesss
                <input type="number" defaultValue={this.props.componentSelected.border_thickness.slice(0, -2)} onChange={this.handleBorderThicknessChange} min={0}></input>
            </div>

            <div className = "border_radius_container">Border Radius
                <input type="number" defaultValue={this.props.componentSelected.border_radius.slice(0, -2)} onChange={this.handleBorderRadiusChange} min={0}></input>
            </div>
        </div>;
            
        }
        else if (this.props.isLabel || this.props.isTextfield || this.props.isButton){
            return <div>
            <div className = "background_color_container">Background Color
                <input type="color" value={this.props.componentSelected.background_color} onChange={this.handleBackgroundColorChange}></input>
            </div>

            <div className = "border_color_container">Border Color
                <input type="color" value={this.props.componentSelected.border_color} onChange={this.handleBorderColorChange}></input>
            </div>

            <div className = "border_thickness_container">Border Thicknesss
                <input type="number" defaultValue={this.props.componentSelected.border_thickness.slice(0, -2)} onChange={this.handleBorderThicknessChange} min={0}></input>
            </div>

            <div className = "border_radius_container">Border Radius
                <input type="number" defaultValue={this.props.componentSelected.border_radius.slice(0, -2)} onChange={this.handleBorderRadiusChange} min={0}></input>
            </div>
        </div>;

        }
        
        else{
            return(<div>Properties: Select a component</div>);
        }
    }

    render(){
        return(
            this.displayProperties()
        );
    }
}
export default Properties;