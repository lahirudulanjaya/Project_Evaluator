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
const studentdetail ={
  Registrationnumber :String,
  Name:String
}
class Student extends Component{
  constructor(props){
    super(props)
    this.state={
      open:false,
      arr :[]
  }
    this.uploadfile = this.uploadfile.bind(this)
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
      })
      .catch(err=>{
        swal ( "Oops" ,  "Something went wrong!!!" ,  "error" )
        console.log(err.response.data)
      })
}


    render(){
        return(
          <div className="container-fluid">
            <div className="row">
            <div className="col-sm-3">
          <Sidebar/>
                </div>

        
                <div className="col-sm-9">
      <div className="row">
        <div className="col-sm-4 pt-3">
            <Button variant="outlined" color="primary" id ="add" onClick={this.handleClickOpen}>
              Add
            </Button>
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
                </div>
                </div>
          </div>
        )
    }


}

export default  Student
