import React from 'react';
import Task from './Task';
import Axios from 'axios';
import { connect } from 'react-redux';
import { setTask } from '../../../redux/task-reducer';
import { withRouter } from 'react-router';
import { tasksAPI } from '../../../api/api';
class TaskContainer extends React.Component {

    componentDidMount() {
        let taskId = this.props.match.params.taskId ? this.props.match.params.taskId : 1;

        // tasksAPI.getTask().then((response) => {
        //     this.props.setTask(response.data[0]);    
        // })
        let response = {
            id: taskId,
            type: 1,
            img: 'https://bugaga.ru/uploads/posts/2013-05/1369165348_milahi-29.jpg',
            text: "Текст вопроса " + taskId,
            variants: null
        }


        this.props.setTask(response);


    }




    componentDidUpdate(prevProps) {
        let taskId = this.props.match.params.taskId ? this.props.match.params.taskId : 1;


        if (taskId !== prevProps.task.id) {
            // tasksAPI.getTask().then((response) => {
            //     this.props.setTask(response.data[0]);    
            // })
            let response = {
                id: taskId,
                type: 1,
                img: 'https://bugaga.ru/uploads/posts/2013-05/1369165348_milahi-29.jpg',
                text: "Текст вопроса " + taskId,
                variants: null
            }


            this.props.setTask(response);
        }
    }

    render() {
        return <Task {...this.props} task={this.props.task} />
    }
}


let mapStateToProps = (state) => {
    return {
        task: state.taskPage.task,
    }
}



let WithUrlDataContainerComponent = withRouter(TaskContainer);

export default connect(mapStateToProps, { setTask })(WithUrlDataContainerComponent);