import { sectionsListAPI, lessonAPI } from '../api/api';
import { getUserInfo } from "./user-reducer"
import { setCourseInfo } from './course-reducer';

import alertify from "alertifyjs";
alertify.set('notifier', 'position', 'top-right');

const SET_SECTIONS = 'SET_SECTIONS_DATA';

const ADD_SECTION = 'ADD_SECTION';
const ADD_LESSON = 'ADD_LESSON';

const DELETE_LESSON = 'DELETE_LESSON';
const DELETE_SECTION = 'DELETE_SECTION';

const EDIT_SECTION = 'EDIT_SECTION';
const EDIT_LESSON = 'EDIT_LESSON';

const COMPLETE_LESSON = 'COMPLETE_LESSON';
const COMPLETE_SECTION = 'COMPLETE_SECTION';

const CHANGE_LESSON_POSITION = 'CHANGE_LESSON_POSITION';
const CHANGE_SECTION_POSITION = 'CHANGE_SECTION_POSITION';

const TOGGLE_IS_SECTIONS_FETCHING = 'TOGGLE_IS_SECTIONS_FETCHING';


let initialState = {
    sections: [],
    sectionsListIsFetching:false
}

const sectionsListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SECTIONS: {
            let sections = action.sections.map(section => {
                let lessons = section.lessons.sort((prev, next) => prev.section_position - next.section_position)
                return { ...section, lessons }
            })
            sections = sections.sort((prev, next) => prev.dash_position - next.dash_position)
            return {
                ...state,
                sections
            }
        }

        case ADD_SECTION: {
            let maxId = 0;
            for (let section of state.sections) {
                if (section.id > maxId)
                    maxId = section.id
            }

            let newSection = {
                id: maxId + 1,
                title: "NEW SECTION",
                lessons: []
            }

            return {
                ...state,
                sections: [...state.sections, newSection]
            };
        }
        case ADD_LESSON: {
            let maxId = 0;
            for (let section of state.sections) {
                for (let lesson of section.lessons) {
                    if (+lesson.id > +maxId)
                        maxId = +lesson.id
                }
            }
            let newLesson = {
                id: maxId + 1,
                title: "New lesson ",
            }

            return {
                ...state,
                sections: state.sections.map(section => {
                    if (+section.id === +action.sectionId) {
                        section.lessons = [...section.lessons, newLesson];
                    }
                    return section;
                })
            };
        }

        case DELETE_SECTION: {
            return {
                ...state,
                sections: state.sections.filter(section => +section.id !== +action.sectionId)
            };
        }

        case DELETE_LESSON: {
            return {
                ...state,
                sections: state.sections.map(section => {
                    let newLessons = section.lessons.filter(lesson => +lesson.id !== +action.lessonId);
                    return { ...section, lessons: newLessons };
                })
            };
        }

        case EDIT_SECTION: {
            return {
                ...state,
                sections: state.sections.map(section => {
                    if (section.id === action.sectionId)
                        return { ...section, title: action.title };
                    return section;
                })
            };
        }

        case EDIT_LESSON: {
            return {
                ...state,
                sections: state.sections.map(section => {
                    if (section.id === action.sectionId) {
                        section.lessons = section.lessons.map(lesson => {
                            if (+lesson.id === +action.lessonId)
                                return { ...lesson, title: action.title };

                            return lesson;
                        });
                    }

                    return section;
                })
            };
        }

        case COMPLETE_LESSON: {
            return {
                ...state,
                sections: state.sections.map(section => {
                    let newLessons = [];

                    section.lessons.map(lesson => {
                        if (+lesson.id === +action.lessonId && !lesson.completed)
                            newLessons.push({ ...lesson, completed: true });
                        else
                            newLessons.push({ ...lesson });
                    })
                    return { ...section, lessons: newLessons };
                })
            };
        }

        case COMPLETE_SECTION: {
            let allCompleted = true;
            for (let section of this.state.sections) {
                if (+section.id === +action.sectionId) {
                    for (let lesson of section.lessons) {
                        if (!lesson.completed)
                            allCompleted = false
                    }
                }
            }
            return {
                ...state,
                sections: state.sections.map(section => {
                    if (+section.id === +action.sectionId && allCompleted)
                        return { ...section, completed: true };

                    return { ...section };
                })
            };
        }

        case CHANGE_SECTION_POSITION: {
            let sections = state.sections;
            sections = sections.map(section => {
                if (section.dash_position === action.oldPosition)
                    return { ...section, dash_position: action.newPosition };
                else if (section.dash_position === action.newPosition)
                    return { ...section, dash_position: action.oldPosition };

                return section;
            });
            return {
                ...state,
                sections: sections.sort((prev, next) => prev.dash_position - next.dash_position)
            }
        }

        case CHANGE_LESSON_POSITION: {
            let lessons = state.sections.filter(section => section.id === action.sectionId)[0].lessons;

            lessons = lessons.map(lesson => {
                if (lesson.section_position === action.oldPosition)
                    return { ...lesson, section_position: action.newPosition };
                else if (lesson.section_position === action.newPosition)
                    return { ...lesson, section_position: action.oldPosition };

                return lesson;
            });
            lessons = lessons.sort((prev, next) => prev.section_position - next.section_position)

            return {
                ...state,
                sections: state.sections.map(section => {
                    if (section.id === action.sectionId)
                        return { ...section, lessons }
                    return section;
                })
            }
        }

        case TOGGLE_IS_SECTIONS_FETCHING: {
            return {
                ...state,
                sectionsListIsFetching: action.isFetching
            }
        }
        default:
            return state;
    }
}



