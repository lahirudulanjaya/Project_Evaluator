import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import axios from 'axios'
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import './Register.css';
import {connect} from 'react-redux'

import {registerUser} from '../../../actions/authActions';
import Navbar from '../Navbar';

import {Link} from 'react-router-dom'
import { FormGroup, Form} from '@material-ui/core';
class Register extends Component{
  constructor(props){
    super(props);
    console.log(props)
    this.state ={
      UserName : '',
      Email :'',
      Registrationnumber :'',
      Password :'',
      Cpassword :'',
      nameError: '',
      IndexError: '',
      PasswordError: '',
      CpasswordError:'',
      emailError:'',
      errors:{}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleIndexChange = this.handleIndexChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleCpasswordChange = this.handleCpasswordChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.postRegister =this.postRegister.bind(this)
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
 //name validation
 handleNameChange = event => {
    this.setState({ UserName: event.target.value }, () => {
      this.validateName();
    });
  }
  validateName = () => {
    const { UserName } = this.state;
    this.setState({
      nameError:
        UserName.length > 3 ? null : 'Name must be longer than 3 characters'
    });
  }
  //index number validation
  handleIndexChange = event => {
    this.setState({ Registrationnumber: event.target.value }, () => {
      this.validateIndex();
    });
  }
  validateIndex = () => {
    const { Registrationnumber } = this.state;

    this.setState({
      IndexError:
        (Registrationnumber.length==9 && (Registrationnumber.substring(4,6)=='cs'||Registrationnumber.substring(4,6)=='is'||Registrationnumber.substring(4,6)=='CS'||Registrationnumber.substring(4,6)=='IS'))
        ?null: 'Invalid Registration number'
    });
  }
  //password validation
  handlePasswordChange = event => {
    this.setState({ Password: event.target.value }, () => {
      this.validatePassword();
    });
  }
  validatePassword = () => {
    const { Password } = this.state;
    this.setState({
      PasswordError:
        Password.length > 8 ? null : Password.length > 5 ? "Fair Length" : 'Password length should be more than 5 characters' 
    });
  }
  //confirm password validation
  handleCpasswordChange = event => {
    this.setState({ Cpassword: event.target.value }, () => {
      this.validateCpassword();
    });
  }
  validateCpassword = () => {
    const { Cpassword,Password } = this.state;
    this.setState({
      CpasswordError:
       Cpassword=== Password ? null : "Password Doesn't match"
    });
  }
  //email validation
  handleEmailChange = event =>{
    this.setState({Email: event.target.value}, () =>{
      this.ValidateEmail();
    });
  }
  ValidateEmail = () =>{
    const{ Email } = this.state;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState({
      emailError:
        Email.match(mailformat) ? null : "Email is invalid"
    });
  }
  postRegister  (e){
  e.preventDefault()
  e.target.className += " was-validated";
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


  
      const newUser = {
        UserName: this.state.UserName,
        Email: this.state.Email,
        Registrationnumber: this.state.Registrationnumber,
        Password: this.state.Password,
        Cpassword:this.state.Cpassword
      };
      this.props.registerUser(newUser, this.props.history);
    

    



  }
render(){
  const { errors } = this.state;

    return(
      <div>
        <Navbar/>
<MDBContainer className="register">
      <MDBRow>
        <MDBCol md="3">
        </MDBCol>
        <MDBCol md="6">
        <MDBCard className="w-100 p-3">

            <MDBCardBody>
              <form className="needs-validation"
          onSubmit={this.postRegister}
          >
          <div className="header pt-3 grey lighten-2">
                <p className="h4 text-center py-4">Sign up</p>
                </div>
             
                <div className="grey-text">
                  <MDBInput                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                    label="User Name"
                    name = "UserName"
                    onChange ={this.handleNameChange}    
                    value ={this.state.UserName}
                    id="materialFormRegisterPasswordEx4"               
                    type="text"
                    className="w-75 p-3"
                    id="defaultFormRegisterNameEx"
                    validate
                    error="true"
                    success="right"
                    onBlur={this.validateName}
                    minlength="3"
                    required
                  />
                  <p className="text-danger">{this.state.nameError}</p>
                  <MDBInput
                    label="Email"
                    name ="Email"
                    value ={this.state.Email}
                    onChange ={this.handleEmailChange}
                    className="w-75 p-3"
                    onBlur={this.validateEmail}

                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    required
                  />
                  <p className="text-danger">{this.state.emailError}</p>
                  <MDBInput
                    label="Registration Number(Ex: 2016cs000)"
                    name = "Registrationnumber"
                    value ={this.state.Registrationnumber}
                    onChange ={this.handleIndexChange}
                    className="w-75 p-3"
                    onBlur={this.validateIndex}
                    placeholder="Ex : 2016cs000"

                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    minlength="9"
                    maxlength="9"
                    required
                  />
                  <p className="text-danger">{this.state.IndexError}</p>
                  <MDBInput
                    label="Password"
                    name ="Password"
                    value ={this.state.Password}
                    onChange ={this.handlePasswordChange}
                    className="w-75 p-3"
                    onBlur={this.validatePassword}

                    group
                    type="password"
                    validate
                    error="wrong"
                    success="right"
                    minlength="6"
                    required
                  />
                  <p className="text-danger">{this.state.PasswordError}</p>
                  <MDBInput
                    label="Confirm Password"
                    name = "Cpassword"
                    value ={this.state.Cpassword}
                    onChange ={this.handleCpasswordChange}
                    onBlur={this.validateCpassword}

                    group
                    className="w-75 p-3"
                    type="password"
                    validate
                    required
                  />
                  <p className="text-danger">{this.state.CpasswordError}</p>
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="primary" type="submit" >
                    Register
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
    </div>
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
