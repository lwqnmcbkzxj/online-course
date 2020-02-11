import React from 'react';
import Lesson from './Lesson';
import { connect } from 'react-redux';
import { getLesson, setCurrentLessonId,setCurrentSectionId, completeLesson } from '../../../redux/course-reducer';
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
        return <Lesson {...this.props} lesson={this.props.lesson} />
    }
}


let mapStateToProps = (state) => {
    return {
        lesson: state.course.lesson,
        currentLessonId: state.course.currentLessonId,
        currentSectionId: state.course.currentSectionId,
        editMode: state.edit.editMode
    }
}



let WithUrlDataContainerComponent = withRouter(LessonContainer);

export default connect(mapStateToProps, { getLesson, setCurrentLessonId, setCurrentSectionId, completeLesson  })(WithUrlDataContainerComponent);