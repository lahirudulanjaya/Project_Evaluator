import React, { Component } from 'react';
import * as excel from 'xlsx';
import RaisedButton from '@material-ui/core/Button';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import swal from 'sweetalert';
import { MDBBtn,MDBIcon,MDBContainer,MDBFooter} from 'mdbreact';
import {getstudentdetails} from '../../../../actions/P_coodinator-Student'
import {whologgedin} from '../../../../actions/authActions'
import {connect} from 'react-redux'
import { Card} from 'semantic-ui-react'
import './Student.css'



const background={
  backgroundColor : '#C4C4C4'
}

class Student extends Component{
  constructor(props){
    super(props)
    this.state={
      open:false,
      arr :[],
      students:[]
  }
  

    this.uploadfile = this.uploadfile.bind(this)
    this.props.getstudentdetails()

  }

  componentWillReceiveProps(nextProps){
    this.setState({students:nextProps.student.students})

  }
  sendmail(){
   axios.get("http://localhost:4000/api/pg/sendmails").then(
     res=>{
      swal({
        title: "Good job!",
        text: "You have succesfully send emails!",
        icon: "success",
      });

     })
     .catch(err=>{
      swal ( "Oops" ,  "Something went wrong!!!" ,  "error" )
      console.log(err.response.data)
    })
  }
    
    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

uploadfile(event){

  let file =event.target.files[0]
  var reader = new FileReader();
  reader.readAsArrayBuffer(file)
  reader.onload=(e)=>{
    var data = new Uint8Array(reader.result);
    var wb = excel.read(data,{type:'array'});
    //var htmlstr = excel.write(wb,{ type:'binary'});
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const data1 = excel.utils.sheet_to_json(ws);
    console.log(data1)
    // data1.map(data1=>{

    // })
 
    this.setState({arr : data1})
    alert(this.state.arr)
  }
  // let data = excel.read(file,{type:'binary'})
  // console.log(data)
  // alert("done")
}
uploadtoDB=()=>{
  const newdetatil={
      arr :this.state.arr
  }
  axios.post('http://localhost:4000/api/pg/Importstudent',newdetatil)
      .then(res=>{
        console.log(this.state.arr)
        swal({
          title: "Good job!",
          text: "You have succesfully registered!",
          icon: "success",
        });
        this.props.getstudentdetails()
      })
      .catch(err=>{
        swal ( "Oops" ,  "Something went wrong!!!" ,  "error" )
        console.log(err.response.data)
      })
}


    render(){
      const { proname } = this.props;

        return(
          <div>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                
      <div className="reg">
      <div className="row">
        <div className="col-sm-4">
          <Card className="ml-5" fluid color='orange' header='send email to register' />
        </div>
        <div className="col-sm-4">
          <MDBBtn color="default" onClick={this.sendmail}>
            <MDBIcon icon="magic" className="mr-1"  /> Send Emails
          </MDBBtn>
        </div>
      </div>



      <div className="col-sm-4 pt-3">
            <MDBBtn variant="outlined" color="primary" id ="add" size="lg" onClick={this.handleClickOpen}>
              Add Student Details
            </MDBBtn>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title"></DialogTitle>
              <DialogContent>
              <form noValidate autoComplete="off">
<div>
                <FormLabel><b>Import Student Details</b></FormLabel>
                </div>

                <RaisedButton
                 color="primary" 
            containerElement='label' // <-- Just add me!
            label='My Label'>
            <input type="file" onChange={this.uploadfile}/>
            </RaisedButton>
         
          <Button variant="contained" color="primary" onClick={this.uploadtoDB} >
        Submit
      </Button>
      <Button variant="contained" color="primary"  >
        Click here for create groups
      </Button>

      
      </form>
              </DialogContent>
              
              </Dialog>
             
              </div>


             

      </div>
      </div>
     
      {/* <MDBTable responsive>
     
<MDBTableHead color="primary-color" textWhite>
  <tr>
    <th>#</th>
    <th>Name</th>
    <th>Email</th>
    <th>Registration Number</th>
    <th>isRegistered</th>
   <th>Delete</th>
   <th>Change</th>
  </tr>
</MDBTableHead>
<MDBTableBody>

    {this.state.students.map((students) => 
    
   <tr>

  <td >{""}</td>
    <td >{students.Name}</td>
    <td >{students.Email}</td>
    <td >{students.Registrationnumber}</td>
    <td >{students.isRegistered.toString()}</td>

    
    <td key={students._id}><MDBBtn  onClick ={()=>this.changeState(students)} size="sm">Click</MDBBtn ></td>
    <td ><MDBBtn  onClick ={()=>this.changeState(students)} size="sm">Change</MDBBtn ></td>

    </tr>

    )}


          

 
</MDBTableBody>

</MDBTable> */}

{/* <h1>Create Groups</h1> */}


        
                </div>
                {/* <BasicTable></BasicTable> */}
                </div>
  
          </div>
        )
    }


}
const mapStateToProps=(state)=>{
  return{
student :state.studentDetail
  }
}

export default connect(mapStateToProps,{getstudentdetails,whologgedin})(Student)
