import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';

class TodoListLinks extends React.Component {
    render() {
        const diagrams = this.props.diagrams;
        console.log(diagrams);
        return (
            <div className="todo-lists section">
                {diagrams && diagrams.map(diagram => (
                    <Link to={'/diagrams/' + diagram.id} key={diagram.id}>
                        <TodoListCard diagram={diagram} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        diagrams: state.firestore.ordered.diagrams,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(TodoListLinks);