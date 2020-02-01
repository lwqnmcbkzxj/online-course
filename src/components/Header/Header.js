import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';


const Header = () => {
    return (
        <header className={s.header}> 
            <NavLink className={s.item} to="/course" activeClassName={s.activeLink}>Course</NavLink>
            <div className={s.item + ' ' + s.courseName}>Creativity in Physics</div>
            <div className = {s.options}>
                <NavLink className={s.item} to="/tasks" activeClassName={s.activeLink}>Tasks</NavLink>
                <NavLink className={s.item} to="/dashboard" activeClassName={s.activeLink}>Dashboard</NavLink>
           </div>
        </header>
    );
}
export default Header;
