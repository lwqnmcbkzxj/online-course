import { createStore, combineReducers } from "redux";

import lessonReducer from "./lesson-reducer";
import sectionsReducer from "./sections-reducer";
import tasksReducer from "./tasks-reducer";
import taskReducer from "./task-reducer";
import userReducer from "./user-reducer";
import usersReducer from "./users-reducer";




let reducers = combineReducers({
    lessonPage: lessonReducer,
    sectionsPage: sectionsReducer,
    tasksPage: tasksReducer,
    taskPage: taskReducer,
    user: userReducer,
    users: usersReducer,
}); 

let store = createStore(reducers);

export default store;

window.store = store; 