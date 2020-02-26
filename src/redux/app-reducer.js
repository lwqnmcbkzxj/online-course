import { getSections } from "./sectionsList-reducer";
import { getUserInfo } from "./user-reducer";
import { getFirstNotCompletedLessonId } from "./course-reducer";

const SET_INITIALIZED = 'SET_INITIALIZED';
const SET_START_PAGENAME = 'SET_START_PAGENAME';

let initialState = {
    initialized: false,
    startPageName: '',
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED: {
            return {
                ...state,
                initialized: action.initialized
            }
        }
       
        case SET_START_PAGENAME: {
            return {
                ...state,
                startPageName: action.pageName
            }
        }
        default:
            return state;
    }
}

export const initApp = () => (dispatch) => {
    let getSects = dispatch(getSections());
    let getUserStat = dispatch(getUserInfo());
    return Promise.allSettled([getSects, getUserStat])
        .then(() => {
            dispatch(getFirstNotCompletedLessonId());       
            dispatch(initializedSuccess(true));            
        });
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