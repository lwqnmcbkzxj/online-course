const SET_CURRENT_SECTION_ID = 'SET_CURRENT_SECTION_ID';
const SET_CURRENT_LESSON_ID = 'SET_CURRENT_LESSON_ID';

const TOGGLE_MODAL_VISIBLE = 'TOGGLE_MODAL_VISIBLE';
const SET_MODAL_FUNCTION = 'SET_MODAL_FUNCTION';
const TOGGLE_EDIT_MODE = 'TOGGLE-EDIT-MODE';

const SET_FIRST_NOTCOMPLETED_LESSON_ID = 'SET_FIRST_NOTCOMPLETED_LESSON_ID';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_ADDED_LESSON_ID = 'SET_ADDED_LESSON_ID';
const SET_FIRST_VIDEO_URL = 'SET_FIRST_VIDEO_URL';


let initialState = {
    currentLessonId: 1,
    currentSectionId: 1,
    modalIsVisible: false,
    modalFunction: null,
    editMode: false,
    firstNotCompletedLessonId: 1,
    isFetching: false,
    addedLessonId: 1,
    firstVideo: ''
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
        case SET_FIRST_NOTCOMPLETED_LESSON_ID: {
            return {
                ...state,
                firstNotCompletedLessonId: action.lessonId
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case SET_ADDED_LESSON_ID: {
            return {
                ...state,
                addedLessonId: +action.lessonId
            }
        }
        case SET_FIRST_VIDEO_URL: {

            let videoID = '';
            let url = action.url;
            if (url.includes('watch'))
                videoID = url.split('/')[3].split('=')[1];
            else if (url.includes('embed'))
                videoID = url.split('/')[4];

            videoID = videoID !== '' ? "https://www.youtube.com/embed/" + videoID : "";

            return {
                ...state,
                firstVideo: videoID
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


const setFirstNotCompletedLessonId = (lessonId) => {
    return {
        type: SET_FIRST_NOTCOMPLETED_LESSON_ID,
        lessonId
    }
}

export const getFirstNotCompletedLessonId = () => (dispatch, getState) => {
    let state = getState();
    let completedSectionsIds = state.user.completedSectionsIds;
    let completedLessonsIds = state.user.completedLessonsIds;
    let sections = state.sectionsList.sections;


    for (let i = 0; i < sections.length; i++) {
        if (!completedSectionsIds.some(id => +id === +sections[i].id)) {
            let lessons = sections[i].lessons;
            for (let j = 0; j < lessons.length; j++) {
                if (!completedLessonsIds.some(id => +id === +lessons[j].id) && lessons[j].publish) {
                    dispatch(setFirstNotCompletedLessonId(+lessons[j].id));
                    dispatch(setCurrentLessonId(+lessons[j].id));

                    return +lessons[j].id;
                }
            }
        }
    }
}

export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}

const setAddedLessonIdSuccess = (lessonId) => {
    return {
        type: SET_ADDED_LESSON_ID,
        lessonId
    }
}
const setAddedLessonId = (response) => (dispatch) => {
    let maxId = 1;

    let sections = response;
    sections.map(section => {
        section.lessons.map(lesson => {
            if (+lesson.id > maxId)
                maxId = +lesson.id;
        })
        dispatch(setAddedLessonIdSuccess(maxId));
    })
}

const setFirstVideoSuccess = (url) => {
    return {
        type: SET_FIRST_VIDEO_URL,
        url
    }
}
const setFirstVideo = (response) => (dispatch) => {    
    dispatch(setFirstVideoSuccess("https://www.youtube.com/watch?v=uD4izuDMUQA"));
     
}

export const setCourseInfo = (response) => (dispatch) => {
    dispatch(setAddedLessonId(response));
    dispatch(setFirstVideo(response));
}
export default courseReducer;