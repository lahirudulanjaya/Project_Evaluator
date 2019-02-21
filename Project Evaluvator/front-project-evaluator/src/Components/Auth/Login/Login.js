import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import axios from 'axios';
import swal from 'sweetalert';
import './Login.css';

class Login extends Component{
  constructor(props){
    super(props);
    this.state ={
      UserName :'',
      password : ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }


  render(){
    return (
      <MDBContainer className="login">
        <MDBRow>
          <MDBCol sm="3"></MDBCol>
          <MDBCol sm="6">
            <MDBCard>
              <div className="header pt-3 grey lighten-2">
                <MDBRow className="d-flex justify-content-start">
                  <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                    Log in
                  </h3>
                </MDBRow>
              </div>
              <MDBCardBody className="mx-4 mt-4">
                <form>
                  <MDBInput 
                    label="User Name"  
                    name="UserName"
                    onChange={this.handleChange}
                    value={this.state.UserName}

                    group 
                    type="text"
                    validate
                    error="wrong"
                    success="right" />
                  <MDBInput
                    label="Your password"
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.password}

                    group
                    type="password"
                    validate
                    error="wrong"
                    success="right"
                    containerClass="mb-0"
                  />
                  <p className="font-small grey-text d-flex justify-content-end">
                    Forgot
                    <a
                      href="#!"
                      className="dark-grey-text font-weight-bold ml-1"
                    >
                      Password?
                    </a>
                  </p>
                  <div className="text-center mb-4 mt-5">
                    <MDBBtn
                      color="primary"
                      onClick ={this.postRegister}
                    >
                      Log in
                    </MDBBtn>
                  </div>
                </form>
                <p className="font-small grey-text d-flex justify-content-center">
                  Don't have an account?
                  <a
                    href="/register"
                    className="dark-grey-text font-weight-bold ml-1"
                  >
                    Sign up
                  </a>
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol sm="3"></MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}

export default Login;