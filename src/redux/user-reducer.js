const SET_USER = 'SET-USER';
const SET_STATS = 'SET-STATS';


let initialState = {  
    info: {
        isAdmin: true,
    },
    stats: {}
    
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                info: action.info,
            }
        }
        case SET_STATS: {
            return {
                ...state,
                stats: action.stats,
            }
        }
        default:
            return state;
    }
}


export const setUser = (info) => {
    return {
        type: SET_USER,
        info
    }
}

export const setStats = (stats) => {
    return {
        type: SET_USER,
        stats
    }
}
export default userReducer;