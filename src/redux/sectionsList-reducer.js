import { sectionsListAPI, lessonAPI } from '../api/api';

const SET_SECTIONS = 'SET_SECTIONS_DATA';

const ADD_SECTION = 'ADD_SECTION';
const ADD_LESSON = 'ADD_LESSON';

const DELETE_LESSON = 'DELETE_LESSON';
const DELETE_SECTION = 'DELETE_SECTION';

const EDIT_SECTION = 'EDIT_SECTION';
const EDIT_LESSON = 'EDIT_LESSON';

const COMPLETE_LESSON = 'COMPLETE_LESSON';
const COMPLETE_SECTION = 'COMPLETE_SECTION';

let initialState = {
    sections: []
}

const sectionsListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SECTIONS: {
            return {
                ...state,
                sections: action.sections,
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
                    if (lesson.id > maxId)
                        maxId = lesson.id
                }
            }
            let newLesson = {
                id: maxId + 1,
                title: "New lesson ",
            }

            return {
                ...state,
                sections: state.sections.map(section => {
                    if (section.id == action.sectionId) {
                        section.lessons = [...section.lessons, newLesson];
                    }
                    return section;
                })
            };
        }

        case DELETE_SECTION: {
            return {
                ...state,
                sections: state.sections.filter(section => section.id != action.sectionId)
            };
        }

        case DELETE_LESSON: {
            return {
                ...state,
                sections: state.sections.map(section => {
                    let newLessons = section.lessons.filter(lesson => lesson.id != action.lessonId);
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
                        section.lessons.map(lesson => {
                            if (lesson.id === +action.lessonId)
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
                        if (lesson.id == action.lessonId && !lesson.completed)
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
                if (section.id == action.sectionId) {
                    for (let lesson of section.lessons) {
                        if (!lesson.completed)
                            allCompleted = false
                    }
                }
            }
            return {
                ...state,
                sections: state.sections.map(section => {
                    if (section.id == action.sectionId && allCompleted)
                        return { ...section, completed: true };

                    return { ...section };
                })
            };
        }
        default:
            return state;
    }
}


export const getSections = () => (dispatch) => {
    sectionsListAPI.getSections().then((response) => {
        dispatch(setSections(response));
    })
}

export const setSections = (sections) => {
    return {
        type: SET_SECTIONS,
        sections
    }
}

const addSectionSuccess = () => {
    return {
        type: ADD_SECTION,
    }
}

const addLessonSuccess = (sectionId) => {
    return {
        type: ADD_LESSON,
        sectionId
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
const completeLessonSuccess = (lessonId) => {
    return {
        type: COMPLETE_LESSON,
        lessonId
    }
}
const completeSectionSuccess = (sectionId) => {
    return {
        type: COMPLETE_SECTION,
        sectionId
    }
}

//THUNKS
export const completeLesson = (lessonId, sectionId, contentType) => (dispatch) => {
    lessonAPI.completeLesson(lessonId, contentType).then();

    dispatch(completeSection(sectionId));
}

export const completeSection = (sectionId) => (dispatch) => {
    // let allCompleted = false;
    // if (allCompleted) {
    //     dispatch(completeSectionSuccess(sectionId));
    //     sectionsListAPI.completeSection(sectionId);
    // }
}

export const deleteSection = (sectionId) => (dispatch) => {
    dispatch(deleteSectionSuccess(sectionId));
    sectionsListAPI.deleteSection(sectionId).then((response) => {
        if (response.status != "ok") {

        }
    })
}

export const deleteLesson = (lessonId) => (dispatch) => {
    dispatch(deleteLessonSuccess(lessonId));

    lessonAPI.deleteLesson(lessonId).then((response) => {
        if (response.status != "ok") {

        }
    })
}

export const addSection = () => (dispatch) => {
    sectionsListAPI.addSection().then((response) => {
        if (response.status == "ok") {
            dispatch(getSections());
        }
    })
}

export const addLesson = (sectionId, contentType) => (dispatch) => {
    lessonAPI.addLesson(sectionId, contentType).then((response) => {
        if (response.status == "ok") {
            dispatch(getSections());
        }
    })
}

export const editSection = (sectionId, title) => (dispatch) => {
    dispatch(editSectionSuccess(sectionId, title));
    sectionsListAPI.editSection(sectionId, title);
}
export const editLesson = (sectionId, lessonId, title) => (dispatch) => {
    dispatch(editLessonSuccess(sectionId, lessonId, title));
    lessonAPI.editLesson(lessonId, title);
}
export default sectionsListReducer;