// import axios from'axios'
// import {GET_PROJECT_NAMES} from './types'
// import {GET_ERRORS} from './types'


// export const getprojectnames =()=>dispatch=>{
//     axios.get("http://localhost:4000/api/pg/getprojectsnames")
//     .then(res=>{
//         dispatch({
//             type : GET_PROJECT_NAMES,
//             payload:res.data
//         },alert(res.data))
//     })
//     .catch(
//         err=>{
//             dispatch({
//                 type :GET_ERRORS,
//                 payload:err.response.data
//             })
//         }
//     )
// }