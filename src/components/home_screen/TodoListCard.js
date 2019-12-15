import React from 'react';
import { getFirestore } from 'redux-firestore';

class TodoListCard extends React.Component {

    updateTimestamp() {
        const {diagram} = this.props;
        const id = diagram.id;
        const fireStore = getFirestore();
        fireStore.collection('diagrams').doc(id).update({timestamp: Date.now()});
    }

    render() {
        const { diagram } = this.props;
        console.log("TodoListCard, todoList.id: " + diagram.id);
        return (
            <div className="card z-depth-0 todo-list-link" onClick={this.updateTimestamp.bind(this)}> 
                <div className="card-content grey-text text-darken-3">
                    <span className="homescreen-card card-title">{diagram.name}</span>
                </div>
            </div>
        );
    }
}
export default TodoListCard;