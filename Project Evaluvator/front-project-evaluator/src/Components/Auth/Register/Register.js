import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import axios from 'axios'
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import './Register.css';
import {connect} from 'react-redux'

import {registerUser} from '../../../actions/authActions';

import {Link} from 'react-router-dom'
class Register extends Component{
  constructor(props){
    super(props);
    this.state ={
      UserName : '',
      Email :'',
      Registrationnumber :'',
      Password :'',
      Cpassword :'',
      errors:{}
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
  };

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
 }
  postRegister = ()=>{
  
    // axios.post('http://localhost:4000/api/Student/register',this.state)
    //   .then(res=>{
    //     swal({
    //       title: "Good job!",
    //       text: "You have succesfully registered!",
    //       icon: "success",
    //     });
    //   })
    //   .catch(err=>{ 
    //    swal ( "Oops" ,  "Something went wrong!!!" ,  "error" )
    //     console.log(err.response.data)
    //   })


    const {Password, Cpassword} = this.state;
    if( Password==Cpassword){
      const newUser = {
        UserName: this.state.UserName,
        Email: this.state.Email,
        Registrationnumber: this.state.Registrationnumber,
        Password: this.state.Password,
        Cpassword:this.state.Cpassword
      };
      this.props.registerUser(newUser, this.props.history);
    }else{
      alert("Password Doesn't match");
    }

    



  }
render(){
  const { errors } = this.state;

    return(
<MDBContainer className="register">
      <MDBRow>
        <MDBCol md="3">
        </MDBCol>
        <MDBCol md="6">
        <MDBCard className="w-100 p-3">

            <MDBCardBody>
              <form className="needs-validation"
          onSubmit={this.submitHandler}
          noValidate>
          <div className="header pt-3 grey lighten-2">
                <p className="h4 text-center py-4">Sign up</p>
                </div>
             
                <div className="grey-text">
                  <MDBInput
                    label="User Name"
                    name = "UserName"
                    onChange ={this.handleChange}    
                    value ={this.state.UserName}
                    id="materialFormRegisterPasswordEx4"               
                    type="text"
                    className="w-75 p-3"
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
                    className="w-75 p-3"

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
                    className="w-75 p-3"

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
                    className="w-75 p-3"

                    group
                    type="Password "
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
                    className="w-75 p-3"

                    type="password"
                    validate
                    required
                  />
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="primary" type="submit" onClick ={this.postRegister}>
                    Registerrrr
                  </MDBBtn>
                </div>
              </form>
              <p className="font-small grey-text d-flex justify-content-center">
                Already have an account..,,,,
               
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
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { registerUser })(Register);
