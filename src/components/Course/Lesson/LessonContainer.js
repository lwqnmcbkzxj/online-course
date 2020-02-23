import React from 'react';
import { connect } from 'react-redux';

import Lesson from './Lesson';
import LessonEdit from './LessonEdit';
import Preloader from '../../Common/Preloader/Preloader';

import { editSection, editLesson, completeLesson } from '../../../redux/sectionsList-reducer';
import { setCurrentLessonId, setModalFunction } from '../../../redux/course-reducer';
import { getLesson, addElement, addTaskElement, deleteElement, editElement, changeElementPosition, togglePublish } from '../../../redux/lesson-reducer';

import { withRouter } from 'react-router';

class LessonContainer extends React.Component {
    state = {
        sectionTitle: '',
        lessonTitle: '',
        lessonId: 0,
        isFirstLesson: false,
        isLastLessonInCourse: false,
        publishedLesson: false,
        publishedSection: false
    }


    componentWillMount() {
        let lessonId = this.props.match.params.lessonId ? this.props.match.params.lessonId : 1;
        this.props.getLesson(lessonId);

        this.getCurrentLessonTitle(lessonId);
        this.getCurrentSectionTitle(lessonId);
        this.getIsLastLessonInCourse(lessonId);
        this.getIsPublished(lessonId);
    }

    componentDidUpdate(prevProps, prevState) {

        let lessonId = this.props.match.params.lessonId ? this.props.match.params.lessonId : 1;
        if (this.props.sections.length && (+lessonId !== +prevState.lessonId ||
            this.state.sectionTitle !== prevState.sectionTitle ||
            this.state.lessonTitle !== prevState.lessonTitle)) {

            this.props.getLesson(lessonId);
            this.setState({ lessonId });
            this.getCurrentLessonTitle(lessonId);
            this.getCurrentSectionTitle(lessonId);
            this.getIsLastLessonInCourse(lessonId);
            this.getIsPublished(lessonId);
        }

        if (this.props.sections.length > 0 && prevProps.sections.length > 0) {
            this.checkCanGetIsPublished(lessonId, prevProps);
        }
    }


    checkCanGetIsPublished = (lessonId, prevProps) => {
        let currentSection = {};
        let prevCurrentSection = {};
        let currentLesson = {};
        let prevCurrentLesson = {};

        this.props.sections.map(section => {
            section.lessons.map(lesson => {
                if (+lesson.id === +lessonId) {
                    currentSection = section;
                    currentLesson = lesson;
                }
            })
        });
        prevProps.sections && prevProps.sections.map(section => {
            section.lessons.map(lesson => {
                if (+lesson.id === +lessonId) {
                    prevCurrentSection = section;
                    prevCurrentLesson = lesson;
                }
            })
        })

        if (currentSection.publish !== prevCurrentSection.publish || currentLesson.publish !== prevCurrentLesson.publish) {
            this.getIsPublished(lessonId);
        }
    }
    getCurrentLessonTitle = (lessonId) => {
        this.props.sections.map(section => {
            section.lessons.map(lesson => {
                if (+lesson.id === +lessonId) {
                    if (this.state.lessonTitle !== lesson.title)
                        this.setState({ lessonTitle: lesson.title });
                }
            });
        });
    }

    getCurrentSectionTitle = (lessonId) => {
        let sections = this.props.sections;
        for (let i = 0; i < sections.length; i++) {
            if (+sections[i].id === +this.props.currentSectionId && +sections[i].lessons[0].id === +lessonId) {
                this.setState({ sectionTitle: sections[i].title, isFirstLesson: true });
                break;
            } else
                this.setState({ sectionTitle: '', isFirstLesson: false });
        }
    }
    getIsLastLessonInCourse = (lessonId) => {
        if (this.props.sections.length > 0) {
            let sections = this.props.sections;
            let lessons = sections[sections.length - 1].lessons;
            let lesson = lessons[lessons.length - 1]
            if (!lesson)
                return false;

            if (lesson.id === +lessonId)
                this.setState({ isLastLessonInCourse: true });
            else
                this.setState({ isLastLessonInCourse: false });
        }
    }

    getIsPublished = (lessonId) => {
        this.props.sections.map(section => {
            section.lessons.map(lesson => {
                if (+lesson.id === +lessonId) {
                    this.setState({ publishedSection: section.publish });
                    this.setState({ publishedLesson: lesson.publish });
                }
            })
        })
    }

    goToNextLesson = () => {
        let sectPos = 0;
        let lesPos = 0;
        this.props.sections.map((section, sectionCounter) => {
            section.lessons.map((lesson, lessonCounter) => {
                if (lesson.id === +this.props.lesson.id) {
                    lesPos = lessonCounter;
                    sectPos = sectionCounter;

                }
            })
        })
        lesPos++;
        let nextId = this.props.lesson.id;
        let lessons = this.props.sections[sectPos].lessons;
        // If published lesson in currentSection
        while (lesPos !== lessons.length) {
            if (lessons[lesPos] && lessons[lesPos].publish) {
                nextId = lessons[lesPos].id;
                break
            }
            lesPos++;
        }
        //If no published lessons in currentSection
        if (nextId === this.props.lesson.id) {
            while (nextId === this.props.lesson.id) {
                sectPos++;
                let lessons = this.props.sections[sectPos].lessons;
                for (let i = 0; i < lessons.length; i++) {
                    if (lessons[i].publish) {
                        nextId = lessons[i].id;
                        break;
                    }
                }
            }
        }
        this.props.history.push(`/course/lesson/${nextId}`)
    }
    render() {
        if (this.props.lessonIsFetching)
            return <Preloader />
        return this.props.editMode ?
            <LessonEdit {...this.props}
                sectionTitle={this.state.sectionTitle}
                lessonTitle={this.state.lessonTitle}
                isFirstLesson={this.state.isFirstLesson}
                publishedLesson={this.state.publishedLesson}
                publishedSection={this.state.publishedSection}
            /> :

            this.state.publishedLesson ?
                <Lesson {...this.props}
                    sectionTitle={this.state.sectionTitle}
                    lessonTitle={this.state.lessonTitle}
                    isFirstLesson={this.state.isFirstLesson}
                    isLastLessonInCourse={this.state.isLastLessonInCourse}
                    goToNextLesson={this.goToNextLesson} /> : <div></div>
    }
}


let mapStateToProps = (state) => {
    return {
        sections: state.sectionsList.sections,
        lesson: state.lesson.lesson,
        currentSectionId: state.course.currentSectionId,
        editMode: state.course.editMode,
        completedLessonsIds: state.user.completedLessonsIds,
        lessonIsFetching: state.lesson.lessonIsFetching
    }
}



let WithUrlDataContainerComponent = withRouter(LessonContainer);

export default connect(mapStateToProps, {
    getLesson, setCurrentLessonId,
    completeLesson,
    setModalFunction,
    addElement, addTaskElement, deleteElement, editElement, changeElementPosition,
    editSection, editLesson,
    togglePublish
})(WithUrlDataContainerComponent);