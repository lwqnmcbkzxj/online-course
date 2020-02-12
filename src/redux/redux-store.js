import { createStore, combineReducers, applyMiddleware } from "redux";

import tasksReducer from "./tasks-reducer";
import taskReducer from "./task-reducer";
import userReducer from "./user-reducer";
import usersReducer from "./users-reducer";

import courseReducer from "./course-reducer";
import sectionsListReducer from "./sectionsList-reducer";
import lessonReducer from "./lesson-reducer";


import thunkMiddleware from "redux-thunk"



let reducers = combineReducers({
    course: courseReducer,
    sectionsList: sectionsListReducer,
    lesson: lessonReducer,
    
    tasksPage: tasksReducer,
    taskPage: taskReducer,
    user: userReducer,
    users: usersReducer,
}); 

let store = createStore(reducers, applyMiddleware(thunkMiddleware));


export default store;

window.store = store; 