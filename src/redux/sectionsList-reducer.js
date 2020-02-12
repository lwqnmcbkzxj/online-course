import { sectionsAPI } from '../api/api';

const SET_SECTIONS = 'SET_SECTIONS_DATA';

const ADD_SECTION = 'ADD_SECTION';
const ADD_LESSON = 'ADD_LESSON';

const DELETE_LESSON = 'DELETE_LESSON';
const DELETE_SECTION = 'DELETE_SECTION';

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
            for (let section of state.sections) {
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
    let response = [
        {
            "id": 1,
            "title": "Section 1 intro",
            "lessons": [
                {
                    "title": "Lecture on Egypt",
                    "id": 1,
                    "section_position": 1,
                    "content_type": 0,
                    "completed": false
                },
                {
                    "title": "Lecture on Greece",
                    "id": 2,
                    "section_position": 2,
                    "content_type": 0,
                    "completed": false
                }
            ]
        },
        {
            "id": 3,
            "title": "Section 3 Experimental Physics",
            "lessons": [
                {
                    "title": "Task 5",
                    "id": 4,
                    "section_position": 1,
                    "content_type": 1,
                    "completed": false

                },
                {
                    "title": "2",
                    "id": 7,
                    "section_position": 2,
                    "content_type": 0,
                    "completed": false

                }
            ]
        },
    ]
    dispatch(setSections(response));


    // sectionsAPI.getSections().then((response) => {
    //     dispatch(setSections(response));
    // })    
}

export const setSections = (sections) => {
    return {
        type: SET_SECTIONS,
        sections
    }
}

export const addSection = () => {
    return {
        type: ADD_SECTION,
    }
}

export const addLesson = (sectionId) => {
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
export const completeLesson = (lessonId, sectionId) => (dispatch) => {
    dispatch(completeLessonSuccess(lessonId));
    dispatch(completeSection(sectionId));

    //Запрос
}

export const completeSection = (sectionId) => (dispatch) => {
    dispatch(completeSectionSuccess(sectionId));

    //Запрос
}


export const deleteSection = (sectionId) => (dispatch) => {
    dispatch(deleteSectionSuccess(sectionId));

    //Запрос
}


export const deleteLesson = (lessonId) => (dispatch) => {
    dispatch(deleteLessonSuccess(lessonId));

    //Запрос
}



export default sectionsListReducer;