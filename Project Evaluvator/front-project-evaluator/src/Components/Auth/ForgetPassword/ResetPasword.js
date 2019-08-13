import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput, MDBFooter  } from 'mdbreact';
import axios from 'axios';
import {Link} from 'react-router-dom'
import NavBar from '../Navbar'
import {Card} from 'semantic-ui-react'
import swal from 'sweetalert';

class ForgetPassword extends Component{
    constructor(props){
        super(props);
        this.state={
            Password:'',
            Cpassword:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.passwordReset = this.passwordReset.bind(this);
          
    }
    
    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e){
    }
    
    passwordReset(e){

        e.preventDefault();

        const newPassword = {
            Password: this.state.Password,
            Cpassword: this.state.Cpassword,
            Salt:''
        }
        console.log(newPassword);

        let userName = this.props.match.params.userName;
        axios.put('http://localhost:4000/api/pg/changePassword/'+userName, newPassword)
        .then(res=>{
            this.props.history.push('/login');
        })
        .catch(err=>{
            swal ( "Oops" ,  err.response.data.message ,  "error" )
        })
    }

    render(){
        let userName = this.props.match.params.userName;
        return (
            <div>
                <NavBar/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-10 pt-5" style={{marginLeft:"300px"}}>
                            <MDBContainer >
                                <MDBRow>
                                
                                <MDBCol>
                                    <MDBCard className="w-75 p-3">
                                    <MDBCardBody >
                                        <form onSubmit={this.passwordReset}>
                                        <div className="form-header indigo rounded">
                                        <p className="h4 text-center py-4">Password Rest</p>
                                        </div>
                                        <MDBInput
                                            label="New password"
                                            name="Password"
                                            onChange={this.handleChange}
                                            value={this.state.Password}
                                            group
                                            type="password"
                                            className="w-75 p-3"
                                            validate
                                            error="wrong"
                                            success="right"
                                            containerClass="mb-0"
                                            required
                                        />
                                        <MDBInput
                                            label="Confrim password"
                                            name="Cpassword"
                                            onChange={this.handleChange}
                                            value={this.state.Cpassword}
                                            group
                                            type="password"
                                            className="w-75 p-3"
                                            validate
                                            error="wrong"
                                            success="right"
                                            containerClass="mb-0"
                                            required
                                        />
                                        <div className="text-center mb-4 mt-5">
                                            <MDBBtn
                                            color="primary"
                                            type="submit"
                                            >
                                            Reset
                                            </MDBBtn>
                                            
                                        </div>
                                        </form>
                                        <p className="font-small grey-text d-flex justify-content-center">
                                        Don't have an account
                                        
                                        
                                <Link to="/register">Sign up</Link>
                                    
                                        </p>
                                    </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol sm="6"></MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                        </div>
                        <div className="col-sm-6 pt-5">
                            
                        </div>
                    </div>
                </div>
                <div style={{position: "fixed", left: "0px", width: "100%", bottom: "0px", backgroundColor: "", color: "white",
                textAlign: "center"}}>
                    <MDBFooter color="blue" className="font-small pt-4 mt-4" >
                        <div className="footer-copyright text-center py-3">
                            <MDBContainer fluid>
                                &copy; {new Date().getFullYear()} Copyright: <a href="https://www.teamExxo.com"> teamExxo.com </a>
                            </MDBContainer>
                        </div>
                    </MDBFooter>
                </div>
            </div>
        );
    }
}
export default ForgetPassword;

