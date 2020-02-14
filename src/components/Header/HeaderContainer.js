import React from 'react';
import Header from './Header'
import { connect } from 'react-redux';
import { toggleEditMode } from '../../redux/course-reducer';
import { getUserInfo } from '../../redux/user-reducer';

class HeaderContainer extends React.Component {   
    componentDidMount() {
        this.props.getUserInfo()
    }
    render() {
        return <Header {...this.props} />
    }
}


let mapStateToProps = (state) => {
    return {
        user: state.user.info,
        editMode: state.course.editMode,
        currentLessonId: state.course.currentLessonId,
    }
}


export default connect(mapStateToProps, { toggleEditMode, getUserInfo })(HeaderContainer);