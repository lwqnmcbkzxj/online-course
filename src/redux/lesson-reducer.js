import { lessonAPI, lessonElementsAPI } from '../api/api';
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
                type: action.elementType
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
                    elements: state.lesson.elements.filter(element => element.id != action.id)
                }
            };
        }
        case EDIT_ELEMENT: {
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    elements: state.lesson.elements.map(element => {
                        if (element.id == action.id)
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
                        // if (element.position == action.oldPosition)
                        //     return { ...element, position: action.newPosition };
                        // else if (element.position == action.newPosition)
                        //     return { ...element, position: action.oldPosition };

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
    lessonAPI.getLesson(lessonId).then((response) => {
        dispatch(setLesson(response));
        dispatch(setCurrentLessonId(lessonId));
    })    
}

export const setLesson = (lesson) => {
    return {
        type: SET_LESSON,
        lesson
    }
}

const addElementSuccess = (elementType) => {
    return {
        type: ADD_ELEMENT,        
        elementType
    }
}
const deleteElementSuccess = (id) => {
    return {
        type: DELETE_ELEMENT,
        id
    }
}
const editElementSuccess = (id, data) => {
    return {
        type: EDIT_ELEMENT,
        id,
        data
    }
}


export const addElement = (lessonId, data, elementType) => (dispatch) => {
    dispatch(addElementSuccess(elementType));
    lessonElementsAPI.addArticleLessonElement(lessonId, data, elementType)    
}
export const deleteElement = (elementId) => (dispatch) => {
    dispatch(deleteElementSuccess(elementId));
    lessonElementsAPI.deleteArticleLessonElement(elementId);
}
export const editElement = (elementId, data, elementType) => (dispatch) => {
    dispatch(editElementSuccess(elementId,data));

    if (elementType === 0)        
        lessonElementsAPI.editArticleElementText(elementId, data);
    else
        lessonElementsAPI.editArticleElementMedia(elementId, data);        
}


export const changeElementPosition = (elementId, oldPosition, newPosition) => {
    return {
        type: CHANGE_ELEMENT_POSITION,
        elementId,
        oldPosition,
        newPosition
    }
}

export default lessonReducer;