import React from 'react';
import s from './Dashboard.module.css';
import Dashboard from './Dashboard';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

const DashboardContainer = (props) => {
    return (
        <div className={s.dashboard}>
            <Dashboard {...props} />
        </div>
    );
}
const mapStateToProps = (state) => ({
    role: state.user.role,
})

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {}))(DashboardContainer);