import { lessonAPI, lessonElementsAPI } from '../api/api';
import { setCurrentLessonId } from './course-reducer';
const SET_LESSON = 'SET_LESSON';
const ADD_ELEMENT = 'ADD_ELEMENT';
const DELETE_ELEMENT = 'DELETE_ELEMENT';
const EDIT_ELEMENT_TEXT = 'EDIT_ELEMENT_TEXT';
const EDIT_ELEMENT_MEDIA = 'EDIT_ELEMENT_MEDIA';
const CHANGE_ELEMENT_POSITION = 'CHANGE_ELEMENT_POSITION';

let initialState = {
    lesson: { }
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
        case EDIT_ELEMENT_TEXT: {
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    elements: state.lesson.elements.map(element => {
                        if (element.id == action.id)
                            return { ...element, text: action.text };

                        return element
                    })
                }
            };
        }
            
        case EDIT_ELEMENT_MEDIA: {
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    elements: state.lesson.elements.map(element => {
                        if (element.id == action.id)                            
                            return { ...element, media: action.media };

                        return element;
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

// export const editLesson = (lessonId, title) => (dispatch) => {
//     dispatch(editLessonSuccess(title));
//     lessonAPI.editLesson(lessonId, title)    
// }

// const editLessonSuccess = (title) => {
//     return {
//         type: EDIT_LESSON,        
//         title
//     }
// }
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
const editElementTextSuccess = (id, text) => {
    return {
        type: EDIT_ELEMENT_TEXT,
        id,
        text
    }
}
const editElementMediaSuccess = (id, media) => {
    return {
        type: EDIT_ELEMENT_MEDIA,
        id,
        media
    }
}

export const addElement = (lessonId, elementType) => (dispatch) => {
    dispatch(addElementSuccess(elementType));
    lessonElementsAPI.addArticleLessonElement(lessonId, elementType)    
}
export const deleteElement = (elementId) => (dispatch) => {
    dispatch(deleteElementSuccess(elementId));
    lessonElementsAPI.deleteArticleLessonElement(elementId);
}
export const editElement = (elementId, data, elementType) => (dispatch) => {
    if (elementType === 0) {
        dispatch(editElementTextSuccess(elementId, data));
        lessonElementsAPI.editArticleElementText(elementId, data);        
    }    
    else {
        dispatch(editElementMediaSuccess(elementId, data));
        lessonElementsAPI.editArticleElementMedia(elementId, data);       
        
    }
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