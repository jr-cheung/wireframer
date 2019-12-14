import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { Modal } from 'react-materialize';
import { getFirestore } from 'redux-firestore';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
        timestamp: '',
        modalOpen: false,
        redirectHome: false,
        redirectItem: null,
    }
    
    modalClose = () => {
        this.setState({ modalOpen: false })
    }

    modalOpen = () => {
        this.setState({ modalOpen: true })
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    handleNameChange = (e) => {
        let initName = document.getElementsByClassName("listscreen-name-input")[0].value;
        this.setState({ name: initName});
        const todoList = this.props.todoList;
        const id = todoList.id;
        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(id).update({name: initName});
    }

    handleOwnerChange = (e) => {
        let initOwner = document.getElementsByClassName("listscreen-owner-input")[0].value;
        this.setState({ name: initOwner});
        const todoList = this.props.todoList;
        const id = todoList.id;
        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(id).update({owner: initOwner});
    }

    handleDeleteList = (e) => {
        const todoList = this.props.todoList;
        const id = todoList.id;
        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(id).delete();
        this.setState({redirectHome: true});
    }

    handleNewItem = (e) => {
        const todoList = this.props.todoList;
        const id = todoList.id;
        const fireStore = getFirestore();
        const uuidv4 = require('uuid/v4');
        var value = uuidv4();
        const newItem = {"description": "Unknown", "due_date": "", "assigned_to": "Unknown", "completed": false, "idNumber": value, "id": value, "key": value, "isNew": true};
        todoList.items.push(newItem);
        console.log(todoList);
        console.log(todoList.items);
        fireStore.collection('todoLists').doc(id).update({items: todoList.items});
        this.setState({ redirectItem: newItem });
    }

    getRedirectURL = (e) => {
        const { todoList } = this.props;
        const itemID = this.state.redirectItem.idNumber;
        const todolistID = todoList.id;
        return "/todoList/" + todolistID + "/" + itemID;
    }

    sortByTask() {
        const todoList = this.props.todoList;
        var isSortedIncr = true;
        var isSortedDecr = true;
        for(var i = 0; i < todoList.items.length - 1; i++){
            if(this.compareTask(todoList.items[i], todoList.items[i+1]) === 1) {
                isSortedIncr = false;
                break;
            }
        }
        for(var i = 0; i < todoList.items.length - 1; i++){
            if(this.compareTask(todoList.items[i], todoList.items[i+1]) === -1) {
                isSortedDecr = false;
                break;
            }
        }
        var reverseNeeded = false;
        if (isSortedIncr === false && isSortedDecr === true) {
            reverseNeeded = false;
        }
        if (isSortedIncr === true && isSortedDecr === false) {
            reverseNeeded = true;
        }
        if (isSortedIncr === false && isSortedDecr === false) {
            reverseNeeded = false;
        }
        todoList.items.sort(this.compareTask);
        if (reverseNeeded) {
            todoList.items.reverse();
        }
        const id = todoList.id;
        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(id).update({items: todoList.items});
    }

    sortByStatus() {
        const todoList = this.props.todoList;
        var isSortedIncr = true;
        var isSortedDecr = true;
        for(var i = 0; i < todoList.items.length - 1; i++){
            if(this.compareStatus(todoList.items[i], todoList.items[i+1]) === 1) {
                isSortedIncr = false;
                break;
            }
        }
        for(var i = 0; i < todoList.items.length - 1; i++){
            if(this.compareStatus(todoList.items[i], todoList.items[i+1]) === -1) {
                isSortedDecr = false;
                break;
            }
        }
        var reverseNeeded = false;
        if (isSortedIncr === false && isSortedDecr === true) {
            reverseNeeded = false;
        }
        if (isSortedIncr === true && isSortedDecr === false) {
            reverseNeeded = true;
        }
        if (isSortedIncr === false && isSortedDecr === false) {
            reverseNeeded = false;
        }
        todoList.items.sort(this.compareStatus);
        if (reverseNeeded) {
            todoList.items.reverse();
        }
        const id = todoList.id;
        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(id).update({items: todoList.items});
    }

    sortByDueDate() {
        const todoList = this.props.todoList;
        var isSortedIncr = true;
        var isSortedDecr = true;
        for(var i = 0; i < todoList.items.length - 1; i++){
            if(this.compareDueDate(todoList.items[i], todoList.items[i+1]) === 1) {
                isSortedIncr = false;
                break;
            }
        }
        for(var i = 0; i < todoList.items.length - 1; i++){
            if(this.compareDueDate(todoList.items[i], todoList.items[i+1]) === -1) {
                isSortedDecr = false;
                break;
            }
        }
        var reverseNeeded = false;
        if (isSortedIncr === false && isSortedDecr === true) {
            reverseNeeded = false;
        }
        if (isSortedIncr === true && isSortedDecr === false) {
            reverseNeeded = true;
        }
        if (isSortedIncr === false && isSortedDecr === false) {
            reverseNeeded = false;
        }
        todoList.items.sort(this.compareDueDate);
        if (reverseNeeded) {
            todoList.items.reverse();
        }
        const id = todoList.id;
        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(id).update({items: todoList.items});
    }

    compareTask(item1, item2) {
        // SORT BY ITEM DESCRIPTION
            if (item1.description < item2.description)
                return -1;
            else if (item1.description > item2.description)
                return 1;
            else
                return 0;
    }

    compareStatus(item1, item2) {
        // SORT BY COMPLETED
        if (item1.completed < item2.completed)
            return -1;
        else if (item1.completed > item2.completed)
            return 1;
        else
            return 0;
    }

    compareDueDate(item1, item2) {
        // SORT BY DUE DATE
        let strArray1 = item1.due_date.split("-");
        let strArray2 = item2.due_date.split("-");
        let year1 = strArray1[0];
        let year2 = strArray2[0];
        let month1 = strArray1[1];
        let month2 = strArray2[1];
        let day1 = strArray1[2];
        let day2 = strArray2[2];
        if (year1 < year2) {
            return -1;
        } else if (year1 > year2) {
            return 1;
        } else {
            if (month1 < month2) {
                return -1;
            } else if (month1 > month2) {
                return 1;
            } else {
                if (day1 < day2) {
                    return -1;
                } else if (day1 > day2) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        const timeToGoHome = this.state.redirectHome;
        const timeToGoItem = this.state.redirectItem;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if (timeToGoHome) {
            return <Redirect to="/" />;
        }
        if (timeToGoItem != null && timeToGoItem.isNew === true) {
            return <Redirect to={{
                pathname: this.getRedirectURL(),
                state: { item: timeToGoItem, todoList: todoList }
            }} />
        }
        if (!todoList) {
            return <React.Fragment />
        }
        return (
            <div className="container grey lighten-3">
                <h5 className="black-text"><b>Todo List</b></h5>
                <div className="listscreen-name active">
                    <label className="active" htmlFor="name"><b>Name</b></label>
                    <input className="listscreen-name-input active" type="text" name="name" id="name" onChange={this.handleNameChange} defaultValue={todoList.name} />
                </div>
                <div className="listscreen-owner active">
                    <label className="active" htmlFor="owner"><b>Owner</b></label>
                    <input className="listscreen-owner-input active" type="text" name="owner" id="owner" onChange={this.handleOwnerChange} defaultValue={todoList.owner} />
                </div>
                <Modal open={this.state.modalOpen} options={ { startingTop: "80%", dismissible: false } } header="Delete list?" trigger={<div id="list_trash">&#128465;</div>}>
                    <p><b>Are you sure you want to delete this list?</b></p>
                    <button id="yes_button" onClick={this.handleDeleteList}>Yes</button><button id="no_button" onClick={this.modalClose}>No</button>
                    <p>The list will not be retrievable.</p>  
                </Modal>
                <div className="list_item_header_card">
                    <div className="list_item_task_header" onClick={this.sortByTask.bind(this)}>Task</div>
                    <div className="list_item_due_date_header" onClick={this.sortByDueDate.bind(this)}>Due Date</div>
                    <div className="list_item_status_header" onClick={this.sortByStatus.bind(this)}>Status</div>
                </div>
                <ItemsList todoList={todoList} />
                <div id="list_item_add_card" className="list_item_add_card" onClick={this.handleNewItem}>&#43;</div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    if (todoList) {
      todoList.id = id;
    }
  
    return {
      todoList,
      auth: state.firebase.auth,
    };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);