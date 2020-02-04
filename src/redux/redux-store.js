import { createStore, combineReducers } from "redux";

import lessonReducer from "./lesson-reducer";
import sectionsReducer from "./sections-reducer";
import tasksReducer from "./tasks-reducer";
import taskReducer from "./task-reducer";




let reducers = combineReducers({
    lessonPage: lessonReducer,
    sectionsPage: sectionsReducer,
    tasksPage: tasksReducer,
    taskPage: taskReducer,
}); 

let store = createStore(reducers);

export default store;

window.store = store; 