import React from 'react';
import Course from './Course';
import Preloader from '../Common/Preloader/Preloader';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { toggleModalVisible } from '../../redux/course-reducer';
import { withRouter } from 'react-router';


class CourseContainer extends React.Component {  
    componentDidMount() {
        if (!this.props.history.location.pathname.startsWith(`/course/lesson/`) )
            this.props.history.push(`course/lesson/${this.props.currentLessonId}`)
    }
    render() {
        // if (this.props.isFetching)
        //     return <Preloader />
        return <Course {...this.props} />
    }
}

let mapStateToProps = (state) => ({
    modalIsVisible: state.course.modalIsVisible,
    modalFunction: state.course.modalFunction,
    isFetching: state.course.isFetching,
    currentLessonId: state.course.currentLessonId,
})



export default compose(
    withRouter,
    connect(mapStateToProps, { toggleModalVisible }))(CourseContainer);