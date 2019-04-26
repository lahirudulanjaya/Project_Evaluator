import {GET_REQUEST,GET_SEND_REQUEST} from '../actions/types'

const initialstate ={
    request :[],
    requests:[]
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
        default:
            return state
    }
}