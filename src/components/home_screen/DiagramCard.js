import React from 'react';
import { getFirestore } from 'redux-firestore';

class DiagramCard extends React.Component {
    state={
        deleteDiagram: false
    }

    updateTimestamp() {
        const {diagram} = this.props;
        const id = diagram.id;
        const fireStore = getFirestore();
        fireStore.collection('diagrams').doc(id).update({timestamp: Date.now()});
    }

    handleDeleteDiagram = (e) =>{
        e.preventDefault();
        const {diagram} = this.props;
        const id = diagram.id;
        const fireStore = getFirestore();
        fireStore.collection('diagrams').doc(id).delete();
        this.setState({
            deleteDiagram: true
        });
        
    }
    render() {
        const { diagram } = this.props;
        console.log("DiagramCard, diagram.id: " + diagram.id);
        return (
            <div>
                <div className="delete_diagram" onClick={this.handleDeleteDiagram}>X</div>
                <div className="card z-depth-0 todo-list-link" onClick={this.updateTimestamp.bind(this)}> 
                    <div className="card-content grey-text text-darken-3">
                        <span className="homescreen-card card-title">{diagram.name}</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default DiagramCard;