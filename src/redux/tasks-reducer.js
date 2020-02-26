import { tasksAPI } from "../api/api";
const SET_TASKS = 'SET_TASKS';
const CALCULATE_POPULARITY = 'CALCULATE_POPULARITY';
const SET_LIKES = 'SET_LIKES';
const SET_PUBLISHED = 'SET_PUBLISHED';


let initialState = {
    tasks: [],
}

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASKS: {
            return {
                ...state,
                tasks: action.tasks,
            }
        }
            
        case CALCULATE_POPULARITY: {
            let averagePopularity = 0;
            let count = 0;
            state.tasks.map((task, counter) => {
                averagePopularity += task.viewed;
                count = counter;
            })
            averagePopularity /= count;
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    if (task.viewed < 0.5 * averagePopularity)
                        return { ...task, popularity: 1 }
                    else if (task.viewed > 1.5 * averagePopularity)
                        return { ...task, popularity: 3 }
                    else
                        return { ...task, popularity: 2 }
                })
            }
        }
            
        case SET_LIKES: {
            let likes = action.likes;
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    let likesCount = 0;
                    likes.map(like => {
                        if (task.id === like.id)
                            likesCount = like.count;
                    })
                    return { ...task, likes: likesCount }
                })
            }
        }
            
        case SET_PUBLISHED: {
            return {
                ...state, 
                tasks: state.tasks.map(task => {
                    if (action.publishedIds.some(id => id === task.id))
                        return { ...task, publish: 1 };
                    
                    return { ...task, publish: 0 };                    
                })
            }
        }
            
        default:
            return state;
    }
}


export const setTasks = (tasks) => {
    return {
        type: SET_TASKS,
        tasks
    }
}
const calculateTasksPopularity = () => {
    return {
        type: CALCULATE_POPULARITY
    }
}

const setLikes = (likes) => {
    return {
        type: SET_LIKES,
        likes
    }
}

const setPublishStatus = (publishedIds) => {
    return {
        type: SET_PUBLISHED,
        publishedIds
    }
}

const getPublishedStatus = () => (dispatch, getState) => {
    let sections = getState().sectionsList.sections
    let publishedTasks = [];
    sections.map(section => {
        section.lessons.map(lesson => {
            if (lesson.content_type === 1 && lesson.publish)
                publishedTasks.push(lesson.id);
        })
    });
    dispatch(setPublishStatus(publishedTasks));
}

export const getTasks = () => (dispatch) => {
    tasksAPI.getTasks().then((response) => {
        dispatch(setTasks(response.tasks));

        dispatch(setLikes(response.likes));
        dispatch(calculateTasksPopularity());
        dispatch(getPublishedStatus());
    })
}
export default tasksReducer;