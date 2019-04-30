import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class Evaluator extends React.Component {
    constructor(props){
        super(props);
      
      this.state = {
          open:false,
          mark01: 0,
          mark02: 0,
      }
      this.handleChange = this.handleChange.bind(this)
    };

  handleChange(event) {
    if(event.target.value>10){
      alert('Value should be less than 10');
      event.target.value=null;
    }
    // this.addAction();
    this.setState({[event.target.name]: event.target.value});
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
//   addAction =()=>{
//       let x = this.state.mark01 + this.state.mark02;
//       this.setState({total:x});
//   }

  render() {
    return (
      <div>
        <Button variant="outlined" color="dark" onClick={this.handleClickOpen}>
          Group Marks
        </Button>
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
      </div>
    );
  }
}