import {GET_REQUEST,GET_SEND_REQUEST,IS_ALL_ACCEPTED} from '../actions/types'

const initialstate ={
    request :[],
    requests:[],
    isaccepted:false
}

export default function(state =initialstate,action){
    switch(action.type){
        case GET_SEND_REQUEST:
            return{
                ...state,
                request:action.payload
            }
        case GET_REQUEST:
        return{
            ...state,
            requests:action.payload
        }
        case IS_ALL_ACCEPTED:
        return{
            ...state,
            isaccepted:action.payload
        }
        default:
            return state
    }
}