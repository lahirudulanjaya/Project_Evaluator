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
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

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
    open1: false,
    open:false,
    age :'',
    Projectyear:'',
    Projectid:''
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
  handleClickOpen1 = () => {
    this.setState({ open1: true });
  };

  handleClose1 = () => {
    this.setState({ open1: false });
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
        

        
        </form>
        <form noValidate autoComplete="off">

      </form>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen1}>
        Create Project
        </Button>
        <Dialog
          open={this.state.open1}
          onClose={this.handleClose1}
          aria-labelledby="alert-dialog-title1"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title1"></DialogTitle>
          <DialogContent>
      
         <div>
        <TextField
          id="standard-name"
          label="Project Year"
          value={this.state.Projectyear}
          margin="normal"
          required
        />
        </div>
        <div>
         <TextField
          id="standard-name"
          label="Project ID"
          value={this.state.Projectid}
          margin="normal"
          required
        />
        </div>
        <div>
        <FormLabel component="legend">Project Type</FormLabel>

        <RadioGroup
            aria-label="Gender"
            name="gender1"
            onChange={this.handleChange}
          >
          <FormControlLabel value="2" control={<Radio />} label="2nd Year" />
            <FormControlLabel value="3" control={<Radio />} label="3rd Year" />
            </RadioGroup>
        </div>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose1} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose1} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
<div>
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
          </div>
      </div>
    );
  }
}


// export default AlertDialog;

export default Project
