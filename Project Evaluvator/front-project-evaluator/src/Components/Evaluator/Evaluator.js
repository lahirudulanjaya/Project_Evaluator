import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer} from 'mdbreact';

import ImageAvatars from './ImageAvatars';

export default class Evaluator extends React.Component {
    constructor(props){
        super(props);
      
      this.state = {
          open:false,
          open2:false,
          mark01: 0,
          mark02: 0,
          groupbutton: true,
          studentbutton: true
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleChange2 = this.handleChange2.bind(this)
    };

  handleChange(event) {
    if(event.target.value>10){
      alert('Value should be less than 10');
      event.target.value=0;
    }
    
    this.setState({[event.target.name]: event.target.value});
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
  // Student marks
  handleChange2(event) {
    if(event.target.value>10){
      alert('Value should be less than 10');
      event.target.value=0;
    }
    
    this.setState({[event.target.name]: event.target.value});
  }

  handleClickOpen2 = () => {
    this.setState({ open2: true });
  };

  handleClose2 = () => {
    this.setState({ open2: false });
  };
  
//   addAction =()=>{
//       let x = this.state.mark01 + this.state.mark02;
//       this.setState({total:x});
//   }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-4 pt-2 ml-5">
              <div className="ml-3">
                <MDBCard>
                  <MDBCardBody>
                  <div>
                    <Button variant="outlined" color="dark" disabled={!this.state.groupbutton} onClick={this.handleClickOpen}>
                      Group Marks
                    </Button>
                  </div>
                  </MDBCardBody>
                </MDBCard>
              </div>
            </div>
            <div className="col-sm-4 pt-2 ml-5">
              <div className="ml-3">
                <MDBCard>
                  <MDBCardBody>
                  <div>
                    <Button variant="outlined" color="dark" disabled={!this.state.studentbutton} onClick={this.handleClickOpen2}>
                      Student Marks
                    </Button>
                  </div>
                  </MDBCardBody>
                </MDBCard>
              </div>
            </div>
          </div>
        </div>

        
        {/* Group marks form */}
        <Dialog
          fullWidth={true}
          maxWidth='sm'
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Group Marks</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter group marks
            </DialogContentText>
                <form>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Marks 01"
                    type="number"
                    name = "mark01"
                    placeholder="Maximum mark = 10"
                    defaultValue = "0"
                    onChange={this.handleChange}
                    fullWidth 
                    />
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="mark02"
                    label="Marks 02"
                    type="number"
                    placeholder="Maximum mark = 10"
                    defaultValue = "0"
                    onChange={this.handleChange}
                    fullWidth 
                    />
                </form>
                <b>Total Marks : {parseInt(this.state.mark01) + parseInt(this.state.mark02)}</b>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>

        {/* Student marks form */}
        <Dialog
          fullWidth={true}
          maxWidth='sm'
          open={this.state.open2}
          onClose={this.handleClose2}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Student Marks</DialogTitle>
          <DialogContent>
            <ImageAvatars/>
            <DialogContentText>
              Enter Student Marks
            </DialogContentText>
                <form>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Marks 01"
                    type="number"
                    name = "mark01"
                    placeholder="Maximum mark = 10"
                    defaultValue = "0"
                    onChange={this.handleChange2}
                    fullWidth 
                    />
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="mark02"
                    label="Marks 02"
                    type="number"
                    placeholder="Maximum mark = 10"
                    defaultValue = "0"
                    onChange={this.handleChange2}
                    fullWidth 
                    />
                </form>
                <b>Total Marks : {parseInt(this.state.mark01) + parseInt(this.state.mark02)}</b>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose2} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose2} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}