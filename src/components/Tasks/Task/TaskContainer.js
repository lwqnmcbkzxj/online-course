import React from 'react';
import Task from './Task';
import { connect } from 'react-redux';
import { setTask } from '../../../redux/task-reducer';
import { withRouter } from 'react-router';

class TaskContainer extends React.Component {

    componentDidMount() {
        let taskId = this.props.match.params.taskId ? this.props.match.params.taskId : 1;

        // tasksAPI.getTask(taskId).then((response) => {
        //     this.props.setTask(response);    
        // })

        let response = {
            id: taskId,
            type: 1,
            img: 'https://bugaga.ru/uploads/posts/2013-05/1369165348_milahi-29.jpg',
            title: "Текст вопроса " + taskId,
            variants: null
        }
        this.props.setTask(response);
    }




    componentDidUpdate(prevProps) {
        let taskId = this.props.match.params.taskId ? this.props.match.params.taskId : 1;


        if (taskId !== prevProps.task.id) {
            // tasksAPI.getTask(taskId).then((response) => {
            //     this.props.setTask(response);
            // });


            let response = {
                id: taskId,
                type: 1,
                img: 'https://bugaga.ru/uploads/posts/2013-05/1369165348_milahi-29.jpg',
                title: "Текст вопроса " + taskId,
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