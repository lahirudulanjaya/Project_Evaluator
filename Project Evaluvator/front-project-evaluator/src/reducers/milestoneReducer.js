import {ADD_MILESTONE,GET_MILSTONES} from "../actions/types";

const initialState={
    milestones:[],
    milestone:[]
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
        default:
            return state
    }
}
