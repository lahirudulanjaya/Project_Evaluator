import {GET_MILSTONES,GET_ERRORS,GET_PRESENTATIONS} from './types'
import axios from 'axios'
import swal from 'sweetalert';


export const addmilstones=(milestones)=>dispath=>{
    axios.post("http://localhost:4000/api/pg/postmilestone",milestones)
    .then(res=>{
        swal({
            title: "Good job!",
            text: "You have succesfully registered!",
            icon: "success",
          });
    })
    .catch(err =>{
        swal ( "Oops" ,  "Something went wrong!!!" ,  "error" )
    })
}
export const getmilestones=(name)=>dispatch=>{
    axios.get("http://localhost:4000/api/pg/getmilestone/"+name)
    .then(res=>{
        dispatch({
            type : GET_MILSTONES,
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

export const getpresentations=(name)=>dispatch=>{
    axios.get("http://localhost:4000/api/pg/getpresentations/"+name)
    .then(res=>{
        dispatch({
            type : GET_PRESENTATIONS,
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