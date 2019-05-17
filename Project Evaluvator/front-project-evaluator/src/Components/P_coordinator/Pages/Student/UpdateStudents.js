
import React from 'react'
import { MDBTable, MDBTableBody, MDBTableHead ,MDBIcon} from 'mdbreact';
import {getstudentdetails} from '../../../../actions/P_coodinator-Student'
import {connect} from 'react-redux'
import {Input ,Card}from 'semantic-ui-react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Form,Dropdown,Button} from 'semantic-ui-react'
import axios from 'axios'
import swal from 'sweetalert'
class UpdateStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students:[],
            filtervalue:'',
            Students:[],
            UpdateStudent:{
                Registrationnumber:'',
                Email:'',
                Name:'',
            },
            open:false

            
          }
          this.serchStudent=this.serchStudent.bind(this)
          this.onchange=this.onchange.bind(this)
    }
   deleteStudent(name){
      axios.delete("http://localhost:4000/api/pg/deletestudent/"+ name)
    .then(res=>{
       swal("sucess")
       this.props.getstudentdetails()
        
    })
    .catch(err=>{
      swal("error")
  })
    }
    updateStudent=()=>{
      axios.put("http://localhost:4000/api/pg/updatestudent",this.state.UpdateStudent)
    .then(res=>{
       swal("sucess")
       this.props.getstudentdetails()
        .catch(err=>{
            swal("error")
        })
    })
    }

    onchange(e){
        var namee =e.target.name
        var value =e.target.value
    
    
        this.setState(prevState => ({
          UpdateStudent: {
              ...prevState.UpdateStudent,
              [namee]:value
          }
      }))
        
      }
      handleClose = () => {
        this.setState({ open: false });
      };

      handleClickOpen = (student) => {
          console.log(student)
        this.setState({ open: true });
        this.setState(prevState => ({
          UpdateStudent: {
              ...prevState.UpdateStudent,
              Name: student.Name,
              Email:student.Email,
              Registrationnumber:student.Registrationnumber
          }
      }))
      }
    serchStudent(e){
        this.setState({filtervalue:e.target.value})
        var Students=[]
        this.state.Students.map(Student=>{
            var name =Student.Registrationnumber
            if(name.includes(e.target.value)){
                Students.push(Student)
            }
        
        })
        this.setState({students:Students})
        }
    componentDidMount(){
        this.props.getstudentdetails()
    }
    componentWillReceiveProps(nProps){
      
        this.setState({students:nProps.students.students,Students:nProps.students.students})
    }
    render() { 
        return (
            <div> <h2><b>Students</b></h2>
                      <Input icon='search' placeholder='Search...' onChange={this.serchStudent} value={this.state.filtervalue}/>
                      <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth={true}
          maxWidth="sm"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        ><DialogTitle id="alert-dialog-title">{"Update Student Detail"}</DialogTitle>
        <DialogContent>
         
         <Form>
    <Form.Field>
      <label>Registration Number</label>
      <input value={this.state.UpdateStudent.Registrationnumber} name="Registrationnumber" onChange={this.onchange}/>
    </Form.Field>
    <Form.Field>
      <label>Name</label>
      <input value={this.state.UpdateStudent.Name} name="Name" onChange={this.onchange}/>
      
    </Form.Field>
    <Form.Field>
      <label>Email</label>
      <input value={this.state.UpdateStudent.Email} name="Email" onChange={this.onchange}/>
    </Form.Field>
   
  </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cansel
          </Button>
          <Button onClick={this.updateStudent} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {this.state.students.length>0 ?
            <MDBTable responsive>
            
              <MDBTableHead color="primary-color" textWhite>
              
              
        
                <tr>
                  <th>#</th>
                  <th>Registartion Number</th>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Registered Or Not</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
             
                  {this.state.students.map((students) => 
                 <tr>
            
                <td >{""}</td>
                  <td >{students.Registrationnumber}</td>
                  <td >{students.Name}</td>
                  <td >{students.Email}</td>
                  <td >{students.isRegistered.toString()}</td>
                  <td><MDBIcon far icon="edit" className="indigo-text pr-3" size="2x" onClick={()=>this.handleClickOpen(students)} /></td>
       <td><MDBIcon icon="trash" className="red-text pr-3" size="2x"onClick={()=>this.deleteStudent(students.Registrationnumber)}/> </td>     


                 
                  </tr>
        
                  )}
            
           
                        
        
         
              </MDBTableBody>
              
            </MDBTable>
            :
            <div><Card className="ml-5" fluid color='red' header='No Student Found' /></div>
                  }
            </div>

          );
    }
}
const mapStateToprops=state=>{
    return{
    students:state.studentDetail
    }
}
 
export default connect(mapStateToprops,{getstudentdetails})(UpdateStudent);