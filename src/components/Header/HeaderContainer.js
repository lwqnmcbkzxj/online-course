import React from 'react';
import Header from './Header'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';

import { toggleEditMode } from '../../redux/course-reducer';
import { getUserInfo } from '../../redux/user-reducer';

class HeaderContainer extends React.Component {
    render() {
        return <Header {...this.props} />
    }
}


let mapStateToProps = (state) => {
    return {
        user: state.user.info,
        editMode: state.course.editMode,       
    }
}

export default compose(
withRouter,
    connect(mapStateToProps, { toggleEditMode, getUserInfo }))(HeaderContainer);
    
    
