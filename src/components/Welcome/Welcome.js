import React from 'react';
import s from './Welcome.module.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { compose } from 'redux';

import { setStartPagename } from '../../redux/app-reducer';

const Welcome = (props) => {
    let setStartPagename = () => {
        props.setStartPagename('welcome');
    }
    return (
        <div className={s.welcome}>
            <NavLink to="/login"><button onClick={setStartPagename}>Resume</button></NavLink>
            <NavLink to="/signin"><button>ENROLL</button></NavLink>
        </div>
    );
}

let mapStateToProps = (state) => ({});

export default compose(
	withRouter,
    connect(mapStateToProps, { setStartPagename }))(Welcome);
    