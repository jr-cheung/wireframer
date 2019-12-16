import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import DiagramLinks from './DiagramLinks'

class HomeScreen extends Component {
    state = {
        redirectListID: '',
        redirectList: false,
    }

    handleNewDiagram = (e) => {
        const fireStore = getFirestore();
        fireStore.collection('diagrams').add({
            name: 'New Wireframe',
            owner: 'Owner',
            timestamp: Date.now(),
            containers: [],
            labels: [],
            buttons: [],
            textfields: []
        }).then((docRef)=>{
            this.setState({redirectListID: docRef.id});
            this.setState({redirectList: true});
            fireStore.collection('diagrams').orderBy("timestamp", "desc");
        });
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        const timeToGoList = this.state.redirectList;
        const todoListID = "diagrams/" + this.state.redirectListID; 
        if (timeToGoList) {
            return <Redirect to={todoListID} />;
        }
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <DiagramLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            Wireframer
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewDiagram}>
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
      { collection: 'diagrams', orderBy: ["timestamp", "desc"] },
    ]),
)(HomeScreen);