const SET_SECTIONS = 'SET_SECTIONS_DATA';


let initialState = {
    sections: [],
}

const sectionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SECTIONS: {
            return {
                ...state,
                sections: action.sections,
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
export default sectionsReducer;