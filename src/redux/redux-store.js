import { createStore, combineReducers, applyMiddleware } from "redux";

import tasksReducer from "./tasks-reducer";
import userReducer from "./user-reducer";
import usersReducer from "./users-reducer";

import courseReducer from "./course-reducer";
import sectionsListReducer from "./sectionsList-reducer";
import lessonReducer from "./lesson-reducer";
import appReducer from "./app-reducer";

import { reducer as formReducer } from "redux-form";

import thunkMiddleware from "redux-thunk";


let reducers = combineReducers({
    course: courseReducer,
    app: appReducer,
    sectionsList: sectionsListReducer,
    tasksList: tasksReducer,
    lesson: lessonReducer,    
    user: userReducer,
    users: usersReducer,
    form: formReducer,
}); 

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;

window.store = store; 