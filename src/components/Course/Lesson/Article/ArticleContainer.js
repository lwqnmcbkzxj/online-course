import React from 'react';
import Article from './Article';
import ArticleEdit from './ArticleEdit';
import { connect } from 'react-redux';

import {  editSection, editLesson } from '../../../../redux/sectionsList-reducer';
import {  setModalFunction } from '../../../../redux/course-reducer';
import {  addElement, deleteElement, editElement, changeElementPosition } from '../../../../redux/lesson-reducer';

import { withRouter } from 'react-router';

class ArticleContainer extends React.Component {    
    componentDidMount() { }

    componentDidUpdate(prevProps) { }

    render() {
        return this.props.editMode ? <ArticleEdit {...this.props} /> : <Article {...this.props} />
    }
}


let mapStateToProps = (state) => {
    return {
        lesson: state.lesson.lesson,
        currentSectionId: state.course.currentSectionId,
        editMode: state.course.editMode,
    }
}



let WithUrlDataContainerComponent = withRouter(ArticleContainer);

export default connect(mapStateToProps, {    
    addElement, deleteElement, editElement, changeElementPosition,
    editLesson, editSection,
    setModalFunction
})(WithUrlDataContainerComponent);