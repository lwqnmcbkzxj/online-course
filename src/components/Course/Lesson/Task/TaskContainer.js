import React from 'react';
import Task from './Task';
import TaskEdit from './TaskEdit';
import { connect } from 'react-redux';

import {  editSection, editLesson } from '../../../../redux/sectionsList-reducer';
import {  setModalFunction } from '../../../../redux/course-reducer';
import { addElement, deleteElement, editElement } from '../../../../redux/lesson-reducer';

import { withRouter } from 'react-router';

class TaskContainer extends React.Component {   
    componentDidMount() {
        
    }

    componentDidUpdate(prevProps) {
       
    }

    render() {
        return this.props.editMode ?
            <TaskEdit {...this.props} /> :
            <Task {...this.props} />
    }
}


let mapStateToProps = (state) => {
    return {
        lesson: state.lesson.lesson,
        currentSectionId: state.course.currentSectionId,
        editMode: state.course.editMode,
    }
}



let WithUrlDataContainerComponent = withRouter(TaskContainer);

export default connect(mapStateToProps, {
    addElement, deleteElement, editElement, 
    editLesson, editSection,
    setModalFunction
})(WithUrlDataContainerComponent);