import React from 'react';
import SectionsList from './SectionsList';
import { connect } from 'react-redux';
import { getSections, setCurrentSectionId, addSection, addLesson, deleteSection, deleteLesson } from '../../../redux/course-reducer';


class SectionsListContainer extends React.Component {
    componentDidMount() {
        this.props.getSections();
    }

    render() {
        return <SectionsList {...this.props} sections={this.props.sections} currentSectionId={this.props.currentSectionId} />
    }
}

let mapStateToProps = (state) => ({
    sections: state.course.sections,
    currentSectionId: state.course.currentSectionId,
    currentLessonId: state.course.currentLessonId,
    editMode: state.edit.editMode,
})



export default connect(mapStateToProps, {
    getSections, setCurrentSectionId,
    addSection, addLesson,
    deleteSection, deleteLesson
})(SectionsListContainer);
