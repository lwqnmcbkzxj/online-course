import React from 'react';
import TasksList from './TasksList';

import { connect } from 'react-redux';
import { getTasks } from '../../../redux/tasks-reducer';
import { getSections } from '../../../redux/sectionsList-reducer';


class TasksListContainer extends React.Component {
    componentDidMount() {         
        let request = this.props.getSections();
        request.then(() => {
            this.props.getTasks();
        });        
    }
    
    render() {       
        return <TasksList {...this.props} />
    }
}



let mapStateToProps = (state) => ({
    tasks: state.tasksList.tasks,
    sections: state.sectionsList.sections,
})



export default connect(mapStateToProps, { getTasks, getSections })(TasksListContainer);
