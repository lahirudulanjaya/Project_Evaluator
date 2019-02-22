import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import axios from 'axios'
import swal from 'sweetalert';
import './Register.css';
import {Link} from 'react-router-dom'
class Register extends Component{
  constructor(props){
    super(props);
    this.state ={
      UserName : '',
      Email :'',
      Registrationnumber :'',
      Password :'',
      Cpassword :''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
  };

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
 }
  postRegister = ()=>{
  
    axios.post('http://localhost:4000/api/Student/register',this.state)
      .then(res=>{
        swal({
          title: "Good job!",
          text: "You have succesfully registered!",
          icon: "success",
        });
      })
      .catch(err=>{
        swal ( "Oops" ,  "Something went wrong!!!" ,  "error" )
      })

      

  }
render(){
    return(
<MDBContainer className="register">
      <MDBRow>
        <MDBCol md="3">
        </MDBCol>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <form className="needs-validation"
          onSubmit={this.submitHandler}
          noValidate>
                <p className="h4 text-center py-4">Sign up</p>
             
                <div className="grey-text">
                  <MDBInput
                    label="User Name"
                    name = "UserName"
                    onChange ={this.handleChange}    
                    value ={this.state.UserName}
                    id="materialFormRegisterPasswordEx4"               
                    type="text"
                    className="form-control"
                    id="defaultFormRegisterNameEx"

                    validate
                    error="wrong"
                    success="right"
                    required
                  />
                  <MDBInput
                    label="Email"
                    name ="Email"
                    value ={this.state.Email}
                    onChange ={this.handleChange}

                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    required
                  />
                  <MDBInput
                    label="Index Number"
                    name = "Registrationnumber"
                    value ={this.state.Registrationnumber}
                    onChange ={this.handleChange}

                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    required
                  />
                  <MDBInput
                    label="Password"
                    name ="Password"
                    value ={this.state.Password}
                    onChange ={this.handleChange}

                    group
                    type="Password"
                    validate
                    error="wrong"
                    success="right"
                    required
                  />
                  <MDBInput
                    label="Confirm Password"
                    name = "Cpassword"
                    value ={this.state.Cpassword}
                    onChange ={this.handleChange}
                    group
                    type="password"
                    validate
                    required
                  />
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="primary" type="submit" onClick ={this.postRegister}>
                    Register
                  </MDBBtn>
                </div>
              </form>
              <p className="font-small grey-text d-flex justify-content-center">
                Already have an account..
               
          <Link to="/login">Login</Link>
             
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="3">
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    
    )
}
}
export default Register