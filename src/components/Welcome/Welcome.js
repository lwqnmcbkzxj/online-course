import React from 'react';
import s from './Welcome.module.css';
import { NavLink } from 'react-router-dom';


const Welcome = () => {
    return (
        <div className = {s.welcome}>
            <NavLink to="/"><button>ENROLL</button></NavLink>
        </div>
    );
}
export default Welcome;
