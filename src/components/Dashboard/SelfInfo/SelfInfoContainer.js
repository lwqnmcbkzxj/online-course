import React from 'react';
import SelfInfo from './SelfInfo';
import { connect } from 'react-redux';
import {  getUserInfo, changePassword, changeEmail } from '../../../redux/user-reducer';


class SelfInfoContainer extends React.Component {
    componentDidMount() {
        this.props.getUserInfo();        
    }
    render() {
        return <SelfInfo {...this.props}/>
    }
}

let mapStateToProps = (state) => ({
    stats: state.user.stats,
    info: state.user.info
})
 


export default connect(mapStateToProps, { getUserInfo, changePassword, changeEmail })(SelfInfoContainer);
