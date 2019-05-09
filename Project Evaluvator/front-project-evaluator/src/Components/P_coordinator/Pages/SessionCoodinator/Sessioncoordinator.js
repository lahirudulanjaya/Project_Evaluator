import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput ,MDBIcon} from 'mdbreact';
import axios from 'axios'
import swal from 'sweetalert'
class Sessioncoodinator  extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            Registrationnumber:'',
            Email:'',
            SessionCoordinator:[]

         }
         this.handleChange =this.handleChange.bind(this)
         this.registersessionCoordinator=this.registersessionCoordinator.bind(this)
    }
    componentDidMount(){
      axios.get('http://localhost:4000/api/getSessioncoodinator').then(res=>{
          this.setState({SessionCoordinator:res.data})
          console.log(res.data)
        })
        .catch(err=>{
          console.log(err)
        })
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
      }
     
        
      
      
    
    registersessionCoordinator(e){
        e.preventDefault();
      axios.post('http://localhost:4000/api/addSessioncoodinator',this.state)
      .then(res=>{
        swal({
            title: "Good job!",
            text: "You have succesfully registered!",
            icon: "success",
          });
          axios.get('http://localhost:4000/api/getSessioncoodinator').then(res=>{
            this.setState({SessionCoordinator:res.data})
            console.log(res.data)
          })
          .catch(err=>{
            console.log(err)
          })
      })
      .catch(err=>
        {
        swal ( "Oops" ,  "Something went wrong!!!" ,  "error" )
      })
    
       }


    render() { 
        return ( 
            <div>
                register SessionCoordinator
                <MDBContainer className="login">
        <MDBRow>
          
          <MDBCol sm="6">
            <MDBCard className="w-75 p-3">
              <MDBCardBody >
                <form onSubmit={this.registersessionCoordinator}>
                <div className="form-header indigo rounded">
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
                    type="text"
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
                                    <th>
                                        Update
                                    </th>
                                   
                              </thead>
                              <tbody  >
                                {this.state.SessionCoordinator.map(eva=>
                                  <tr >
                                    <td>{eva.Registrationnumber}</td>
                                  <td>{eva.Email}</td>
                                  <td><MDBIcon icon="trash" className="red-text pr-3" size="2x" /></td>   
                                  <td><MDBIcon far icon="edit" className="indigo-text pr-3" size="2x" />
                                  </td>
                                  </tr>
                                )}
                                  
                                           
                                          
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
 
export default Sessioncoodinator ;