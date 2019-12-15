import React from 'react';
class Properties extends React.Component{
    
    handleTextChange=(event)=>{

    }
    handleFontSizeChange=(event)=>{

    }
    handleBackgroundColorChange=(event)=>{
        this.props.processBackgroundColorChange(event.target.value);
    }
    handleBorderColorChange=(event)=>{
        this.props.processBorderColorChange(event.target.value);
    }
    handleTextColorChange=(event)=>{

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
        else{
            return <div>
            <div className = "text_container">Text
                <input type="text"></input>
            </div>

            <div className = "font_size_container">Font Size
                <input type="number"></input>
            </div>

            <div className = "background_color_container">Background Color
                <input type="color" value={this.props.componentSelected.background_color} onChange={this.handleBackgroundColorChange}></input>
            </div>

            <div className = "border_color_container">Border Color
                <input type="color" value={this.props.componentSelected.border_color} onChange={this.handleBorderColorChange}></input>
            </div>
                
            <div className = "text_color_container">Text Color
                <input type="color"></input>
            </div>

            <div className = "border_thickness_container">Border Thicknesss
                <input type="number" defaultValue={this.props.componentSelected.border_thickness.slice(0, -2)} onChange={this.handleBorderThicknessChange} min={0}></input>
            </div>

            <div className = "border_radius_container">Border Radius
                <input type="number" defaultValue={this.props.componentSelected.border_radius.slice(0, -2)} onChange={this.handleBorderRadiusChange} min={0}></input>
            </div>
        </div>;
        }
    }

    render(){
        return(
            this.displayProperties()
        );
    }
}
export default Properties;