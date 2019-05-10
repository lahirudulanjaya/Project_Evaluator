import axios from 'axios';
import swal from 'sweetalert';
import { GET_ERRORS, GET_MILSTONES, GET_PRESENTATIONS, UPDATE_MILSTONE,DELETE_MILESTONE } from './types';


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
export const updatemilestone=(milestone)=>dispatch=>{
    console.log(milestone)
    axios.put("http://localhost:4000/api/pg/updatemilestone",milestone)
    .then(res=>{
        swal("sucess")

        .catch(err=>{
            swal("error")

        })
    })
}

export const delemilestone=(name)=>dispatch=>{
    console.log(name)
    axios.delete("http://localhost:4000/api/pg/deletemilestone",name)
    .then(res=>{
       swal("sucess")
        .catch(err=>{
            swal("error")
        })
    })
}