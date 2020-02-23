import React from 'react';
import Course from './Course';
import Preloader from '../Common/Preloader/Preloader';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { toggleModalVisible } from '../../redux/course-reducer';


class CourseContainer extends React.Component {     
    render() {
        if (this.props.isFetching)
            return <Preloader />
        return <Course {...this.props} />
    }
}

let mapStateToProps = (state) => ({
    modalIsVisible: state.course.modalIsVisible,
    modalFunction: state.course.modalFunction,
    isFetching: state.course.isFetching
})



export default compose(
    connect(mapStateToProps, { toggleModalVisible }))(CourseContainer);