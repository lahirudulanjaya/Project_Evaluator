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
import swal from 'sweetalert';
import Sidebar from '../../Component/Sidebar2';


class Project extends Component{


constructor(props){
  super(props);

this.state = {
    open1: false,
    open:false,
    age :'',
    Projectyear:'',
    Projectid:'',
    value:''
  };
  this.handleChange = this.handleChange.bind(this)

}
  getproject(name){
    axios.get("http://localhost:4000/api/pg/getmilestone/"+name).then(res=>{
    console.log(res)
    },
    err=>{
      alert(err)
    }
    )
  }
  
  
  addproject =()=>{
    alert(this.state.value)

    const Project = {
      Projectid:this.state.Projectid,
      Projectyear:this.state.Projectyear,
      Type :this.state.value
      }
    axios.post("http://localhost:4000/api/pg/addproject",Project).then(res=>{
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
  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
 }


  render() {
    const { classes } = this.props;

    return (
      
      <div className="row">
        <div className="col-sm-3">
          <Sidebar/>
        </div>
      <div className="col-sm-9">
      <div className="row">
        <div className="col-sm-4 pt-3">
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
              Create Project Milestons
            </Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title"></DialogTitle>
              <DialogContent>
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
               
              </Select>
              </div>
              <div>
              <TextField
              id="standard-name"
              label="Milestone"
              margin="normal"
            />
          </div>
          <div>
            <TextField
        id="datetime-local"
        label="Date and Time"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        InputLabelProps={{
          shrink: true,
        }}
      />
                </div>

            
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Submit 
                </Button>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                  Close
                </Button>
              </DialogActions>
            </Dialog>

            <form noValidate autoComplete="off">
            

            
            </form>
            <form noValidate autoComplete="off">

            </form>
          </div>
          <div className="col-sm-3 pt-3">
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
          
            
            <form noValidate autoComplete="off">
            <FormLabel><b>Create New Project</b></FormLabel>
            <div>
            <TextField
              id="standard-name"
              label="Project Year"
              name="Projectyear"
              value={this.state.Projectyear}
              onChange={this.handleChange}
              margin="normal"
              required
            />
            </div>
            <div>
            <TextField
              id="standard-name"
              label="Project ID"
              name="Projectid"
              value={this.state.Projectid}
              onChange={this.handleChange}
              margin="normal"
              required
            />
            
            </div>
            <div className="pt-3">
            <FormLabel component="legend">Project Type</FormLabel>

              <RadioGroup
                aria-label="Gender"
                name="value"
                value={this.state.value}
                onChange={this.handleChange}
              >
              <div pt-0>
                <FormControlLabel value="2" name="value" control={<Radio color="primary"/>} label="2nd Year" />
                <FormControlLabel value="3" name="value" control={<Radio color="primary" />} label="3rd Year" />
              </div>
              </RadioGroup>
            
            

            </div>
            <Button variant="contained" color="primary" onClick ={this.addproject}>
            Submit
          </Button>
          
          </form>
              </DialogContent>
            
            </Dialog>
          {/* <div>
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
              </div> */}
          </div>
          </div>
      </div>
      </div>
    );
  }
}


// export default AlertDialog;

export default Project
