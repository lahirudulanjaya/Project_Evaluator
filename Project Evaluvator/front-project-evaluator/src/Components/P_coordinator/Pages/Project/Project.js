import React,{Component} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
class Project extends Component{
// render(){
// return(
//     <div>
//     <h1>Projects</h1>
//     </div>
// )
// }

// }
state = {
    open: false,
    age :''
  };
  getproject(name){
    axios.get("http://localhost:4000/api/pg/getmilestone/"+name).then(res=>{
    console.log(res)
    },
    err=>{
      console.log(err)
    }
    )
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.getproject(event.target.value)
  };


  render() {
    const { classes } = this.props;

    return (
      

      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Create Project Milstons
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"></DialogTitle>
          <DialogContent>
          <TextField
          id="standard-name"
          label="Number of Milestones"
          margin="normal"
        />
        
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <form noValidate autoComplete="off">
        <InputLabel htmlFor="age-simple">Select the project</InputLabel>
          <Select
            value={this.state.age}
            onChange={this.handleChange}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
          >
           <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="2ndyear2020">2ndyear2020</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>

        
        </form>
        <form noValidate autoComplete="off">

      </form>
        
      </div>
    );
  }
}


// export default AlertDialog;

export default Project
