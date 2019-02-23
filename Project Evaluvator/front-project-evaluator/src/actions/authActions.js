
import axios from 'axios'
import setAuthtoken from '../utils/setAuthToken'
import { SET_CURRENT_USER } from './types';
import jwt_decode from 'jwt-decode'

//login authentications

export const loginStudent = userData => dispatch =>{
    axios.post('http://localhost:4000/api/authenticate',userData)
    .then(
        res=>{
            const {token} =res.data
            localStorage.setItem('jwttoken',token)
            setAuthtoken(token)
            const decoded =jwt_decode(token);
            dispatch(setCurrentUser(decoded))

        }
    )
};
export const setCurrentUser =(decoded)=>{
    return {
        type:SET_CURRENT_USER,
        payload:decoded
    }
};

