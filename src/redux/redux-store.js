import { createStore, combineReducers, applyMiddleware } from "redux";

import tasksReducer from "./tasks-reducer";
import taskReducer from "./task-reducer";
import userReducer from "./user-reducer";
import usersReducer from "./users-reducer";

import courseReducer from "./course-reducer";
import sectionsListReducer from "./sectionsList-reducer";
import lessonReducer from "./lesson-reducer";
import appReducer from "./app-reducer";

import { reducer as formReducer } from "redux-form";

import thunkMiddleware from "redux-thunk"



let reducers = combineReducers({
    course: courseReducer,
    sectionsList: sectionsListReducer,
    lesson: lessonReducer,    
    tasksList: tasksReducer,

    taskPage: taskReducer,
    user: userReducer,
    users: usersReducer,
    app: appReducer,
    form: formReducer,

}); 

let store = createStore(reducers, applyMiddleware(thunkMiddleware));


export default store;

window.store = store; 