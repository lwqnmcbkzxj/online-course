import React from 'react';
import TasksList from './TasksList';
import Axios from 'axios';
import { connect } from 'react-redux';
import { tasksAPI } from '../../../api/api';

import { setTasks } from '../../../redux/tasks-reducer';

class TasksContainer extends React.Component {
    componentDidMount() { 
        // tasksAPI.getTasks().then((response) => {
        //     this.props.setTasksData(response.data[0]);    
        // })

        let response = [
            {
                id: 1,
                name: 'Task 1',
                likes: 0,
                views: 5,
                rating: 1,
            },
            {
                id: 2,
                name: 'Task 2',
                likes: 3,
                views: 2,
                rating: 2,
            },
            {
                id: 3,
                name: 'Task 3',
                likes: 2,
                views: 7,
                rating: 3,
            }
        ]


        this.props.setTasks(response);

    }
    render() {
        return <TasksList {...this.props} tasks={this.props.tasks} />
    }
}

let mapStateToProps = (state) => ({
    tasks: state.tasksPage.tasks
})


export default connect(mapStateToProps, { setTasks })(TasksContainer);
