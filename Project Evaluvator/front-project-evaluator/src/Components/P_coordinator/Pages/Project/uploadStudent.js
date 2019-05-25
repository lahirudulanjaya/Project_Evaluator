import React, { Component } from 'react';
import * as excel from 'xlsx';
import Sidebar from '../../Component/Sidebar2';
import RaisedButton from '@material-ui/core/Button';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import swal from 'sweetalert';

import { MDBBtn,MDBIcon} from 'mdbreact';
import {getstudentdetails} from '../../../../actions/P_coodinator-Student'
import {connect} from 'react-redux'

var nodemailer = require('nodemailer');


const studentdetail ={
  Registrationnumber :String,
  Name:String
}
var divStyle={
  background:"#6699FF",
  height: "1000px",
};


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
    data1.map(data1=>{

    return  data1.Projectname=this.props.proname
    }
    )
    console.log(data1)

 
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
          

        
                <div className="col-sm-9">
                
      <div className="row">
      



      <div >
            <MDBBtn variant="outlined" color="primary" id ="add" size="lg" onClick={this.handleClickOpen}>
              Upload Excel Sheet
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
      
      </form>
              </DialogContent>
              </Dialog>
              </div>
      </div>
     
      <div className="reg">
        send emails to register
        <MDBBtn color="default" onClick={this.sendmail}>
        <MDBIcon icon="magic" className="mr-1"  /> Send Emails
      </MDBBtn>
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

export default connect(mapStateToProps,{getstudentdetails})(Student)
