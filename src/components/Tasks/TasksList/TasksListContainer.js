import React from 'react';
import Tasks from '../Tasks';
import Axios from 'axios';
import { connect } from 'react-redux';
import { tasksAPI } from '../../../api/api';

import { setTasks } from '../../../redux/tasks-reducer';

class TasksContainer extends React.Component {
    componentDidMount() { 
        // tasksAPI.getTasks().then((response) => {
        //     this.props.setTasksData(response.data[0]);    
        // })
    }
    render() {
        return <Tasks {...this.props} tasks={this.props.tasks} />
    }
}

let mapStateToProps = (state) => ({
    tasks: state.tasksPage.tasks
})


export default connect(mapStateToProps, { setTasks })(TasksContainer);
