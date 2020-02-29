import React from 'react';
import s from './SectionsList.module.css';
import { withRouter } from 'react-router';

import SectionHeader from './Elements/SectionHeader';
import LessonsListElement from './Elements/LessonsListElement';
import alertify from "alertifyjs";
import Preloader from '../../Common/Preloader/Preloader';

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
                    if (+lesson.id === +this.props.currentLessonId)
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

        this.props.addLesson(sectionId, contentType).then(() => {
            this.props.history.push(`/course/lesson/${this.props.addedLessonId}`);
            // alertify.success("SUCCESS")

        });
    }

    addSection = () => {
        this.props.addSection();
    }

    deleteLesson = (lessonId, sectionId) => {
        this.props.setModalFunction(this.props.deleteLesson, [lessonId, sectionId], 'Lesson');
    }

    deleteSection = (sectionId) => {
        this.props.setModalFunction(this.props.deleteSection, sectionId, 'Section')
    }

    toggleSection = (sectionId) => {
        let visibleSections = [...this.state.visibleSections];
        if (visibleSections.indexOf(sectionId) === -1)
            visibleSections.push(sectionId);
        else {
            let index = visibleSections.indexOf(sectionId)
            visibleSections.splice(index, 1)
        }
        this.setState({ visibleSections })
    }

    changeLessonPosition = (position, sectionId, direction) => {
        let section = this.props.sections.filter(section => section.id === sectionId)[0];
        let newPosition = 0;
        if (direction === 0 && position > 1) {
            newPosition = position--;
        } else if (direction === 1 && position < section.lessons.length) {
            newPosition = position++;
        }
        if (newPosition !== 0) {
            this.props.changeElementPosition(position, newPosition, 'lesson', sectionId);
        }
    }

    changeSectionPosition = (position, direction) => {
        let sections = this.props.sections;

        let newPosition = 0;
        if (direction === 0 && position > 1) {
            newPosition = position--;
        } else if (direction === 1 && position < sections.length) {
            newPosition = position++;
        }

        if (newPosition !== 0) {
            this.props.changeElementPosition(position, newPosition, 'section');
        }
    }

    render() {
        if (this.props.sectionsListIsFetching)
            return <Preloader />
        return (
            <div className={s.sectionList}>
                {
                    this.props.sections.map(section =>
                        section.publish || this.props.editMode ?
                            <div className={s.section} key={"section" + section.id} >
                                <SectionHeader
                                    {...section}
                                    sectionsLength={this.props.sections.length}
                                    completedSectionsIds={this.props.completedSectionsIds}
                                    visibleSections={this.state.visibleSections}
                                    editMode={this.props.editMode}
                                    deleteSection={this.deleteSection}
                                    toggleSection={this.toggleSection}
                                    changeSectionPosition={this.changeSectionPosition}
                                />

                                <ul className={this.state.visibleSections.some(id => +id === +section.id) ? s.lessonsVisibile : s.lessonsHidden} >
                                    {
                                        section.lessons ? section.lessons.map(lesson =>
                                                lesson.publish || this.props.editMode ?
                                                    <li key={"lesson" + lesson.id}>
                                                        <LessonsListElement
                                                            {...lesson}
                                                            section={section}
                                                            completedLessonsIds={this.props.completedLessonsIds}
                                                            editMode={this.props.editMode}
                                                            changeSectionPosition={this.changeSectionPosition}
                                                            setCurrentSection={this.setCurrentSection}
                                                            changeLessonPosition={this.changeLessonPosition}
                                                            deleteLesson={this.deleteLesson}
                                                        />
                                                    </li>
                                                    : null)
                                            : null
                                    }
                                    {this.props.editMode && <button className={s.addLessonBtn} onClick={() => { this.addLesson(section.id, 0) }}>+ Add lesson</button>}
                                    {this.props.editMode && <button className={s.addLessonBtn} onClick={() => { this.addLesson(section.id, 1) }}>+ Add task</button>}
                                </ul>
                            </div> : null
                    )
                }
                {this.props.editMode && <button className={s.addSectionBtn} onClick={this.addSection}>+ Add section</button>}
            </div>
        );
    }
}
export default withRouter(SectionsList);
