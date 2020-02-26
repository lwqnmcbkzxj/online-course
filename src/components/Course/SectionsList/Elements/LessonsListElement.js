import React from 'react';
import s from '../SectionsList.module.css';
import { NavLink } from 'react-router-dom';

import deleteIcon from '../../../../assets/images/delete.png'

const LessonsListElement = (props) => {
    let setCurrentSection = (sectionId) => {
        props.setCurrentSection(sectionId);
    }

    let deleteLesson = (lessonId, sectionId) => {
        props.deleteLesson(lessonId, sectionId)
    }

    let changeLessonPosition = (position, sectionId, direction) => {
        props.changeLessonPosition(position, sectionId, direction)
    }

    return (
        <div className={s.item} >
            {props.editMode &&
                <div className={s.serviceBlock}>
                    <div className="icon delete"><img src={deleteIcon} alt="deleteIcon" onClick={() => { deleteLesson(props.id, props.section.id) }} /></div>
                <div className={s.moveElementBlock}>
                    {props.section_position !== 1 ? 
                        <i className="fa fa-caret-up"  aria-hidden="true" onClick={() => { changeLessonPosition(props.section_position, props.section.id, 0) }}></i>
                    : null}

                    {props.section_position !== props.section.lessons.length ? 
                        <i className="fa fa-caret-down" aria-hidden="true" onClick={() => { changeLessonPosition(props.section_position, props.section.id, 1) }}></i>
                    : null}                         
                </div>
                </div>}

            {props.completedLessonsIds.some(id => +id === +props.id) ?
                <div><i className="fa fa-check" aria-hidden="true"></i></div> : null}

            <NavLink to={`/course/lesson/${props.id}`} activeClassName={s.activeLink} onClick={() => { setCurrentSection(props.section.id) }}>
                {props.title}
            </NavLink>
        </div>

    )
}
export default LessonsListElement;
