import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';


const Header = (props) => {
    let toggleEditMode = (value) => {
        props.toggleEditMode(value)
        console.log(value)
    }

    return (
        <header className={s.header}>
            <NavLink className={s.item + ' ' + s.courseName} to="/course">Creativity in Physics</NavLink> 
            <div className={s.options}>
                <NavLink className={s.item} to="/course" activeClassName={s.activeLink}>Course</NavLink>
                <NavLink className={s.item} to="/tasks" activeClassName={s.activeLink}>Tasks</NavLink>
                
                {props.user.isAdmin ? 
                    props.editModeActive ?
                        <button className={s.item + ' ' + s.activeButton} onClick={() =>{toggleEditMode(false)}}>Edit</button> :
                        <button className={s.item} onClick={() => { toggleEditMode(true) }}>Edit</button>
                : null}
                <NavLink className={s.item} to="/dashboard" activeClassName={s.activeLink} >Dashboard</NavLink>
            </div>
        </header>
    );
}
export default Header;
