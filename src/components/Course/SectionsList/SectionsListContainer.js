import React from 'react';
import SectionsList from './SectionsList';
import { connect } from 'react-redux';
import { setCurrentSectionId, toggleModalVisible, setModalFunction } from '../../../redux/course-reducer';
import { getSections, addSection, addLesson, deleteSection, deleteLesson } from '../../../redux/sectionsList-reducer';


class SectionsListContainer extends React.Component {
    componentWillMount() {
        this.props.getSections();
    }

    render() {
        return <SectionsList {...this.props} />
    }
}

let mapStateToProps = (state) => ({
    sections: state.sectionsList.sections,
    currentSectionId: state.course.currentSectionId,
    currentLessonId: state.course.currentLessonId,
    editMode: state.course.editMode,
    completedSectionsIds: state.user.completedSectionsIds,
    completedLessonsIds: state.user.completedLessonsIds,
    completedTasksIds: state.user.completedTasksIds,
})



export default connect(mapStateToProps, {
    getSections, setCurrentSectionId,
    addSection, addLesson,
    deleteSection, deleteLesson,
    toggleModalVisible, setModalFunction
})(SectionsListContainer);
