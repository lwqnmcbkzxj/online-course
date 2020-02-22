import { getSections } from "./sectionsList-reducer";
import { getUserInfo } from "./user-reducer";

const SET_INITIALIZED = 'SET_INITIALIZED';
const SET_FIRST_NOTCOMPLETED_LESSON_ID = 'SET_FIRST_NOTCOMPLETED_LESSON_ID';
const SET_START_PAGENAME = 'SET_START_PAGENAME';

let initialState = {
    initialized: false,
    startPageName: ''
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED: {
            return {
                ...state,
                initialized: action.initialized
            }
        }
        case SET_FIRST_NOTCOMPLETED_LESSON_ID: {
            return {
                ...state,
                firstNotCompletedLessonId: action.lessonId
            }
        }
        case SET_START_PAGENAME: {
            debugger
            return {
                ...state,
                startPageName: action.pageName
            }
        }
        default:
            return state;
    }
}

export const initApp = () => (dispatch, getState) => {
    let getSects = dispatch(getSections());
    let getUserStat = dispatch(getUserInfo());
    return Promise.all([getSects, getUserStat])
        .then(() => {
            let state = getState();
            let completedSectionsIds = state.user.completedSectionsIds;
            let completedLessonsIds = state.user.completedLessonsIds;
            let sections = state.sectionsList.sections;


            for (let i = 0; i < sections.length; i++) {
                if (!completedSectionsIds.some(id => +id === +sections[i].id)) {
                    let lessons = sections[i].lessons;
                    for (let j = 0; j < lessons.length; j++) {
                        if (!completedLessonsIds.some(id => +id === +lessons[j].id)) {
                            dispatch(setFirstNotCompletedLessonId(+lessons[j].id));
                            dispatch(initializedSuccess(true));
                            return +lessons[j].id;
                        }
                    }
                }
            }
        });
}

export const setFirstNotCompletedLessonId = (lessonId) => {
    return {
        type: SET_FIRST_NOTCOMPLETED_LESSON_ID,
        lessonId
    }
}
export const initializedSuccess = (initialized) => {
    return {
        type: SET_INITIALIZED,
        initialized
    }
}

export const setStartPagename = (pageName) => {
    return {
        type: SET_START_PAGENAME,
        pageName
    }
}
export default appReducer;