import {GET_STUDENT_DETAILS,GET_STUDENT_DETAILS_Byyear} from '../actions/types'


const initialState ={
    students:[],
    studentbyYear:[]
};

export default function(state =initialState,action){
    switch(action.type){
        case GET_STUDENT_DETAILS:
            return{
                ...state,
                students:action.payload
                }
        case GET_STUDENT_DETAILS_Byyear:
        return{
                ...state,
                studentbyYear:action.payload
        }
            
        default:
            return state
    }
}