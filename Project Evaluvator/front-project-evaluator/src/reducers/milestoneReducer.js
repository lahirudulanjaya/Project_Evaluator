import {ADD_MILESTONE,GET_MILSTONES,GET_PRESENTATIONS} from "../actions/types";

const initialState={
    milestones:[],
    milestone:[],
    presentation:[]
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
        default:
            return state
    }
}
