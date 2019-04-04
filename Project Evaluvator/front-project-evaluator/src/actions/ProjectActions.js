import axios from'axios'
import {GET_PROJECT_NAMES,GET_ALL_PROJECTS,CHANGE_STATE} from './types'
import {GET_ERRORS} from './types'
import {ADD_PROJECT}from './types'
import swal from 'sweetalert';

export const getprojectnames =()=>dispatch=>{
    axios.get("http://localhost:4000/api/pg/getprojectsnames")
    .then(res=>{
        dispatch({
            type : GET_PROJECT_NAMES,
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
export const AddProject =(project)=>dispatch=>{
    
    axios.post("http://localhost:4000/api/pg/addproject",project).then(res=>{

      swal({
        title: "Good job!",
        text: "You have succesfully registered!",
        icon: "success",
      });
    }
    )
    .catch(err=>{
      swal ( "Oops" ,  "Something went wrong!!!" ,  "error" )
      console.log(err.response.data)
    })
}
export const getallprojects =()=>dispatch=>{
    axios.get("http://localhost:4000/api/pg/getallprojects")
    .then(res=>{
        dispatch({
            type : GET_ALL_PROJECTS,
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
export const ChangeStatus =(Statausdata)=>dispatch=>{
    
    axios.put("http://localhost:4000/api/pg/changestatus",Statausdata).then(res=>{

      swal({
        title: "Good job!",
        text: "You have succesfully Change Status!",
        icon: "success",
      });
     
    }
    )
    .catch(err=>{
      swal ( "Oops" ,  "Something went wrong!!!" ,  "error" )
      console.log(err.response.data)
    })

}

