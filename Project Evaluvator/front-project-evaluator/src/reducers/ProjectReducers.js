import {GET_PROJECT_NAMES,GET_ALL_PROJECTS}  from "../actions/types";
import {ADD_PROJECT,CHANGE_STATE,GET_MILSTONES,GET_PROJECT} from "../actions/types";

const initialState ={
    project:[],
    projects:[],
    Currentproject:{}
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
        case GET_PROJECT:
            return{
                ...state,
                Currentproject:action.payload
            }
        
        default:
            return state
        
    }
}