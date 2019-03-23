import {GET_ERRORS} from './types'
import axios from 'axios'
import setAuthtoken from '../utils/setAuthToken'
import { SET_CURRENT_USER } from './types';
import jwt_decode from 'jwt-decode'
import swal from 'sweetalert';

//login authentications
// export const registerUser = userData => dispath =>{
//     axios.post('http://localhost:4000/api/Student/register',userData)
//     .then(res => {
//         console.log(res.data)
//     }).catch(
//         err=>{
//            dispath({
//                type :GET_ERRORS,
//                payload :err.response.data

//            })
//         }
//     )
// }

export const registerUser = (userData, history) => dispatch => {
    axios
      .post('http://localhost:4000/api/Student/register', userData)
      .then(res => {swal({
              title: "Good job!",
              text: "You have succesfully registered!",
              icon: "success",
            });
        })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        }, swal ( "Oops" ,  err.response.data ,  "error" )),
       
    
      );
  };
export const loginStudent = userData => dispatch =>{
    axios.post('http://localhost:4000/api/authenticate',userData)
    .then(
        res=>{
            const {token} =res.data
            localStorage.setItem('jwttoken',token)
            setAuthtoken(token)
            const decoded =jwt_decode(token);
            dispatch(setCurrentUser(decoded))

        })
        .catch(err =>{
            swal ( "Oops" ,  err.response.data.message ,  "error" )
            
        }
    )
};
export const setCurrentUser =(decoded)=>{
    return {
        type:SET_CURRENT_USER,
        payload:decoded
    }
};

