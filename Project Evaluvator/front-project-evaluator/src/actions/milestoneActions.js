import {ADD_MILESTONE} from './types'
import axios from 'axios'
import swal from 'sweetalert';


export const addmilstones=(milestones)=>dispath=>{
    axios.post("http://localhost:4000/api/pg/postmilestone")
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