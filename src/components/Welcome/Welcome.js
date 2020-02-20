import React from 'react';
import s from './Welcome.module.css';
import { NavLink } from 'react-router-dom';


const Welcome = () => {
    return (
        <div className={s.welcome}>
            <NavLink to="/login"><button>Resume</button></NavLink>
            <NavLink to="/signin"><button>ENROLL</button></NavLink>
        </div>
    );
}
export default Welcome;
