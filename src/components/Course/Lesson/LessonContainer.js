import React from 'react';
import Lesson from './Lesson';
import LessonEdit from './LessonEdit';
import { connect } from 'react-redux';

import { completeLesson, editSection, editLesson } from '../../../redux/sectionsList-reducer';
import { setCurrentLessonId, setModalFunction } from '../../../redux/course-reducer';
import { getLesson, addElement, deleteElement, editElement, changeElementPosition } from '../../../redux/lesson-reducer';

import { withRouter } from 'react-router';

class LessonContainer extends React.Component {
    state = {
        isFirstLesson: false,
        sectionTitle: '',
        lessonTitle: '',
    }
    componentDidMount() {
        let lessonId = this.props.match.params.lessonId ? this.props.match.params.lessonId : 1;
        this.props.getLesson(lessonId);
    }

    componentDidUpdate(prevProps) {
        let lessonId = this.props.match.params.lessonId ? this.props.match.params.lessonId : 1;

        if (lessonId != prevProps.lesson.id) {
            this.props.getLesson(lessonId);
            debugger

            this.props.sections.map(section => {
                // if (section.id == this.props.currentSectionId && section.lessons[0].id == lessonId) {
                //     if (this.state.isFirstLesson !== true) {
                //         this.setState({ isFirstLesson: true, sectionTitle: section.title });
                //     }
                // } else {
                //     if (this.state.isFirstLesson !== false) {
                //         this.setState({ isFirstLesson: false, sectionTitle: '' });                        
                //     }                    
                // }
                // debugger
                // section.lessons.map(lesson => {
                //     if (lesson.id == lessonId) {
                //         if (this.state.lessonTitle !== lesson.title) {
                //             this.setState({ lessonTitle: lesson.title });
                //         }
                //     }
                // })
            });
        }
    }

    render() {
        return this.props.editMode ?
            <LessonEdit {...this.props} isFirstLesson={this.state.isFirstLesson} sectionTitle={this.state.sectionTitle} lessonTitle={this.state.lessonTitle} /> :
            <Lesson {...this.props} isFirstLesson={this.state.isFirstLesson} sectionTitle={this.state.sectionTitle} lessonTitle={this.state.lessonTitle} />
    }
}


let mapStateToProps = (state) => {
    return {
        sections: state.sectionsList.sections,
        lesson: state.lesson.lesson,
        currentLessonId: state.course.currentLessonId,
        currentSectionId: state.course.currentSectionId,
        editMode: state.course.editMode,
    }
}



let WithUrlDataContainerComponent = withRouter(LessonContainer);

export default connect(mapStateToProps, {
    getLesson, setCurrentLessonId, completeLesson,
    addElement, deleteElement, editElement, changeElementPosition,
    editLesson, editSection,
    setModalFunction
})(WithUrlDataContainerComponent);