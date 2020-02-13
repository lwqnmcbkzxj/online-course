
const SET_CURRENT_SECTION_ID = 'SET_CURRENT_SECTION_ID';
const SET_CURRENT_LESSON_ID = 'SET_CURRENT_LESSON_ID';

const TOGGLE_MODAL_VISIBLE = 'TOGGLE_MODAL_VISIBLE';
const SET_MODAL_FUNCTION = 'SET_MODAL_FUNCTION';
const TOGGLE_EDIT_MODE = 'TOGGLE-EDIT-MODE';



let initialState = {
    currentLessonId: 1,
    currentSectionId: 1,
    modalIsVisible: false,
    modalFunction: null,
    editMode: false,
}

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
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

        case TOGGLE_MODAL_VISIBLE: {
            return {
                ...state,
                modalIsVisible: !state.modalIsVisible
            };
        }
        case SET_MODAL_FUNCTION: {
            return {
                ...state,
                modalFunction: { func: action.func, data: action.data, text: action.text }
            };
        }
        case TOGGLE_EDIT_MODE: {
            return {
                ...state,
                editMode: action.editState
            }
        }
        default:
            return state;
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

export const toggleModalVisible = () => {
    return {
        type: TOGGLE_MODAL_VISIBLE,
    }
}

export const setModalFunction = (func, data, text) => (dispatch) => {
    dispatch(toggleModalVisible());

    dispatch({
        type: SET_MODAL_FUNCTION,
        func,
        data,
        text
    })
}


export const toggleEditMode = (editState) => {
    return {
        type: TOGGLE_EDIT_MODE,
        editState
    }
}

export default courseReducer;