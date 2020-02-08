import React from 'react';
import s from './SectionsList.module.css';
import { NavLink } from 'react-router-dom';
// import Section from './Section/Section';
// Приходит список sections и через map создаются section 
const SectionsList = (props) => {    

    var sectCounter = 1;
    for (var section of props.sections) {
        for (var lesson of section.lessons) {
            if (lesson.id == props.currentLesson)
                props.setCurrentSection(sectCounter);
        }
        sectCounter++;
    }

    let toggleCurrentSection = (sectionId) => {
        props.setCurrentSection(sectionId);
    }
    return (
        <div className={s.sectionList}>
            {
                props.sections.map(section =>
                    <div className={s.section} key={section.id}>
                        <h1 className={s.sectionName}>{section.title}</h1>
                        <ul className={s.lessons}>
                            {
                                section.lessons.map(lesson =>
                                    <li key={lesson.id}>
                                        <NavLink className={s.item} to={`/course/lesson/${lesson.id}`} activeClassName={s.activeLink} onClick={() => { toggleCurrentSection(section.id) }}>
                                            {lesson.title}
                                        </NavLink>
                                    </li>)
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    );
}
export default SectionsList;
