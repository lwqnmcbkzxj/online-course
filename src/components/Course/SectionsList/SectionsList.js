import React from 'react';
import s from './SectionsList.module.css';
import { NavLink } from 'react-router-dom';

const SectionsList = (props) => {
    let sectCounter;
    for (let section of props.sections) {
        sectCounter = section.id;
        if (section.lessons) {
            for (let lesson of section.lessons) {
                if (lesson.id == props.currentLessonId)
                    props.setCurrentSectionId(sectCounter);
            }
        }
    }

    let setCurrentSection = (sectionId) => {
        props.setCurrentSectionId(sectionId);
    }


    let addLesson = (sectionId) => {
        setCurrentSection(sectionId);
        props.addLesson(sectionId);
    }

    let addSection = () => {
        props.addSection();
    }


    let deleteLesson = (lessonId) => {
        props.deleteLesson(lessonId);
    }

    let deleteSection = (sectionId) => {
        props.deleteSection(sectionId);
    }

    let showDeleteAlert = () => {
        
    }
    console.log(props)
    return (
        <div className={s.sectionList}>
            {
                props.sections.map(section =>
                    <div className={s.section} key={"s" + section.id}>

                        <div className={s.sectionContent}>
                            {props.editMode && <div><i className="fa fa-trash-o" aria-hidden="true" onClick={() => { deleteSection(section.id) }}></i></div>}
                            {section.completed && <div><i className="fa fa-check" aria-hidden="true"></i></div>}
                            <h1 className={s.sectionName}>{section.title}</h1>
                        </div>


                        <ul className={s.lessons}>
                            {
                                section.lessons ?
                                    section.lessons.map(lesson =>
                                        <li key={"l" + lesson.id}>
                                            <div className={s.item} >
                                                {props.editMode && <i className="fa fa-trash-o" aria-hidden="true" onClick={() => { deleteLesson(lesson.id) }}></i>}
                                                {lesson.completed && <i className="fa fa-check" aria-hidden="true"></i>}
                                                <NavLink to={`/course/lesson/${lesson.id}`} activeClassName={s.activeLink} onClick={() => { setCurrentSection(section.id) }}>
                                                    {lesson.title}
                                                </NavLink>
                                            </div>
                                        </li>)
                                    : null
                            }
                            {props.editMode && <button className={s.addLessonBtn} onClick={() => { addLesson(section.id) }}>+ Add lesson</button>}
                        </ul>
                    </div>
                )
            }
            {props.editMode && <button className= {s.addSectionBtn} onClick={addSection}>+ Add section</button>}
        </div>
    );
}
export default SectionsList;
