import React from 'react';
import s from './SectionsList.module.css';
import { NavLink } from 'react-router-dom';

const SectionsList = (props) => {
    console.log(props)
    let sectCounter = 1;
    for (let section of props.sections) {
        if (section.lessons) {
            for (let lesson of section.lessons) {
                if (lesson.id == props.currentLessonId)
                    props.setCurrentSectionId(sectCounter);
            }
        }


        sectCounter++;
    }

    let toggleCurrentSection = (sectionId) => {
        props.setCurrentSectionId(sectionId);
    }

    let addSection = () => {
        let newSection = {            
            title: "NEW SECTION",
            lessons: []
        }
        props.addSection(newSection);
    }
    let addLesson = () => {
        let newLesson = {            
           
        }
        props.addLesson(newLesson);
    }

    debugger
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
                                            <NavLink className={s.item} to={`/course/lesson/${lesson.id}`} activeClassName={s.activeLink} onClick={() => { toggleCurrentSection(section.id) }}>
                                                {lesson.title}
                                            </NavLink>
                                        </li>)
                                    : null
                            }
                            <button className={s.addLessonBtn}onClick={addLesson}>+ Add lesson</button> 

                        </ul>

                        {section == props.sections[props.sections.length - 1] ? <button className={s.addSectionBtn}onClick={addSection}>+ Add section</button> : null}
                    </div>
                )
            }
        </div>
    );
}
export default SectionsList;
