const SET_SECTIONS = 'SEND-SET_SECTIONS_DATA-DATA';



let initialState = {
    sections: [
        {
            "name": "Section 1 intro",
            "lessons": [
                { "id": 1, "name": "General physics huhuhuhuh" }
            ]
        },
        {
            "name": "Section 2 general physics",
            "lessons": [
                { "id": 2, "name": "Experimental physics Mozart" },
                { "id": 3, "name": "Newer Leibniz Physics" }
            ]
        }
    ],
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