import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput ,MDBIcon,MDBFooter} from 'mdbreact';
import axios from 'axios'
import swal from 'sweetalert'
class Evaluvator  extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            Registrationnumber:'',
            Email:'',
            Evaluvators:[]

         }
         this.handleChange =this.handleChange.bind(this)
         this.registerEvaluvator=this.registerEvaluvator.bind(this)
    }
    componentDidMount(){
      axios.get('http://localhost:4000/api/getEvaluvators').then(res=>{
          this.setState({Evaluvators:res.data})
          console.log(res.data)
        })
        .catch(err=>{
          console.log(err)
        })
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
      }
      deleteEvaluvator=(name)=>{

        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            axios.delete("http://localhost:4000/api/deleteevaluvator/"+ name)
            .then(res=>{
               swal("sucess")
               axios.get('http://localhost:4000/api/getEvaluvators').then(res=>{
                this.setState({Evaluvators:res.data})
                console.log(res.data)
              })
              .catch(err=>{
                console.log(err)
              })
                .catch(err=>{
                    swal("error")
                })
            })
           
            
           
          } 
        });

        
       
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
          axios.get('http://localhost:4000/api/getEvaluvators').then(res=>{
            this.setState({Evaluvators:res.data})
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
              <div className="container pt-2">
                <div className="row">
                  <div className="col-sm-1">
                  </div>
                  <div className="col-sm-11 pt-3">
                    <h3 style={{backgroundColor:'#346CDC',color:'#e8eaed',padding:'12px',borderRadius:'5px',marginBottom:'30px'}} >Manage Evaluvator</h3>
                  </div>               
                </div>
                <div className="row">
                  {/* <Card className="ml-5" fluid color='white' header='register Evaluvator' /> */}
                  <div className="col-sm-3">
                  </div>
                  <div className="col-sm-6">
                  <MDBContainer>
                  <MDBRow>
                    <MDBCol sm="12">
                      <MDBCard className="w-75 p-1">
                        <MDBCardBody>
                          <form onSubmit={this.registerEvaluvator}>
                          <div className="header pt-1 lighten-2" style={{backgroundColor:'#346CDC'}}>
                          <p className="h4 text-center py-4" style={{color:"white"}}>Register</p>
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
                  </div>
                  </div>
                </div>
                <div className="container">
                <div className="col-md-12 pt-3 mb-5">
              <div class="card">
                  <div class="card-header card-header-danger" style={{backgroundColor:"#C2C5C9"}}>
                      <h4 class="card-title ">Evaluvators</h4>  
                  </div>
                  <div class="card-body">
                      <div class="table-responsive" style={{border:'2px solid #AFB1B4', borderRadius:'5px'}}>
                          <table class="table">
                              <thead style={{backgroundColor:"#346CDC", color:'white'}}>
                                  
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
                                {this.state.Evaluvators.map(eva=>
                                  <tr >
                                    <td>{eva.Registrationnumber}</td>
                                  <td>{eva.Email}</td>
                                  <td><MDBIcon icon="trash" className="red-text pr-3" size="2x" onClick={()=>this.deleteEvaluvator(eva.Registrationnumber)} /></td>   
                                
                               
                                  </tr>
                                )}
                                  
                                           
                                          
                              </tbody>
                          </table>
                          
                      </div>
                  </div>
              </div>
          </div>

    

</div>

            </div>
         );
    }
}
 
export default Evaluvator ;