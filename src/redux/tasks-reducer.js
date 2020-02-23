import { toggleIsFetching } from "./course-reducer"
import { tasksAPI } from "../api/api";
const SET_TASKS = 'SET_TASKS';


let initialState = {
    tasks: [],
}

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASKS: {
            return {
                ...state,
                tasks: action.tasks,
            }
        }
        default:
            return state;
    }
}


export const setTasks = (tasks) => {
    return {
        type: SET_TASKS,
        tasks
    }
}


export const getTasks = () => (dispatch) => {
    dispatch(toggleIsFetching(true));
    tasksAPI.getTasks().then((response) => {
        dispatch(setTasks(response));
        dispatch(toggleIsFetching(false));
    })
}
export default tasksReducer;