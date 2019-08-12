
import React, { Component } from 'react';

import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBFooter } from 'mdbreact';
import {Link} from 'react-router-dom'
const ucscpng = require('../../images/user-profile/profile-alt.png');
// import ImageUploader from 'react-images-upload';

class StudentProfile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { nameError,IndexError,PasswordError,CpasswordError,emailError,nameErrStyle,regNoErrStyle,passwordErrStyle,cpasswordErrStyle,emailErrStyle } = this.state;
        const userNameLabel = <p style ={{color:'red'}}>Username</p>
        const emailLabel = <p style ={{color:'red'}}>Email</p>
        const indexLabel = <p style ={{color:'red'}}>Registration Number(Ex: 2016cs000)</p>
        const passwordLabel = <p style ={{color:'red'}}>Password</p>
        const cpasswordLabel = <p style ={{color:'red'}}>Confirm Password</p>
        return ( 
<div>            
    
    <MDBContainer >
      <MDBRow pt-4 mt-5>
        <MDBCol sm="10">
        <MDBCard className="w-100 p-3">

            <MDBCardBody>
              <form className="needs-validation"
          onSubmit={this.postRegister}
          >
          <div className="form-header rounded pt-4 mt-6">
          <div className="col-md-4"></div>
          <div className="col-md-4"><img src={ucscpng} /></div>
          <div className="col-md-4"></div>
                {/* <p className="h4 text-center py-4">Sign up</p> */}
                
                </div>

                <div className="grey-text">
                  <MDBInput                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                    label={(nameError==''|| nameError==null) ? 'Username': userNameLabel}
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
                    style = {nameErrStyle}
                    required
                  />
                  <p className="text-danger">{this.state.nameError}</p>
                  <MDBInput
                    label={(emailError=='' || emailError==null) ? "Email" : emailLabel}
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
                    style = {emailErrStyle}
                    required
                  />
                  <p className="text-danger">{this.state.emailError}</p>
                
                  <p className="text-danger">{this.state.IndexError}</p>
                  <MDBInput
                    label={(PasswordError=='' || PasswordError==null) ? "Password" : passwordLabel}
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
                    style = {passwordErrStyle}
                    required
                  />
                  <p className="text-danger">{this.state.PasswordError}</p>
                  <MDBInput
                    label={(CpasswordError=='' || CpasswordError==null) ? "Confirm Password" : cpasswordLabel}
                    name = "Cpassword"
                    value ={this.state.Cpassword}
                    onChange ={this.handleCpasswordChange}
                    onBlur={this.validateCpassword}

                    group
                    className="w-75 p-3"
                    type="password"
                    style= {cpasswordErrStyle}
                    validate
                    required
                  />
                  <p className="text-danger">{this.state.CpasswordError}</p>
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="primary" type="submit" >
                    Save Changes
                  </MDBBtn>
                </div>
              </form>
              {/* <p className="font-small grey-text d-flex justify-content-center">
                Already have an account...
               
          <Link to="/login">Login</Link>
             
              </p> */}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        
      </MDBRow>
    </MDBContainer>
    
</div>          
            );
    }
}
 
export default StudentProfile ;