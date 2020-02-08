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

export default sectionsReducer;