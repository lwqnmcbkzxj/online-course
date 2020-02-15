import React from 'react';
import s from './SectionsList.module.css';
import { NavLink } from 'react-router-dom';


class SectionsList extends React.Component {
    state = {
        visibleSections: []
    }

    componentDidMount() {
        let sectCounter;
        for (let section of this.props.sections) {
            sectCounter = section.id;
            if (section.lessons) {
                for (let lesson of section.lessons) {
                    if (lesson.id == this.props.currentLessonId)
                        this.props.setCurrentSectionId(sectCounter);
                }
            }
        }
    }

    setCurrentSection = (sectionId) => {
        this.props.setCurrentSectionId(sectionId);
    }


    addLesson = (sectionId, contentType) => {

        this.setCurrentSection(sectionId);
        this.props.addLesson(sectionId, contentType);
    }

    addSection = () => {
        this.props.addSection();
    }


    deleteLesson = (lessonId) => {
        this.props.setModalFunction(this.props.deleteLesson, lessonId, 'Lesson')
    }

    deleteSection = (sectionId) => {
        this.props.setModalFunction(this.props.deleteSection, sectionId, 'Section')
    }

    toggleSection = (sectionId) => {
        let visibleSections = [...this.state.visibleSections];
        if (visibleSections.indexOf(sectionId) == -1)
            visibleSections.push(sectionId);
        else {
            let index = visibleSections.indexOf(sectionId)
            visibleSections.splice(index, 1)
        }
        this.setState({ visibleSections })
    }

    render() {
        return (
            <div className={s.sectionList}>
                {
                    this.props.sections.map(section =>
                        <div className={s.section} key={"s" + section.id} >

                            <div className={s.sectionContent}>
                                {this.props.editMode &&
                                    <div className={s.serviceBlock}>
                                        <i className="fa fa-trash-o" aria-hidden="true" onClick={() => { this.deleteSection(section.id) }}></i>
                                        <i className="fa fa-arrows" aria-hidden="true"></i>
                                    </div>}
                                {section.completed && <div><i className="fa fa-check" aria-hidden="true"></i></div>}
                                <h1 className={s.sectionName} onClick={() => { this.toggleSection(section.id) }}>{section.title}</h1>
                            </div>


                            <ul className={this.state.visibleSections.some(id => id == section.id) ? s.lessonsVisibile : s.lessonsHidden} >
                                {
                                    section.lessons ?
                                        section.lessons.map(lesson =>
                                            <li key={"l" + lesson.id}>
                                                <div className={s.item} >
                                                    {this.props.editMode &&
                                                        <div className={s.serviceBlock}>
                                                            <i className="fa fa-trash-o" aria-hidden="true" onClick={() => { this.deleteLesson(lesson.id) }}></i>
                                                            <i className="fa fa-arrows" aria-hidden="true"></i>
                                                        </div> }
                                                    {lesson.completed && <i className="fa fa-check" aria-hidden="true"></i>}
                                                    <NavLink to={`/course/lesson/${lesson.id}`} activeClassName={s.activeLink} onClick={() => { this.setCurrentSection(section.id) }}>
                                                        {lesson.title}
                                                    </NavLink>
                                                </div>
                                            </li>)
                                        : null
                                }
                                {this.props.editMode && <button className={s.addLessonBtn} onClick={() => { this.addLesson(section.id, 0) }}>+ Add lesson</button>}
                                {this.props.editMode && <button className={s.addLessonBtn} onClick={() => { this.addLesson(section.id, 1) }}>+ Add task</button>}
                            </ul>
                        </div>
                    )
                }
                {this.props.editMode && <button className={s.addSectionBtn} onClick={this.addSection}>+ Add section</button>}
            </div>
        );
    }
}
export default SectionsList;
