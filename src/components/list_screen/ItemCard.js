import React from 'react'
import { Button } from 'react-materialize'
import { getFirestore } from 'redux-firestore'
import { NavLink, Redirect } from 'react-router-dom'

class ItemCard extends React.Component {
    state = {
        redirectItem: false
    }

    getCompletedClassName() {
        const { item } = this.props;
        if (item.completed === true) {
            return 'list_item_card_completed card-title';
        } else {
            return 'list_item_card_not_completed card-title';
        }
    }

    getCompletedOrPending() {
        const { item } = this.props;
        if (item.completed === true) {
            return 'Completed';
        } else {
            return 'Pending';
        }
    }

    getMoveUpClassName() {
        const { index } = this.props;  
        if (index === 0) {
            return "hvr grey darken-2 black-text";
        } else {
            return "hvr green darken-2 black-text";
        }
    }

    getMoveDownClassName() {
        const { index } = this.props;
        const { size } = this.props;
        if (index === (size - 1)) {
            return "hvr grey darken-2 black-text";
        } else {
            return "hvr green darken-2 black-text";
        }    
    }

    moveItemUp(num, event) {
        event.stopPropagation();
        const { index } = this.props;
        const { todoList } = this.props;
        if (index !== 0) {
            let temp = todoList.items[index];
            todoList.items[index] = todoList.items[index - 1];
            todoList.items[index - 1] = temp;
        }
        const id = todoList.id;
        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(id).update({items: todoList.items});
    }

    moveItemDown(num, event) {
        event.stopPropagation();
        const { index } = this.props;
        const { todoList } = this.props;
        const { size } = this.props;
        if (index !== (size - 1)) {
            let temp = todoList.items[index];
            todoList.items[index] = this.props.todoList.items[index + 1];
            todoList.items[index + 1] = temp;
        }
        const id = todoList.id;
        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(id).update({items: todoList.items});
    }

    removeItem(num, event) {
        event.stopPropagation();
        const { index } = this.props;
        const { todoList } = this.props;
        todoList.items.splice(index, 1);
        const id = todoList.id;
        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(id).update({items: todoList.items});
    }

    redirectItem = () => {
        this.setState({ redirectItem: true })    
    }

    getRedirectURL() {
        const { item } = this.props;
        const { todoList } = this.props;
        const itemID = item.idNumber;
        const todolistID = todoList.id;
        return "/todoList/" + todolistID + "/" + itemID;
    }

    render() {
        const { item } = this.props;
        const { todoList } = this.props;
        const { index } = this.props;
        const redirectItem = this.state.redirectItem; 
        if (redirectItem) {
            return <Redirect to={{
                pathname: this.getRedirectURL(),
                state: { item: item, todoList: todoList }
            }} />
        }
        return (
            <div className="card z-depth-0 todo-list-link grey lighten-2" onClick={this.redirectItem}>
                <div className="card-content black-text">
                    <span className="list_item_card_description card-title">{item.description}</span>
                    <span className="list_item_card_assigned_to card-title">Assigned To: <b>{item.assigned_to}</b></span>
                    <span className="list_item_card_due_date card-title">{item.due_date}</span>
                    <span className={this.getCompletedClassName()}>{this.getCompletedOrPending()}</span>
                    <Button floating fab={{direction: 'left'}} className="fixed-action-button black active" medium>
                        <Button floating className={this.getMoveUpClassName()} small onClick={this.moveItemUp.bind(this, 0)}><b>&#8679;</b></Button>
                        <Button floating className={this.getMoveDownClassName()} small onClick={this.moveItemDown.bind(this, 0)}><b>&#8681;</b></Button>
                        <Button floating className="hvr green darken-2 black-text" small onClick={this.removeItem.bind(this, 0)}>&#10006;</Button>
                    </Button>
                </div>
            </div>
        );
    }
}
export default ItemCard;