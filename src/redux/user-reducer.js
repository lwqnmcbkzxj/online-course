import { userAPI } from "../api/api";
import { setToken } from "../api/api"
const SET_USER_INFO = 'SET-USER';
const SET_USER_STATS = 'SET-STATS';
const SET_USER_TOKEN = 'SET_USER_TOKEN';
const SET_USER_LOGGED = 'SET_USER_LOGGED';


let initialState = {  
    info: { },
    stats: null,
    completedLessonsIds: [],
    completedSectionsIds: [],    
    token: "",
    logged: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_INFO: {
            return {
                ...state,
                info: action.info,
            }
        }
        case SET_USER_STATS: {           
            let articleIds = [];
            let tasksIds = [];
            let sectionsIds = [];
            for (let completedElem of action.stats.completed) {
                let ids = JSON.parse(completedElem.ids);
                let count = completedElem.count;
                if (completedElem.type === 0)
                    articleIds = ids;
                else if (completedElem.type === 1) 
                    tasksIds = ids;
                else if (completedElem.type === 2) 
                    sectionsIds = ids; 
            }  

            return {
                ...state,
                stats: {
                    ...action.stats,
                    completed: {
                        article_count: articleIds.length,
                        task_count: tasksIds.length,
                        sections_count: sectionsIds.length
                    }
                },
                completedSectionsIds: sectionsIds,
                completedLessonsIds: [...articleIds, ...tasksIds],                
            }
        }
        case SET_USER_INFO: {
            return {
                ...state,
                token: action.token,
            }
        } 
        case SET_USER_LOGGED: {
            return {
                ...state, 
                logged: action.logged
            }
        }
        case SET_USER_TOKEN: {
            return {
                ...state, 
                token: action.token
            }
        }
        default:
            return state;
    }
}


const setUserInfo = (info) => {
    return {
        type: SET_USER_INFO,
        info
    }
}

const setUserStats = (stats) => {
    return {
        type: SET_USER_STATS,
        stats
    }
}

const setUserLogged = (logged) => {
    return {
        type: SET_USER_LOGGED,
        logged
    }
}
const setUserToken = (token) => {
    return {
        type: SET_USER_TOKEN,
        token
    } 
}

export const getUserInfo = () => (dispatch) => {
    dispatch(setUserToken())
    userAPI.getUserInfo().then((response) => {
        dispatch(setUserStats(response.stats));
        dispatch(setUserInfo(response.info));
        return 's';
    })    
}


export const login = (email, password) => (dispatch) => {
    userAPI.login(email, password).then((response) => {
        if (response.token) {
            setToken(response.token);

            dispatch(setUserLogged(setUserLogged))
            dispatch(setUserToken(response.token));
            dispatch(getUserInfo());
        }            
    })    
}

export const register = (login, email, password) => (dispatch) => {
    userAPI.register(login, email, password)    
}

export const logout = () => (dispatch) => {
    userAPI.logout().then((response) => {
        if (response.token) {
            
        }            
    })    
}


export const changePassword = (password) => (dispatch) => {
    userAPI.changePassword(password).then((response) => {
                 
    })    
}
export const changeEmail = () => (dispatch) => {
    userAPI.changeEmail().then((response) => {
                 
    })    
}
export default userReducer;