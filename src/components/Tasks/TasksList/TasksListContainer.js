import React from 'react';
import TasksList from './TasksList';
import { connect } from 'react-redux';
import { getTasks } from '../../../redux/tasks-reducer';

class TasksListContainer extends React.Component {
    componentDidMount() { 
        debugger
        this.props.getTasks(); 
    }
    render() {
        return <TasksList {...this.props} />
    }
}



let mapStateToProps = (state) => ({
    tasks: state.tasksList.tasks
})



export default connect(mapStateToProps, { getTasks })(TasksListContainer);
