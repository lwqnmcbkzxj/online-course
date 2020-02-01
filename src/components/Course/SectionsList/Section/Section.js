import React from 'react';
import s from './Section.module.css';
import { NavLink } from 'react-router-dom';

// получение списка уроков и их отрисовка
const Section = (props) => {
    let lessons = props.exersises.map(lesson => <li><NavLink className={s.item} to={`/course/lesson/${lesson.id}`} activeClassName={s.activeLink}>{lesson.name}</NavLink></li> )
    return (
        <div className={s.section}>           
            <h1 className={s.sectionName}>{props.title}</h1>
            <ul className = {s.lessons}> 
                {lessons}
             </ul>
        </div>        
    );
}
export default Section;
