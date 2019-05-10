import {ADD_MILESTONE,GET_MILSTONES,GET_PRESENTATIONS,DELETE_MILESTONE,UPDATE_MILSTONE} from "../actions/types";

const initialState={
    milestones:[],
    milestone:[],
    presentation:[],
    info:[]
};

export default function(state =initialState,action){
    switch(action.type){
        case ADD_MILESTONE:
        return {
            ...state,
            milestones:action.payload

        }
        
        case GET_MILSTONES:
        return{
            
            ...state,
            milestone:action.payload,
           

        }
        case GET_PRESENTATIONS:
        return{
            ...state,
            presentation:action.payload
            
        }
        case UPDATE_MILSTONE:
        return{
            ...state,
            info:action.payload
        }
        case DELETE_MILESTONE:
        return{
            ...state,
            info:action.payload
        }

        default:
            return state
    }
}
