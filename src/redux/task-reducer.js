const SET_TASK_DATA = 'SEND-TASK-DATA';


let initialState = {
    task: {
        id: null,
        type: null,
        img: null,
        text: null,
    }
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


export default taskReducer;