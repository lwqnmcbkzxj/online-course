import { createStore, combineReducers } from "redux";

import lessonReducer from "./lesson-reducer";
import sectionsReducer from "./sections-reducer";




let reducers = combineReducers({
    lessonPage: lessonReducer,
    sectionsPage: sectionsReducer
}); 

let store = createStore(reducers);

export default store;

window.store = store; 