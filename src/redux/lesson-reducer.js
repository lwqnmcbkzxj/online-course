const SET_LESSON_DATA = 'SEND-LESSON-DATA';
const SET_CURRENT_LESSON = 'SET_CURRENT_LESSON';
const ADD_LESSON = 'ADD_LESSON';


let initialState = {
    lesson: {
        id: null,
        title: null,
        media: null,
        text: null,
        task: {
            type: null,
            img: null,
            text: null,
            variants: null
        }
    },
    currentLesson: 1,
}

const lessonReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_LESSON_DATA: {
            return {
                ...state,
                lesson: action.lesson
            };
        }
        case SET_CURRENT_LESSON: {
            return {
                ...state,
                currentLesson: +action.lessonId
            };
        }
            
        // case ADD_LESSON: {
        //     const newLesson = {

        //     }
        //     return {
        //         ...state,
        //         currentLesson: +action.lessonId
        //     };
        // }
        default:
            return state;
    }
}


export const setLessonData = (lesson) => {
    return {
        type: SET_LESSON_DATA,
        lesson
    }
}

export const setCurrentLesson = (lessonId) => {
    return {
        type: SET_CURRENT_LESSON,
        lessonId
    }
}

export const addLesson = (lesson) => {
    return {
        type: ADD_LESSON,
        lesson
    }
}
export default lessonReducer;