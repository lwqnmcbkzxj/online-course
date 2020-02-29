import { lessonAPI, articleElementsAPI, taskElementsAPI } from '../api/api';
import { setCurrentLessonId } from './course-reducer';
import { getSections } from './sectionsList-reducer';

import alertify from "alertifyjs";
alertify.set('notifier', 'position', 'top-right');

const SET_LESSON = 'SET_LESSON';
const ADD_ELEMENT = 'ADD_ELEMENT';
const DELETE_ELEMENT = 'DELETE_ELEMENT';

const EDIT_ELEMENT_TEXT = 'EDIT_ELEMENT_TEXT';
const EDIT_ELEMENT_MEDIA = 'EDIT_ELEMENT_MEDIA';
const EDIT_TASK_QUIZ = 'EDIT_ELEMENEDIT_TASK_QUIZT_MEDIA';

const CHANGE_ELEMENT_POSITION = 'CHANGE_ELEMENT_POSITION';

const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    lesson: {},
    lessonIsFetching: false
}

const lessonReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LESSON: {
            let elements = action.lesson.elements;
            elements = elements && elements.sort((prev, next) => prev.lesson_position - next.lesson_position)
            return {
                ...state,
                lesson: { ...action.lesson, elements }
            };
        }

        case ADD_ELEMENT: {
            let newElement = {
                text: '',
                position: state.lesson.elements.length + 1,
                type: action.elementType,
                json_quiz_options: action.data[0],
                json_quiz_answers: action.data[1],
                is_answer: action.isAnswer
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
                            return { ...element, json_quiz_options: action.data[0], json_quiz_answers: action.data[1] };


                        return element;
                    })
                }
            };
        }
        case CHANGE_ELEMENT_POSITION: {
            let elements = state.lesson.elements.map(element => {
                if (element.lesson_position === action.oldPosition)
                    return { ...element, lesson_position: action.newPosition };
                else if (element.lesson_position === action.newPosition)
                    return { ...element, lesson_position: action.oldPosition };

                return element
            })

            elements = elements.sort((prev, next) => prev.lesson_position - next.lesson_position)
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    elements: elements
                }
            };
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                lessonIsFetching: action.isFetching
            }
        }

        default:
            return state;
    }
}

export const getLesson = (lessonId) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    lessonAPI.getLesson(lessonId).then((response) => {
        dispatch(setLesson(response));
        dispatch(setCurrentLessonId(lessonId));
        dispatch(toggleIsFetching(false));

        return response;
    })
}

export const setLesson = (lesson) => {
    return {
        type: SET_LESSON,
        lesson
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

export const addElement = (lessonId, elementType, lessonType, isAnswer) => (dispatch) => {
    // dispatch(addElementSuccess(elementType, '', isAnswer));

    if (lessonType === 0) {
        articleElementsAPI.addArticleElement(lessonId, elementType).then((response) => {
            if (response.status === "ok") {
                dispatch(getLesson(lessonId));
                alertify.success("Element added");
            } else alertify.error("Failed to add element");
        });
    } else {
        taskElementsAPI.addTaskElement(lessonId, elementType, '', isAnswer).then(response => {
            if (response.status === "ok") {
                dispatch(getLesson(lessonId));
                alertify.success("Element added");
            } else alertify.error("Failed to add element");
        });
    }

}

export const addTaskElement = (lessonId, elementType, data) => (dispatch) => {
    // dispatch(addElementSuccess(elementType, data));    
    taskElementsAPI.addTaskElement(lessonId, elementType, data).then(response => {
        if (response.status === "ok") {
            dispatch(getLesson(lessonId))
            alertify.success("Element added");
        } else
            alertify.error("Failed to add element");
    });;
}
export const deleteElement = (lessonId, elementId, lessonType) => (dispatch) => {
    dispatch(deleteElementSuccess(elementId));
    dispatch(toggleIsFetching(true));

    if (lessonType === 0)
        articleElementsAPI.deleteArticleElement(elementId).then(response => {
            if (response.status === "ok") {
                dispatch(getLesson(lessonId));
                alertify.success('Element deleted');
            }
            else alertify.error("Failed to delete element");
        });
    else
        taskElementsAPI.deleteTaskElement(elementId).then(response => {
            if (response.status === "ok") {
                dispatch(getLesson(lessonId));
                alertify.success('Element deleted');
            }
            else alertify.error("Failed to delete element");
        });
    
}
export const editElement = (elementId, data, elementType, lessonType) => (dispatch) => {
    let status = '';
    if (elementType === 0) {
        dispatch(editElementTextSuccess(elementId, data));

        if (lessonType === 0)
            articleElementsAPI.editArticleElementText(elementId, data).then(response => showAlertify(response.status));
        else
            taskElementsAPI.editTaskElementText(elementId, data).then(response => showAlertify(response.status));
    } else if (elementType === 3) {
        dispatch(editElementQuizSuccess(elementId, data));
        taskElementsAPI.editTaskQuiz(elementId, data).then(response => showAlertify(response.status));
    } else {
        dispatch(editElementMediaSuccess(elementId, data));

        if (lessonType === 0)
            articleElementsAPI.editArticleElementMedia(elementId, data).then(response => showAlertify(response.status));
        else
            taskElementsAPI.editTaskElementMedia(elementId, data).then(response => showAlertify(response.status));
    }

    const showAlertify = (status) => {
        if (status === "ok")
            alertify.success('Element edited');
        else
            alertify.error("Failed to edit element");
    }

}
export const likeLesson = (lessonId) => (dispatch) => {
    lessonAPI.likeLesson(lessonId);
}
const changeElementPositionSuccess = (oldPosition, newPosition) => {
    return {
        type: CHANGE_ELEMENT_POSITION,
        oldPosition,
        newPosition
    }
}

export const changeElementPosition = (oldPosition, newPosition, objectType, foreignId) => (dispatch) => {
    if (objectType === 0)
        objectType = 'article';
    else if (objectType === 1)
        objectType = 'task';
    lessonAPI.changeElementPosition(oldPosition, newPosition, objectType, foreignId).then(response => {
        if (response.status === "ok") {
            dispatch(changeElementPositionSuccess(oldPosition, newPosition));
            alertify.success('Element position changed');
        } else
            alertify.error('Failer to change element position');
    });
}

export const togglePublish = (lessonId, sectionId, type) => (dispatch) => {
    let id = 0;
    if (type === 'section')
        id = sectionId;
    else if (type === 'lesson')
        id = lessonId;

    lessonAPI.changePublishStatus(id, type).then((response) => {
        if (response.status === "ok") {
            dispatch(getSections());
            dispatch(getLesson(lessonId));
            alertify.success('Publish status changed');
        } else
            alertify.error('Failed to change publish status');
    })
}

const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}

export default lessonReducer;