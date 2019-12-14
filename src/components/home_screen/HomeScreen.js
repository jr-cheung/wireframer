import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import TodoListLinks from './TodoListLinks'

class HomeScreen extends Component {
    state = {
        redirectListID: '',
        redirectList: false,
    }

    handleNewList = (e) => {
        const fireStore = getFirestore();
        fireStore.collection('todoLists').add({
            name: 'Unknown',
            owner: 'Unknown',
            timestamp: Date.now(),
            items: [],
        }).then(document => {
            this.setState({redirectListID: document.id});
            this.setState({redirectList: true});
            fireStore.collection('todoLists').orderBy("timestamp", "desc");
        });
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        const timeToGoList = this.state.redirectList;
        const todoListID = "todoList/" + this.state.redirectListID; 
        if (timeToGoList) {
            return <Redirect to={todoListID} />;
        }
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            Wireframer
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create New Wireframe
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists', orderBy: ["timestamp", "desc"] },
    ]),
)(HomeScreen);