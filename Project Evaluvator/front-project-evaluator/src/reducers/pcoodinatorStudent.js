import {GET_STUDENT_DETAILS} from '../actions/types'


const initialState ={
    students:[]
};

export default function(state =initialState,action){
    switch(action.type){
        case GET_STUDENT_DETAILS:
            return{
                ...state,
                students:action.payload
                }
            
        default:
            return state
    }
}