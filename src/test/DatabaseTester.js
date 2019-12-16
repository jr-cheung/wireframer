import React from 'react'
import { connect } from 'react-redux';
import { getFirestore } from 'redux-firestore';
import wireframerJson from './TestWireframerData.json';

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('diagrams').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                console.log("deleting " + doc.id);
                fireStore.collection('diagrams').doc(doc.id).delete();
            })
        });
    }


    handleReset = () =>{
        const fireStore = getFirestore();
        wireframerJson.diagrams.forEach(wireframerJson => {
            const uuidv4 = require('uuid/v4');
            for (var i=0; i< wireframerJson.containers.length; i++){
                wireframerJson.containers[i].idNumber = uuidv4();
            }
            for (var i=0; i< wireframerJson.labels.length; i++){
                wireframerJson.labels[i].idNumber = uuidv4();   
            }
            for (var i=0; i< wireframerJson.buttons.length; i++){
                wireframerJson.buttons[i].idNumber = uuidv4();
            }
            for (var i=0; i< wireframerJson.textfields.length; i++){
                wireframerJson.textfields[i].idNumber = uuidv4();
            }
            fireStore.collection('diagrams').add({
                name: wireframerJson.name,
                owner: wireframerJson.owner,
                containers: wireframerJson.containers,
                labels: wireframerJson.labels,
                buttons: wireframerJson.buttons,
                textfields: wireframerJson.textfields,
                timestamp: Date.now()
            }).then(() => {
                console.log("DATABASE RESET");
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Reset Database</button>
            </div>)
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase
    };
}

export default connect(mapStateToProps)(DatabaseTester);