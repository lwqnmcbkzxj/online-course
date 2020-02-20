import { tasksAPI } from "../api/api";

const SET_TASK_DATA = 'SEND-TASK-DATA';


let initialState = {
    task: { }
}

const taskReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_TASK_DATA: {
            return {
                ...state,
                task: action.task
            };
        }

        default:
            return state;
    }
} 


export const setTask = (task) => {
    return {
        type: SET_TASK_DATA,
        task
    }
}



export const getTask = (taskId) => (dispatch) => {
    tasksAPI.getTask(taskId).then((response) => {
        dispatch(setTask(response));
        return response;
    })
}

export default taskReducer;