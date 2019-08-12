import axios from'axios'

import {GET_STUDENT_DETAILS,GET_ERRORS,GET_STUDENT_DETAILS_Byyear,GET_STUDENT_PROJECT,GET_GROUPS_BY_PROJECT} from './types'


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

export const getstudentbyYear =(year)=>dispatch =>{
    axios.get("http://localhost:4000/api/pg/getstudents/"+year)
    .then(res=>{
        dispatch({
            type : GET_STUDENT_DETAILS_Byyear,
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

export const getstudentProject=(id)=>dispatch=>{
    axios.get("http://localhost:4000/api/getstudentproject/"+id)
.then(res=>{
    dispatch({
        type:GET_STUDENT_PROJECT,
        payload:res.data
    },console.log(res.data))
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

export const getgroupsbyproject=(id)=>dispatch=>{
    axios.get("http://localhost:4000/api/getgroupsbyprojectname/"+id)
.then(res=>{
    dispatch({
        type:GET_GROUPS_BY_PROJECT,
        payload:res.data
    },console.log(res.data))
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
