import React from 'react';
import Lesson from './Lesson';
import LessonEdit from './LessonEdit';
import { connect } from 'react-redux';

import { completeLesson } from '../../../redux/sectionsList-reducer';
import { setCurrentLessonId } from '../../../redux/course-reducer';
import { getLesson, addElement, deleteElement, editElement, changeElementPosition } from '../../../redux/lesson-reducer';
import { setModalFunction } from '../../../redux/course-reducer';

import { withRouter } from 'react-router';

class LessonContainer extends React.Component {
    state = {
        isFirstLesson: false,
        sectionTitle: '',
    }
    componentDidMount() {
        let lessonId = this.props.match.params.lessonId ? this.props.match.params.lessonId : 1;
        this.props.getLesson(lessonId);
    }

    componentDidUpdate(prevProps) {
        let lessonId = this.props.match.params.lessonId ? this.props.match.params.lessonId : 1;
        if (lessonId !== prevProps.lesson.id) {
            this.props.getLesson(lessonId);
        }
        if (prevProps.lesson.id !== this.props.lesson.id) {
            this.props.sections.map(section => {
                if (section.id == this.props.currentSectionId) {
                    if (section.lessons[0].id == this.props.lesson.id) 
                        this.setState({ isFirstLesson: true, sectionTitle: section.title });                    
                    else 
                        this.setState({ isFirstLesson: false, sectionTitle: '' });                    
                }
            })
        }
    }

    render() {
        return this.props.editMode ?
            <LessonEdit {...this.props} isFirstLesson={this.state.isFirstLesson} sectionTitle={this.state.sectionTitle} /> :
            <Lesson {...this.props} isFirstLesson={this.state.isFirstLesson} sectionTitle={this.state.sectionTitle} />
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
    addElement, deleteElement, editElement, changeElementPosition,
    setModalFunction
})(WithUrlDataContainerComponent);