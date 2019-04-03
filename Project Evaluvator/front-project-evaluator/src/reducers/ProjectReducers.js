import {GET_PROJECT_NAMES,GET_ALL_PROJECTS}  from "../actions/types";
import {ADD_PROJECT,CHANGE_STATE,GET_MILSTONES} from "../actions/types";

const initialState ={
    project:[],
    projects:[]
};

export default function(state =initialState,action){
    switch(action.type){
        case ADD_PROJECT:
            return {
                ...state,
                project:action.payload
            }
        case GET_PROJECT_NAMES:
            return {
                ...state,
                project:action.payload
            }
        case GET_ALL_PROJECTS:
            return {
                ...state,
                projects:action.payload
            }
        case CHANGE_STATE:
            return{
                ...state,
                status:action.payload
            }
        
        default:
            return state
        
    }
}