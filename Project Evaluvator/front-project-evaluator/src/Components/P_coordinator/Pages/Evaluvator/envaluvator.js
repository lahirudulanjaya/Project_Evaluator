import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import axios from 'axios'
import swal from 'sweetalert'
class Evaluvator  extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            Registrationnumber:'',
            Email:''

         }
         this.handleChange =this.handleChange.bind(this)
         this.registerEvaluvator=this.registerEvaluvator.bind(this)
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
      }
    
    registerEvaluvator(e){
        e.preventDefault();
      axios.post('http://localhost:4000/api/addEvaluvator',this.state)
      .then(res=>{
        swal({
            title: "Good job!",
            text: "You have succesfully registered!",
            icon: "success",
          });
      })
      .catch(err=>
        {
        swal ( "Oops" ,  "Something went wrong!!!" ,  "error" )
      })
    
       }


    render() { 
        return ( 
            <div>
                register Evaluvator
                <MDBContainer className="login">
        <MDBRow>
          
          <MDBCol sm="6">
            <MDBCard className="w-75 p-3">
              <MDBCardBody >
                <form onSubmit={this.registerEvaluvator}>
                <div className="header pt-3 grey lighten-2">
                <p className="h4 text-center py-4">Register</p>
                </div>
                  <MDBInput 
                  required
                    label="Registration Number"  
                    className="w-75 p-3"
                    name="Registrationnumber"
                    onChange={this.handleChange}
                    value={this.state.Registrationnumber}

                    group 
                    type="text"
                    validate
                    error="wrong"
                    success="right" />
                  <MDBInput
                    label="Email"
                    name="Email"
                    onChange={this.handleChange}
                    value={this.state.Email}
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
                      color="indigo"
                      type="submit"
                    >
                     Register
                    </MDBBtn>
                  </div>
                </form>
                </MDBCardBody>
                </MDBCard>
                </MDBCol>
                </MDBRow>
                </MDBContainer>
                <div class="col-md-12">
              <div class="card">
                  <div class="card-header card-header-danger">
                      <h4 class="card-title ">Project Table</h4>
                     
                  </div>
                  <div class="card-body">
                      <div class="table-responsive">
                          <table class="table">
                              <thead class=" text-primary">
                                  
                                  <th>
                                     Registration Number
                                  </th>
                                  <th>
                                      Email
                                  </th>
                                 
                                  <th>
                                        delete
                                    </th>
                                   
                              </thead>
                              <tbody  >
                                  <tr ><td>hbh</td></tr>
                                           
                                          
                              </tbody>
                          </table>
                          
                      </div>
                  </div>
              </div>
          </div>
                
            </div>
         );
    }
}
 
export default Evaluvator ;