const setSections = (sections) => {
    return {
        type: SET_SECTIONS,
        sections
    }
}

const deleteSectionSuccess = (sectionId) => {
    return {
        type: DELETE_SECTION,
        sectionId
    }
}

const deleteLessonSuccess = (lessonId) => {
    return {
        type: DELETE_LESSON,
        lessonId
    }
}

const editSectionSuccess = (sectionId, title) => {
    return {
        type: EDIT_SECTION,
        sectionId,
        title
    }
}

const editLessonSuccess = (sectionId, lessonId, title) => {
    return {
        type: EDIT_LESSON,
        sectionId,
        lessonId,
        title
    }
}

const changeLessonPositionSuccess = (oldPosition, newPosition, sectionId) => {
    return {
        type: CHANGE_LESSON_POSITION,
        oldPosition,
        newPosition,
        sectionId,
    }
}
const changeSectionPositionSuccess = (oldPosition, newPosition) => {
    return {
        type: CHANGE_SECTION_POSITION,
        oldPosition,
        newPosition,
    }
}

//THUNKS
export const getSections = () => (dispatch) => {
    return sectionsListAPI.getSections().then((response) => {
        dispatch(setSections(response));
        dispatch(setCourseInfo(response));
        dispatch(toggleIsSectionsFetching(false));
    })
}

// COMPLETE
export const completeSection = (lessonId, sectionId) => (dispatch, getState) => {
    let allCompleted = true;

    const state = getState();
    let completedLessonsIds = [...state.user.completedLessonsIds, +lessonId]
    let sections = state.sectionsList.sections

    for (let section of sections) {
        if (+section.id === +sectionId) {
            section.lessons.map(lesson => {
                if (!completedLessonsIds.some(id => +id === +lesson.id))
                    allCompleted = false;
            })
        }
    }

    if (allCompleted) {
        sectionsListAPI.completeSection(sectionId).then((response) => {
            if (response.status === "ok") {
                dispatch(getUserInfo());
            }
        });
    }
}

export const completeLesson = (lessonId, sectionId, contentType, data) => (dispatch) => {
    lessonAPI.completeLesson(lessonId, contentType, data).then((response) => {
        if (response.status === "ok") {
            dispatch(getUserInfo());
            dispatch(completeSection(lessonId, sectionId));
        }
    });

}

// DELETE
export const deleteSection = (sectionId) => (dispatch) => {
    dispatch(toggleIsSectionsFetching(true))

    dispatch(deleteSectionSuccess(sectionId));
    sectionsListAPI.deleteSection(sectionId).then((response) => {
        if (response.status === "ok") {
            alertify.success("Section deleted");
            dispatch(getSections());
        }
        else
            alertify.error("Failed to delete section");
    })
}

export const deleteLesson = (lessonId, sectionId) => (dispatch) => {
    dispatch(toggleIsSectionsFetching(true))

    // dispatch(deleteLessonSuccess(lessonId));
    lessonAPI.deleteLesson(lessonId, sectionId).then((response) => {
        if (response.status === "ok") {
            dispatch(getUserInfo());
            dispatch(getSections());
            alertify.success("Lesson deleted");
        } else
            alertify.error("Failed to delete lesson");
    })
}

// ADD
export const addSection = () => (dispatch) => {
    dispatch(toggleIsSectionsFetching(true));

    sectionsListAPI.addSection().then((response) => {
        if (response.status === "ok") {
            dispatch(getSections());
            alertify.success("Section added");
        } else
            alertify.error("Failed to add section");
    })
}

export const addLesson = (sectionId, contentType) => (dispatch) => {
    dispatch(toggleIsSectionsFetching(true));
    return lessonAPI.addLesson(sectionId, contentType).then((response) => {
        if (response.status === "ok") {
            dispatch(getUserInfo());
            alertify.success("Lesson added");
            return dispatch(getSections());
        } else
            alertify.error("Failed to add lesson");
    })
}

// EDIT
export const editSection = (sectionId, title) => (dispatch) => {
    dispatch(editSectionSuccess(sectionId, title));
    sectionsListAPI.editSection(sectionId, title).then(response => {
        if (response.status === "ok")
            alertify.success("Section edited");
        else
            alertify.error("Failed to edit section");
    });


}
export const editLesson = (sectionId, lessonId, title) => (dispatch) => {
    dispatch(editLessonSuccess(sectionId, lessonId, title));
    lessonAPI.editLesson(lessonId, title).then(response => {
        if (response.status === "ok")
            alertify.success("Lesson edited");
        else
            alertify.error("Failed to edit lesson");
    });
}

export const changeElementPosition = (oldPosition, newPosition, type, foreignId) => (dispatch) => {
    lessonAPI.changeElementPosition(oldPosition, newPosition, type, foreignId).then(response => {
        if (response.status === "ok") {
            if (type === 'section')
                dispatch(changeSectionPositionSuccess(oldPosition, newPosition));
            else if (type === 'lesson')
                dispatch(changeLessonPositionSuccess(oldPosition, newPosition, foreignId));
            alertify.success("Position changed");
        }
        else
            alertify.error("Failed to change position");
    });


}

const toggleIsSectionsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_SECTIONS_FETCHING,
        isFetching
    }
}

export default sectionsListReducer;