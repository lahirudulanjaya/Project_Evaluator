import axios from 'axios'
import {GET_SEND_REQUEST,GET_ERRORS,GET_REQUEST,IS_ALL_ACCEPTED}from './types'

export const getsendrequest =(id)=>dispatch=>{
    axios.get("http://localhost:4000/api/getsendresquest/"+id)
    .then(res=>{
        dispatch({
            type : GET_SEND_REQUEST,
            payload:res.data
        })
    })
    .catch(
        err=>{
            dispatch({
                type :GET_ERRORS,
                payload:err.response.data
            })
        }
    )
}

export const getrequest =(id)=>dispatch=>{
    axios.get("http://localhost:4000/api/getresquest/"+id)
    .then(res=>{
        dispatch({
            type : GET_REQUEST,
            payload:res.data
        })
    })
    .catch(
        err=>{
            dispatch({
                type :GET_ERRORS,
                payload:err.response.data
            })
        }
    )
}
export const cheackallaccepted =(id)=>dispatch=>{
    axios.get("http://localhost:4000/api/checkallaccepted/"+id)
    .then(res=>{
        dispatch({
            type:IS_ALL_ACCEPTED,
            payload:res.data.status
        })
        console.log(res.data.status)
    })
    .catch(err=>{
        
            dispatch({
                type :GET_ERRORS,
                payload:err.response.data
            })
        }

    )
}

