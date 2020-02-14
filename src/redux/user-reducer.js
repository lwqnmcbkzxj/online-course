import { userAPI } from "../api/api";

const SET_USER_INFO = 'SET-USER';
const SET_USER_STATS = 'SET-STATS';


let initialState = {  
    info: { },
    stats: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_INFO: {
            return {
                ...state,
                info: {...action.info, role: 1},
            }
        }
        case SET_USER_STATS: {
            let article_count = 0;
            let task_count = 0;
            let sections_count = 0;
            for (let completedElem of action.stats.completed) {
                if (completedElem.type === 0)
                    article_count = completedElem.count;
                else if (completedElem.type === 1)
                    task_count = completedElem.count;
                else if (completedElem.type === 2)
                    sections_count = completedElem.count;  
            }  

            return {
                ...state,
                stats: {
                    ...action.stats,
                    completed: { article_count, task_count, sections_count }
                },
            }
        }
        default:
            return state;
    }
}


export const setUserInfo = (info) => {
    return {
        type: SET_USER_INFO,
        info
    }
}

export const setUserStats = (stats) => {
    return {
        type: SET_USER_STATS,
        stats
    }
}


export const getUserInfo = () => (dispatch) => {
    userAPI.getUserInfo().then((response) => {
        dispatch(setUserStats(response.stats));
        dispatch(setUserInfo(response.info));
    })    
}
export default userReducer;