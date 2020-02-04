const SET_LESSON_DATA = 'SEND-LESSON-DATA';


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
    }
}

const lessonReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_LESSON_DATA: {
            return {
                ...state,
                lesson: action.lesson
            };
        }

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


export default lessonReducer;