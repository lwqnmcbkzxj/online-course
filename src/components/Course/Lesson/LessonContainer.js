import React from 'react';
import Lesson from './Lesson';
import LessonEdit from './LessonEdit/LessonEdit';
import { connect } from 'react-redux';

import { completeLesson } from '../../../redux/sectionsList-reducer';
import { setCurrentLessonId } from '../../../redux/course-reducer';
import { getLesson, addElement, deleteElement, editElement, changeElementPosition } from '../../../redux/lesson-reducer';
import { withRouter } from 'react-router';

class LessonContainer extends React.Component {    
    componentDidMount() {
        let lessonId = this.props.match.params.lessonId ? this.props.match.params.lessonId : 1;
        this.props.getLesson(lessonId);       
    }

    componentDidUpdate(prevProps) {
        let lessonId = this.props.match.params.lessonId ? this.props.match.params.lessonId : 1;
        if (lessonId !== prevProps.lesson.id) {
            this.props.getLesson(lessonId);
        }
    }

    render() {
        return this.props.editMode ? <LessonEdit {...this.props} lesson={this.props.lesson} /> : <Lesson {...this.props} lesson={this.props.lesson} />
    }
}


let mapStateToProps = (state) => {
    return {
        sections: state.sectionsList.sections,
        lesson: state.lesson.lesson,
        currentLessonId: state.course.currentLessonId,
        currentSectionId: state.course.currentSectionId,
        editMode: state.course.editMode
    }
}



let WithUrlDataContainerComponent = withRouter(LessonContainer);

export default connect(mapStateToProps, {
    getLesson, setCurrentLessonId, completeLesson,
    addElement, deleteElement, editElement, changeElementPosition
})(WithUrlDataContainerComponent);