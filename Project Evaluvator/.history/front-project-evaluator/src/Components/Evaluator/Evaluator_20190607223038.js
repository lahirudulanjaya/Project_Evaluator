import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow, MDBContainer} from 'mdbreact';

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
    return(
      <h1>Manjitha</h1>
    );
  }