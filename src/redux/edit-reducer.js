const TOGGLE_EDIT_MODE = 'TOGGLE-EDIT-MODE';


let initialState = {  
    editMode: false    
}

const editReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_EDIT_MODE: {
            return {
                ...state,
                editMode: action.editState
            }
        }
       
        default:
            return state;
    }
}


export const toggleEditMode = (editState) => {
    return {
        type: TOGGLE_EDIT_MODE,
        editState
    }
}

export default editReducer;