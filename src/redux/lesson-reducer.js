import { lessonAPI, articleElementsAPI, taskElementsAPI } from '../api/api';
import { setCurrentLessonId } from './course-reducer';
const SET_LESSON = 'SET_LESSON';
const ADD_ELEMENT = 'ADD_ELEMENT';
const DELETE_ELEMENT = 'DELETE_ELEMENT';

const EDIT_ELEMENT_TEXT = 'EDIT_ELEMENT_TEXT';
const EDIT_ELEMENT_MEDIA = 'EDIT_ELEMENT_MEDIA';
const EDIT_TASK_QUIZ = 'EDIT_ELEMENEDIT_TASK_QUIZT_MEDIA';

const CHANGE_ELEMENT_POSITION = 'CHANGE_ELEMENT_POSITION';

let initialState = {
    lesson: {}
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
                type: action.elementType,
                json_quiz_options: action.data[0],
                json_quiz_answers: action.data[1],
            }
            return {
                ...state,
                lesson: {
                    ...state.lesson, elements: [...state.lesson.elements, newElement],
                    

                }
            };
        }

        case DELETE_ELEMENT: {
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    elements: state.lesson.elements.filter(element => +element.id !== +action.id)
                }
            };
        }
        case EDIT_ELEMENT_TEXT: {
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    elements: state.lesson.elements.map(element => {
                        if (+element.id === +action.id)
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
                        if (+element.id === +action.id)
                            return { ...element, media: action.media };

                        return element;
                    })
                }
            };
        }
        case EDIT_TASK_QUIZ: {
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    elements: state.lesson.elements.map(element => {
                        if (+element.id === +action.id) 
                            return  { ...element, json_quiz_options: action.data[0],  json_quiz_answers: action.data[1] };
                        

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
        return response;
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
const addElementSuccess = (elementType, data = "") => {
    return {
        type: ADD_ELEMENT,
        elementType,
        data
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
const editElementQuizSuccess = (id, data) => {
    return {
        type: EDIT_TASK_QUIZ,
        id,
        data
    }
}
export const addElement = (lessonId, elementType, lessonType) => (dispatch) => {
    dispatch(addElementSuccess(elementType));

    if (lessonType === 0)
        articleElementsAPI.addArticleElement(lessonId, elementType);
    else
        taskElementsAPI.addTaskElement(lessonId, elementType);

}

export const addTaskElement = (lessonId, elementType, data) => (dispatch) => {
    dispatch(addElementSuccess(elementType, data));
    
    taskElementsAPI.addTaskElement(lessonId, elementType, data);
}
export const deleteElement = (elementId, lessonType) => (dispatch) => {
    dispatch(deleteElementSuccess(elementId));

    if (lessonType === 0)
        articleElementsAPI.deleteArticleElement(elementId);
    else
        taskElementsAPI.deleteTaskElement(elementId);
}
export const editElement = (elementId, data, elementType, lessonType) => (dispatch) => {
    debugger
    if (elementType === 0) {
        dispatch(editElementTextSuccess(elementId, data));

        if (lessonType === 0)
            articleElementsAPI.editArticleElementText(elementId, data);
        else
            taskElementsAPI.editTaskElementText(elementId, data);
    }
    else if (elementType === 3) {
        dispatch(editElementQuizSuccess(elementId, data));
        taskElementsAPI.editTaskQuiz(elementId, data);        
    }
    else {
        dispatch(editElementMediaSuccess(elementId, data));

        if (lessonType === 0)
            articleElementsAPI.editArticleElementMedia(elementId, data);
        else
            taskElementsAPI.editTaskElementMedia(elementId, data);
    }
}

// export const addTaskElement = (lessonId, elementType) => (dispatch) => {
//     dispatch(addElementSuccess(elementType));
//     taskElementsAPI.addTaskElement(lessonId, elementType);
// }
// export const deleteTaskElement = (elementId) => (dispatch) => {
//     dispatch(deleteElementSuccess(elementId));
//     taskElementsAPI.deleteTaskElement(elementId);   

// }
// export const editTaskElement = (elementId, data, elementType) => (dispatch) => {
//     if (elementType === 0) {
//         dispatch(editElementTextSuccess(elementId, data));
//         taskElementsAPI.editTaskElementText(elementId, data);        
//     }    
//     else {
//         dispatch(editElementMediaSuccess(elementId, data));
//         taskElementsAPI.editTaskElementMedia(elementId, data); 
//     }
// }



export const changeElementPosition = (elementId, oldPosition, newPosition) => {
    return {
        type: CHANGE_ELEMENT_POSITION,
        elementId,
        oldPosition,
        newPosition
    }
}

export default lessonReducer;