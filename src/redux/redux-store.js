import { createStore, combineReducers, applyMiddleware } from "redux";

import lessonReducer from "./lesson-reducer";
import sectionsReducer from "./sections-reducer";
import tasksReducer from "./tasks-reducer";
import taskReducer from "./task-reducer";
import userReducer from "./user-reducer";
import usersReducer from "./users-reducer";
import editReducer from "./edit-reducer";
import courseReducer from "./course-reducer";

import thunkMiddleware from "redux-thunk"



let reducers = combineReducers({
    lessonPage: lessonReducer,
    sections: sectionsReducer,
    tasksPage: tasksReducer,
    taskPage: taskReducer,
    user: userReducer,
    users: usersReducer,
    edit: editReducer,
    course: courseReducer
}); 

let store = createStore(reducers, applyMiddleware(thunkMiddleware));


export default store;

window.store = store; 