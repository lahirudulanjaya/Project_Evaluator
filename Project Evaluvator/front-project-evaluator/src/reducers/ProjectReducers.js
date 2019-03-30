import {GET_PROJECT_NAMES}  from "../actions/types";


const initialState ={
    projectnames:null
};

export default function(state =initialState,action){
    switch(action.type){
        case GET_PROJECT_NAMES:
            return {
                ...state,
                projectnames:action.payload
            }
        default:
            return state
        
    }
}