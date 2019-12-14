import React from 'react';
import { getFirestore } from 'redux-firestore';

class TodoListCard extends React.Component {

    updateTimestamp() {
        const {todoList} = this.props;
        const id = todoList.id;
        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(id).update({timestamp: Date.now()});
    }

    render() {
        const { todoList } = this.props;
        console.log("TodoListCard, todoList.id: " + todoList.id);
        return (
            <div className="card z-depth-0 todo-list-link" onClick={this.updateTimestamp.bind(this)}> 
                <div className="card-content grey-text text-darken-3">
                    <span className="homescreen-card card-title">{todoList.name}</span>
                </div>
            </div>
        );
    }
}
export default TodoListCard;