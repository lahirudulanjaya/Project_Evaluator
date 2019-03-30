import {ADD_MILESTONE} from "../actions/types";

const initialState={};

export default function(state =initialState,action){
    switch(action.Type){
        case ADD_MILESTONE:
        return {
            ...state,
            milestones:action.payload
        }
        default:
            return state
    }
}
