import React from 'react';
import Course from './Course';
import { connect } from 'react-redux';
import { toggleModalVisible } from '../../redux/course-reducer';



class CourseContainer extends React.Component {    
    render() {
        return <Course {...this.props} />
    }
}

let mapStateToProps = (state) => ({
    modalIsVisible: state.course.modalIsVisible,
    modalFunction: state.course.modalFunction
})



export default connect(mapStateToProps, { toggleModalVisible })(CourseContainer);
