import { sectionsAPI } from '../api/api';

const SET_SECTIONS = 'SET_SECTIONS_DATA';
const SET_CURRENT_SECTION = 'SET_CURRENT_SECTION';

let initialState = {
    sections: [],
    currentSection: 1,
}

const sectionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SECTIONS: {
            return {
                ...state,
                sections: action.sections,
            }
        }

        case SET_CURRENT_SECTION: {
            return {
                ...state,
                currentSection: action.sectionId,
            }
        }
        default:
            return state;
    }
}


export const setSections = (sections) => {
    return {
        type: SET_SECTIONS,
        sections
    }
}

export const setCurrentSection = (sectionId) => {
    return {
        type: SET_CURRENT_SECTION,
        sectionId
    }
}

export const getSections = () => (dispatch) => {
    let response = [
        {
            "id": 1,
            "title": "Section 1 intro",
            "lessons": [
                {
                    "title": "Lecture on Egypt",
                    "id": 1,
                    "section_position": 1,
                    "content_type": 0
                },
                {
                    "title": "Lecture on Greece",
                    "id": 2,
                    "section_position": 2,
                    "content_type": 0
                }
            ]
        },
        {
            "id": 3,
            "title": "Section 3 Experimental Physics",
            "lessons": [
                {
                    "title": "Task 5",
                    "id": 4,
                    "section_position": 1,
                    "content_type": 1
                },
                {
                    "title": "2",
                    "id": 7,
                    "section_position": 2,
                    "content_type": 0
                }
            ]
        },
        {
            "id": 4,
            "title": "Section 4 Computer Aggregated Data & Physics",
            "lessons": []
        },
        {
            "id": 5,
            "title": "Section 5",
            "lessons": []
        },
        {
            "id": 6,
            "title": "Section 6",
            "lessons": []
        },
        {
            "id": 7,
            "title": "Section 7",
            "lessons": []
        }
    ]
    dispatch(setSections(response));


    // sectionsAPI.getSections().then((response) => {
    //     dispatch(setSections(response));
    // })    
}

export default sectionsReducer;