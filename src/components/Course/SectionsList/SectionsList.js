import React from 'react';
import s from './SectionsList.module.css';
import { NavLink } from 'react-router-dom';

const SectionsList = (props) => {
    let sectCounter = props.currentSectionId;
    for (let section of props.sections) {
        if (section.lessons) {
            for (let lesson of section.lessons) {
                if (lesson.id == props.currentLessonId)
                    props.setCurrentSectionId(sectCounter);
            }
        }
        sectCounter++;
    }

    let setCurrentSection = (sectionId) => {        
        props.setCurrentSectionId(sectionId);
    }   
   

    return (
        <div className={s.sectionList}>
            {
                props.sections.map(section =>
                    <div className={s.section} key={"s"+section.id}>
                        <h1 className={s.sectionName}>{section.title}</h1>
                        <ul className={s.lessons}>
                            {
                                section.lessons ? 
                                    section.lessons.map(lesson =>
                                        <li key={"l"+lesson.id}>
                                            <NavLink className={s.item} to={`/course/lesson/${lesson.id}`} activeClassName={s.activeLink} onClick={() => { setCurrentSection(section.id) }}>
                                                {lesson.title}
                                            </NavLink>
                                        </li>)
                                    : null
                            }
                            <NavLink className={s.addLessonBtn} to={`/course/add/lesson`} onClick={() => { setCurrentSection(section.id) }}>+ Add lesson</NavLink>
                        </ul>

                        {section == props.sections[props.sections.length - 1] ?
                            <NavLink className={s.addSectionBtn} to={`/course/add/section`} >+ Add section</NavLink>
                            : null}
                    </div>
                )
            }
        </div>
    );
}
export default SectionsList;
