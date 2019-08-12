import {GET_STUDENT_DETAILS,GET_STUDENT_DETAILS_Byyear,GET_STUDENT_PROJECT,GET_GROUPS_BY_PROJECT} from '../actions/types'


const initialState ={
    students:[],
    studentbyYear:{},
    studentProject:[],
    groups:[]
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
        case GET_STUDENT_PROJECT:
        return{
            ...state,
            studentProject:action.payload
        } 
        case GET_GROUPS_BY_PROJECT:
        return{
            ...state,
            groups:action.payload
        }          
        default:
            return state
    }
}