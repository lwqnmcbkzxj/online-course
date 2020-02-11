import React from 'react';
import Header from './Header'
import { connect } from 'react-redux';
import { toggleEditMode } from '../../redux/edit-reducer';

class HeaderContainer extends React.Component {
    render() {
        return <Header {...this.props} />
    }
}


let mapStateToProps = (state) => {
    return {
        user: state.user.info,
        editMode: state.edit.editMode,
        currentLessonId: state.course.currentLessonId
    }
}


export default connect(mapStateToProps, { toggleEditMode })(HeaderContainer);