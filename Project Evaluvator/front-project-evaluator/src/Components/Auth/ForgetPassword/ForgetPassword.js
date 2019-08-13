import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput, MDBFooter  } from 'mdbreact';
import axios from 'axios';
import {Link} from 'react-router-dom'
import NavBar from '../Navbar'
import {Card} from 'semantic-ui-react'

class ForgetPassword extends Component{
    constructor(props){
        super(props);
        this.state={
            UserName:'',
            checkValue:'',
            err :(<div><Card fluid color="red" header="User name does not exist" /></div>),
            correct :(<div><Card fluid color="blue" header="Check your email inbox" /></div>),
            view :''
        }
        this.handleChange = this.handleChange.bind(this);
        this.sendEmail = this.sendEmail.bind(this);    
    }
    
    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
      }
    sendEmail(event){
        var name = this.state.UserName;
        axios.get('http://localhost:4000/api/pg/checkusername/'+name)
        .then(res=>{
            if(res.data==false){
                this.state.view = this.state.err;
                this.state.checkValue = true;
                console.log(this.state.checkValue);
            }
            else{
                this.state.view = this.state.correct;
                this.state.checkValue = false;
                console.log(this.state.checkValue);
            }
        })
    }

    render(){
        var view = this.state.view;

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
                                        <form >
                                        <div className="form-header indigo rounded">
                                        <p className="h4 text-center py-4">Password Rest</p>
                                        </div>
                                        <MDBInput 
                                        required
                                            label="User Name"  
                                            className="w-75 p-3"
                                            name="UserName"
                                            onChange={this.handleChange}
                                            value={this.state.UserName}

                                            group 
                                            type="text"
                                            validate
                                            error="wrong"
                                            success="right" />
                                        <div className="text-center mb-4 mt-5">
                                            <MDBBtn
                                            color="primary"
                                            type="button"
                                            onClick={this.sendEmail}
                                            >
                                            Submit
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
                            <div hidden={this.state.checkValue}>{view}</div>
                            {/* {this.state.checkValue=="error" ?
                                <div><Card fluid color="red" header="User name does not exist" /></div>
                                :<div></div>
                            }
                            {this.state.checkValue="correct"?
                                <div><Card fluid color="blue" header="Check your email" /></div>
                                :<div></div>
                            } */}
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

