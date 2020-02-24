import { userAPI } from "../api/api";
import { setToken } from "../api/api"
import Cookies from "js-cookie";
import { stopSubmit } from 'redux-form';


const SET_USER_INFO = 'SET-USER';
const SET_USER_STATS = 'SET-STATS';
const SET_USER_TOKEN = 'SET_USER_TOKEN';
const SET_USER_LOGGED = 'SET_USER_LOGGED';


let initialState = {
    info: {},
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
            if (action.stats) {
                for (let completedElem of action.stats.completed) {
                    let ids = JSON.parse(completedElem.ids);
                    if (completedElem.type === 0)
                        articleIds = ids;
                    else if (completedElem.type === 1)
                        tasksIds = ids;
                    else if (completedElem.type === 2)
                        sectionsIds = ids;
                }
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
    return userAPI.getUserInfo().then((response) => {
        dispatch(setUserStats(response.stats));
        dispatch(setUserInfo(response.info));
    })
}


export const login = (email, password) => (dispatch) => {
    userAPI.login(email, password).then((response) => {
        debugger

        if (response.token) {  
            Cookies.set('token', response.token, { expires: 10 / 24 });
            dispatch(authUser());
        } else if (response.error === "Invalid credentials") {
            dispatch(stopSubmit("login", { _error: "Incorrect email or password" }))
        }
    })
}
export const authUser = () => (dispatch) => {    
    if (Cookies.get('token')) {
        let token = Cookies.get('token');
        setToken(token);
        dispatch(setUserToken(token));
        dispatch(getUserInfo());
        dispatch(setUserLogged(true));
    }
}


export const register = (login, email, password) => (dispatch) => {
    userAPI.register(login, email, password).then(response => {
        if (response.error === "already exists") {
            dispatch(stopSubmit("register", { _error: "User with that login or email already exists" }))            
        }
    })
}

export const logout = () => (dispatch) => {
    setToken("");
    dispatch(setUserLogged(false));
    dispatch(setUserToken(""));
    Cookies.remove('token');
    dispatch(setUserInfo({}));
    dispatch(setUserStats(null));
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