import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import axios from 'axios'
import swal from 'sweetalert';

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
        swal ( "Oops" ,  "Something went wrong!" ,  "error" )
      })

      

  }
render(){
    return(
<MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <form>
                <p className="h4 text-center py-4">Sign up</p>
                <div className="grey-text">
                  <MDBInput
                    label="User Name"
                    name = "UserName"
                    onChange ={this.handleChange}    
                    value ={this.state.UserName}               
                    type="text"
                    validate
                    error="wrong"
                    success="right"
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
                  />
                  <MDBInput
                    label="Confirm Password"
                    name = "Cpassword"
                    value ={this.state.Cpassword}
                    onChange ={this.handleChange}
                    group
                    type="password"
                    validate
                  />
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" onClick ={this.postRegister}>
                    Register
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    
    )
}
}
export default Register