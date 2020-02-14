import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';


class Header extends React.Component {
    toggleEditMode = (value) => {
        this.props.toggleEditMode(value)
    }    
   
    render() {
        return (
            <header className={s.header}>
                <NavLink className={s.item + ' ' + s.courseName} to="/course">Creativity in Physics</NavLink> 
                <div className={s.options}>
                    <NavLink className={s.item} to={`/course/lesson/${this.props.currentLessonId}`} activeClassName={s.activeLink}>Course</NavLink>
                    <NavLink className={s.item} to="/tasks" activeClassName={s.activeLink}>Tasks</NavLink>
    
                    {this.props.user.role ? 
                        this.props.editMode ?
                            <button className={s.item + ' ' + s.activeButton} onClick={() =>{ this.toggleEditMode(false)}}>Edit</button> :
                            <button className={s.item} onClick={() => { this.toggleEditMode(true) }}>Edit</button>
                    : null}
                    <NavLink className={s.item} to="/dashboard" activeClassName={s.activeLink} >Dashboard</NavLink>
                </div>
            </header>
        );
    }
}
export default Header;
