import React, { Component } from 'react';

import Sidebar from '../../Component/Sidebar2';
import RaisedButton from '@material-ui/core/Button';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class Student extends Component{
    state={
        open:false
    }
    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };




    render(){
        return(
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
            <input type="file" />
            </RaisedButton>
         
          <Button variant="contained" color="primary" >
        Submit
      </Button>
      
      </form>
              </DialogContent>
              </Dialog>
              </div>
                </div>
                </div>
                </div>
        )
    }


}

export default  Student
