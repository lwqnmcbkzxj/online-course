import { lessonsAPI } from '../api/api';
import { sectionsAPI } from '../api/api';


const SET_LESSON = 'SET_LESSON';
const SET_CURRENT_LESSON_ID = 'SET_CURRENT_LESSON_ID';
const SET_SECTIONS = 'SET_SECTIONS_DATA';
const SET_CURRENT_SECTION_ID = 'SET_CURRENT_SECTION_ID';
const DELETE_LESSON = 'DELETE_LESSON';
const EDIT_LESSON = 'EDIT_LESSON';
const ADD_SECTION = 'ADD_SECTION';
const ADD_LESSON = 'ADD_LESSON';



let initialState = {
    sections: [],
    lesson: { },
    currentLessonId: 1,
    currentSectionId: 1
}

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SECTIONS: {

            return {
                ...state,
                sections: action.sections,
            }
        }

        case SET_LESSON: {
            return {
                ...state,
                lesson: action.lesson
            };
        }
           
            
        case SET_CURRENT_SECTION_ID: {
            return {
                ...state,
                currentSectionId: action.sectionId,
            }
        }
            
        case SET_CURRENT_LESSON_ID: {
            return {
                ...state,
                currentLessonId: +action.lessonId
            };
        }
        
        case ADD_SECTION: {
            let maxId = 0;
            for (let section of state.sections) {
                if (section.id > maxId)
                    maxId = section.id
            }

            let newSection = {
                id: maxId + 1,
                title: action.section.title,
                lessons: []
            }

            return {
                ...state,
                sections: [...state.sections, newSection]
            };
        }
        case ADD_LESSON: {
            // let maxId = 0;
            // for (let section of state.sections) {
            //     if (section.id > maxId)
            //         maxId = section.id
            // }
            //нужен section.id
            let newLesson = {
                id: 1,
                
            }

            return {
                ...state,
                // sections: [...state.sections, newSection]
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
                    "content_type": 0
                },
                {
                    "title": "Lecture on Greece",
                    "id": 2,
                    "section_position": 2,
                    "content_type": 0
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
                    "content_type": 1
                },
                {
                    "title": "2",
                    "id": 7,
                    "section_position": 2,
                    "content_type": 0
                }
            ]
        },        
    ]
    dispatch(setSections(response));


    // sectionsAPI.getSections().then((response) => {
    //     dispatch(setSections(response));
    // })    
}
export const getLesson = (lessonId) => (dispatch) => {
    var response = {
        "id": lessonId,
        "title":'abc',
        "elements": [
            {
                "text": "\"Ancient Egypt was famous for physics\"",
                "media": null
            },
            {
                "text": "Egyptian Music",
                "media": null
            },
            {
                "text": null,
                "media": "https:\/\/youtube.com"
            },
            {
                "text": "Привет там",
                "media": null
            }
        ]
    }
    dispatch(setLesson(response));
    dispatch(setCurrentLessonId(lessonId));


    // lessonsAPI.getLesson(lessonId).then((response) => {
    //     dispatch(setLesson(response));
    //     dispatch(setCurrentLesson(lessonId));
    // })    
}

export const setSections = (sections) => {
    return {
        type: SET_SECTIONS,
        sections
    }
}
export const setLesson = (lesson) => {
    return {
        type: SET_LESSON,
        lesson
    }
}



export const addSection = (section) => {
    //Запрос на сервер ----
    return {
        type: ADD_SECTION,
        section
    }
}



export const setCurrentSectionId = (sectionId) => {
    return {
        type: SET_CURRENT_SECTION_ID,
        sectionId
    }
}

export const setCurrentLessonId = (lessonId) => {
    return {
        type: SET_CURRENT_LESSON_ID,
        lessonId
    }
}

export const addLesson = (lesson) => {
    return {
        type: ADD_LESSON,
        lesson
    }
}




export default courseReducer;