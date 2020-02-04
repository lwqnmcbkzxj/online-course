import React from 'react';
import TasksList from './TasksList';
import Axios from 'axios';
import { connect } from 'react-redux';


class TasksListContainer extends React.Component {
    componentDidMount() { 
        // sectionsAPI.getSections().then((response) => {
        //     this.props.setLessonData(response.data[0]);    
        // })
    }
    render() {
        return <TasksList {...this.props} tasks={this.props.tasks} />
    }
}

let mapStateToProps = (state) => ({
    tasks: state.tasksPage.tasks
})



export default connect(mapStateToProps, { setTasks })(TasksListContainer);
