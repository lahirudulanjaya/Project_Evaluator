
import axios from 'axios'



//login authentications

export const loginStudent = userData => dispatch =>{
    axios.post('http://localhost:4000/api/authenticate',userData)
    .then(
        res=>{
            const {token} =res.data
            localStorage.setItem('jwttoken',token)
            setAuthtoken(token)

        }
    )
}

const setAuthtoken = token =>{
    if(token){
        axios.defaults.headers.common['Authorization'] = token
    }
    else{
        delete axios.defaults.headers.common['Authorization']
    }
}