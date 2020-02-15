import React from 'react';
import { connect } from 'react-redux';

import Lesson from './Lesson';
import LessonEdit from './LessonEdit';

import { editSection, editLesson } from '../../../redux/sectionsList-reducer';
import { setCurrentLessonId, setModalFunction } from '../../../redux/course-reducer';
import { getLesson, addElement, addTaskElement, deleteElement, editElement, changeElementPosition} from '../../../redux/lesson-reducer';

import { withRouter } from 'react-router';

class LessonContainer extends React.Component {
    state = {
        sectionTitle: '',
        lessonTitle: '',
        lessonId: 0,
        isFirstLesson: false
    }
    

    componentWillMount() {
        let lessonId = this.props.match.params.lessonId ? this.props.match.params.lessonId : 1;
        this.props.getLesson(lessonId)
    }  

    componentDidUpdate(prevProps, prevState) {
        let lessonId = this.props.match.params.lessonId ? this.props.match.params.lessonId : 1;

        if (lessonId != prevState.lessonId || this.state.sectionTitle !== prevState.sectionTitle || this.state.lessonTitle !== prevState.lessonTitle) {
            this.props.getLesson(lessonId);
            this.setState({ lessonId });
            this.getCurrentLessonTitle(lessonId);
            this.getCurrentSectionTitle(lessonId);               
        }
    }

    getCurrentLessonTitle = (lessonId) => {
        this.props.sections.map(section => {            
            section.lessons.map(lesson => {
                if (lesson.id == lessonId) {
                    if (this.state.lessonTitle !== lesson.title)
                        this.setState({ lessonTitle: lesson.title });                    
                }
            });        
        });    
    }

    getCurrentSectionTitle = (lessonId) => {
        let sections = this.props.sections;
        for (let i = 0; i < sections.length; i++) {
            if (sections[i].id == this.props.currentSectionId && sections[i].lessons[0].id == lessonId) {
                this.setState({ sectionTitle: sections[i].title, isFirstLesson: true });
                break;
            } else
                this.setState({ sectionTitle: '', isFirstLesson: false });
        }              
    }
    
    render() {
        return this.props.editMode ?
            <LessonEdit {...this.props} sectionTitle={this.state.sectionTitle} lessonTitle={this.state.lessonTitle} isFirstLesson={this.state.isFirstLesson}/> :
            <Lesson {...this.props} sectionTitle={this.state.sectionTitle} lessonTitle={this.state.lessonTitle} isFirstLesson={this.state.isFirstLesson}/>
    }
}


let mapStateToProps = (state) => {
    return {
        sections: state.sectionsList.sections,
        lesson: state.lesson.lesson,
        currentSectionId: state.course.currentSectionId,
        editMode: state.course.editMode,
    }
}



let WithUrlDataContainerComponent = withRouter(LessonContainer);

export default connect(mapStateToProps, {
    getLesson, setCurrentLessonId,
    setModalFunction,
    addElement, addTaskElement, deleteElement, editElement, changeElementPosition,
    editSection, editLesson
})(WithUrlDataContainerComponent);