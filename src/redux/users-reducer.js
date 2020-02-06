const SET_USERS_STATS = 'SET-USERS-STATS';


let initialState = {  
    stats: {}
    
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS_STATS: {
            return {
                ...state,
                stats: action.stats,
            }
        }
       
        default:
            return state;
    }
}


export const setOverallStats = (stats) => {
    return {
        type: SET_USERS_STATS,
        stats
    }
}
export default usersReducer;