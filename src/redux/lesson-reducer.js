const SET_LESSON_DATA = 'SEND-LESSON-DATA';


let initialState = {
    title: 'Lesson title Lesson title Lesson title Lesson title Lesson title',
    media: {video: 'videoUlr', audio: 'audioUrl', image:'imgUlr'},
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tellus lacus, dictum eget libero fringilla, ornare volutpat neque volutpat',
    tasks: [{
        type: 'test',
        image: '',
        text: 'NEW TASK',
        variants: ['apple', 'banana', 'peach']
    }]
}

const lessonReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LESSON_DATA: {  
            return {
                ...state,
                ...action.data              
            };
        }

        default:
            return state;
    }
}


export const setLessonData = (title, media, text, tasks) => {
    return {
        type: SET_LESSON_DATA,
        data: {title, media, text, tasks}
    }
}


export default lessonReducer;