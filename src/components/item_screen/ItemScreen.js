import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Checkbox } from 'react-materialize'
import { getFirestore } from 'redux-firestore'

class ItemScreen extends Component {
    state = {
        redirectList: false,
        boxChecked: this.func(), 
    }

    func() {
        const auth = this.props.auth;
        if (!auth.uid) {
            return false;
        } else {
            return this.props.location.state.item.completed;
        }
    }

    redirectList = () => {
        this.setState({redirectList: true});
    }

    getItemDescription() {
        const item = this.props.location.state.item;
        console.log(item);
        if (item) {
            let description = item.description;
            return description;
        } else
            return "";
    }

    getItemAssignedTo() {
        const item = this.props.location.state.item;
        if (item) {
            let assignedTo = item.assigned_to;
            return assignedTo;
        } else {
            return "";
        }
    }

    getItemDueDate() {
        const item = this.props.location.state.item;
        if (item) {
            let dueDate = item.due_date;
            return dueDate;
        } else {
            return "";
        }
    }

    getItemCompleted() {
        const item = this.props.location.state.item;
        if (item) {
            let completed = item.completed;
            return completed;
        } else {
            return false;
        }
    }

    cancelItemChanges() {
        const item = this.props.location.state.item;
        const todoList = this.props.location.state.todoList;
        const id = todoList.id;
        const fireStore = getFirestore();
        if ((typeof item.isNew !== 'undefined' || item.isNew !== null) && item.isNew == true) {
            todoList.items.pop();
            fireStore.collection('todoLists').doc(id).update({items: this.props.location.state.todoList.items});
        }
        this.redirectList();
    }

    submitItemChanges() {
        let description = document.getElementsByClassName("item_input")[0].value;
        let assigned_to = document.getElementsByClassName("item_input")[1].value;
        let due_date = document.getElementsByClassName("item_input")[2].value;
        let completed = document.getElementsByClassName("item_input")[3].checked;
        if (!(description != null && description.trim())) {
            description = "Unknown";
        }
        if (!(assigned_to != null && assigned_to.trim())) {
            assigned_to = "Unknown";
        } 
        this.props.location.state.item.description = description;
        this.props.location.state.item.assigned_to = assigned_to; 
        this.props.location.state.item.due_date = due_date;
        this.props.location.state.item.completed = completed;
        if ((typeof this.props.location.state.item.isNew !== 'undefined' || this.props.location.state.item.isNew !== null) && this.props.location.state.item.isNew == true) {
           this.props.location.state.item.isNew = false;
        }
        const id = this.props.location.state.todoList.id;
        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(id).update({items: this.props.location.state.todoList.items});
        this.redirectList();
    }

    getListURL() {
        const todoList = this.props.location.state.todoList;
        return "/todoList/" + todoList.id;
    }

    toggleCheckboxChange = () => {
        if (this.state.boxChecked === true) {
            this.setState({boxChecked: false});
        } else {
            this.setState({boxChecked: true});
        }
    }

    render() {
        const auth = this.props.auth;
        const redirectList = this.state.redirectList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        } 
        if (redirectList) {
            var url = this.getListURL();
            return <Redirect to={url}/>;
        }
        return (
            <div id="todo_item">
                <div id="item_heading"><b>Item Screen</b></div>
                <div id="item_form_container" className="grey lighten-3">
                    <div id="item_description_container" className="text_toolbar">
                        <span className="item_prompt" id="item_description_prompt">Description:</span>
                        <input 
                            defaultValue={this.getItemDescription()} 
                            type="text" 
                            id="item_description_textfield"
                            className="item_input" />  
                    </div>
                    <div id="item_assigned_to_container" className="text_toolbar">
                        <span className="item_prompt" id="item_assigned_to_prompt">Assigned To:</span>
                        <input
                            defaultValue={this.getItemAssignedTo()} 
                            type="text" 
                            id="item_assigned_to_textfield"
                            className="item_input" />  
                    </div>
                    <div id="item_due_date_container">
                        <span className="item_prompt" id="item_due_date_prompt">Due Date:</span>
                        <input 
                            defaultValue={this.getItemDueDate()} 
                            type="date" 
                            id="item_due_date_date_picker"
                            className="item_input" />  
                    </div>
                    <div id="item_completed_container">
                        <span className="item_prompt" id="item_completed_prompt">Completed:</span>
                        <Checkbox
                            disabled={false}
                            value="completed_checkbox"
                            id="item_completed_checkbox"
                            className="item_input"
                            checked={this.state.boxChecked}
                            onChange={this.toggleCheckboxChange}
                        />  
                    </div>      
                </div>
                <button id="item_form_submit_button" onClick={this.submitItemChanges.bind(this)}>Submit</button><button id="item_form_cancel_button" onClick={this.cancelItemChanges.bind(this)}>Cancel</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
)(ItemScreen);