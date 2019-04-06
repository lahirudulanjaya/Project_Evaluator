import axios from'axios'

import {GET_STUDENT_DETAILS,GET_ERRORS} from './types'


export const getstudentdetails =()=>dispatch =>{
    axios.get("http://localhost:4000/api/pg/getstudentdetails")
    .then(res=>{
        dispatch({
            type : GET_STUDENT_DETAILS,
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

