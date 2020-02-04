import React from 'react';
import Task from './Task';
import Axios from 'axios';
import { connect } from 'react-redux';
import { setTaskData } from '../../../redux/task-reducer';
import { withRouter } from 'react-router';
import { tasksAPI } from '../../../api/api';
class TaskContainer extends React.Component {
    
    componentDidMount() {
        let taskId = this.props.match.params.taskId ? this.props.match.params.taskId : 1;       
      
    }




    componentDidUpdate(prevProps) {
        let taskId = this.props.match.params.taskId ? this.props.match.params.taskId : 1;       

        
    }

    render() {
        return <Task {...this.props} task={this.props.task} />
    }
}


let mapStateToProps = (state) => {
    return {
        task: state.tasksPage.task,
    }
}



let WithUrlDataContainerComponent = withRouter(TaskContainer);

export default connect(mapStateToProps, { setTaskData })(WithUrlDataContainerComponent);