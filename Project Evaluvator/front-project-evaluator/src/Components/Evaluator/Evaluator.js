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
          studentbutton: true,
          chooseForm : 'group'
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleChange2 = this.handleChange2.bind(this)
      this.setTypeForm = this.setTypeForm.bind(this)
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

  setTypeForm(event){
    this.setState({chooseForm : event.target.value});
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
    const {chooseForm} = this.state;
    const groupMarks = (
      <div className="text-center pt-4">
        <MDBCard className="w-75">
          <MDBCardTitle>
            <h3>Group Marking From</h3>
          </MDBCardTitle>
          <MDBCardBody>
            <MDBContainer>
              <MDBRow>
                <MDBCol sm="3"></MDBCol>
                <MDBCol sm="6">
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
                  <br />
                  <b>Total Marks : {parseInt(this.state.mark01) + parseInt(this.state.mark02)}</b>
                  <br/><br/><br/>
                  <Button className="btn btn-primary" onClick='' color="primary">
                    Submit
                  </Button>
                </MDBCol>
                <MDBCol sm="3"></MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBCardBody>
        </MDBCard>
      </div>
    );
    const studentMarks = (
      <div className="text-center pt-4">
        <MDBCard className="w-75">
          <MDBCardTitle>
            <h3>Individual Marking From</h3>
          </MDBCardTitle>
          <MDBCardBody>
            <MDBContainer>
              <MDBRow>
                <MDBCol sm="3"></MDBCol>
                <MDBCol sm="6">
                  <ImageAvatars/>
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
                  <br />
                  <b>Total Marks : {parseInt(this.state.mark01) + parseInt(this.state.mark02)}</b>
                  <br/><br/><br/>
                  <Button className="btn btn-primary" onClick='' color="primary">
                    Submit
                  </Button>
                </MDBCol>
                <MDBCol sm="3"></MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBCardBody>
        </MDBCard>
      </div>
    )
    return (
      <div>
        <div className="container pt-3">
          <h3 style={{backgroundColor:'#302f2f',color:'#e8eaed',padding:'12px',borderRadius:'5px',marginBottom:'30px'}} >Marking Forms</h3>
        </div>
        <div className="container">
          <div onChange={this.setTypeForm}>
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-grey">
                <input type="radio" name="options" id="option1" value="group" autocomplete="off" /> {'  '}Group{'  '}
              </label>
              <label className="btn btn-grey">
                <input type="radio" name="options" id="option2" value="student" autocomplete="off" /> Individual
              </label>
            </div>
          </div>
        </div>
        <div className="container">
            {chooseForm==='group' ? groupMarks : studentMarks}
        </div>
      </div>
    );
  }
}