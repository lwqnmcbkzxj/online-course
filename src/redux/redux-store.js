import { createStore, combineReducers, applyMiddleware } from "redux";

import tasksReducer from "./tasks-reducer";
import taskReducer from "./task-reducer";
import userReducer from "./user-reducer";
import usersReducer from "./users-reducer";
import editReducer from "./edit-reducer";
import courseReducer from "./course-reducer";

import thunkMiddleware from "redux-thunk"



let reducers = combineReducers({
    course: courseReducer,
    tasksPage: tasksReducer,
    taskPage: taskReducer,
    user: userReducer,
    users: usersReducer,
    edit: editReducer,
}); 

let store = createStore(reducers, applyMiddleware(thunkMiddleware));


export default store;

window.store = store; 