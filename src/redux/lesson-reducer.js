import { lessonAPI } from '../api/api';
import { setCurrentLessonId } from './course-reducer';
const SET_LESSON = 'SET_LESSON';
const ADD_ELEMENT = 'ADD_ELEMENT';
const DELETE_ELEMENT = 'DELETE_ELEMENT';
const EDIT_ELEMENT = 'EDIT_ELEMENT';
const CHANGE_ELEMENT_POSITION = 'CHANGE_ELEMENT_POSITION';

let initialState = {
    lesson: {

    }
}

const lessonReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LESSON: {
            return {
                ...state,
                lesson: action.lesson
            };
        }
        case ADD_ELEMENT: {
            let newElement = {
                text: '',
                position: state.lesson.elements.length + 1,
                type: action.elemType
            }
            return {
                ...state,
                lesson: { ...state.lesson, elements: [...state.lesson.elements, newElement] }
            };
        }

        case DELETE_ELEMENT: {
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    elements: state.lesson.elements.filter(element => element.position != action.position)
                }
            };
        }
        case EDIT_ELEMENT: {
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    elements: state.lesson.elements.map(element => {
                        if (element.position == action.position)
                            return { ...action.element };

                        return element
                    })
                }
            };
        }
        case CHANGE_ELEMENT_POSITION: {
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    elements: state.lesson.elements.map(element => {
                        if (element.position == action.oldPosition)
                            return { ...element, position: action.newPosition };
                        else if (element.position == action.newPosition)
                            return { ...element, position: action.oldPosition };

                        return element
                    })
                }
            };
        }
        default:
            return state;
    }
}


export const getLesson = (lessonId) => (dispatch) => {
    var response = {
        "id": lessonId,
        "title": `TITLE + ${lessonId}`,
        "elements": [
            {
                "text": `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
                "media": null,
                "type": "2",
                "position": 1
            },
            {
                "text": "Egyptian Music",
                "media": "https://avatars.mds.yandex.net/get-zen_doc/1056701/pub_5d1d190224e56600ad2b5699_5d1d19621fd98a00ad4d2da6/scale_1200",
                "type": "1",
                "position": 2
            },
            {
                "text": "Заголовок для видео",
                "media": "https://www.youtube.com/watch?v=2lAe1cqCOXo",
                "type": "0",
                "position": 3
            },
            {
                "text": "Привет там",
                "media": `veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
                "type": "2",
                "position": 4
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

export const setLesson = (lesson) => {
    return {
        type: SET_LESSON,
        lesson
    }
}

export const addElement = (lessonId, elemType) => {
    return {
        type: ADD_ELEMENT,
        elemType
    }
}

export const deleteElement = (lessonId, position) => {
    return {
        type: DELETE_ELEMENT,
        position
    }
}
export const editElement = (lessonId, position, element) => {
    return {
        type: EDIT_ELEMENT,
        position,
        element
    }
}

export const changeElementPosition = (lessonId, oldPosition, newPosition) => {
    return {
        type: CHANGE_ELEMENT_POSITION,
        oldPosition,
        newPosition
    }
}

export default lessonReducer;