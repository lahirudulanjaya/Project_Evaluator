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
import Products from './Component/milestone_table';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer} from 'mdbreact';
import {AddProject} from '../../../../actions/ProjectActions'
import {connect} from 'react-redux'

const styles =  {
  dialogPaper:{
    width:'400px',
  }
};

class Project extends Component{


constructor(props){
  super(props);

  var today = new Date();
  var year = today.getFullYear();

this.state = {
    open1: false,
    open:false,
    Projectname:'',
    Acadamicyear:'',
    ProjectInitailDate:'',
    year:year,
    ProjectType:'',
    errors:''
  };
  this.handleChange = this.handleChange.bind(this)

}
componentWillReceiveProps(nextProps) {
  if (nextProps.errors) {
    this.setState({ errors: nextProps.errors });
  }
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
      Projectname:this.state.Projectname,
      Acadamicyear:this.state.Acadamicyear,
      ProjectType :this.state.ProjectType,
      ProjectInitailDate:this.state.ProjectInitailDate
      }
      this.props.AddProject(Project)
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
          <MDBCard>
            <MDBCardBody>
              <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                Create Milestones
              </Button>
            </MDBCardBody>
          </MDBCard>
            <Dialog 
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title"></DialogTitle>
              <DialogContent >
             
      <Products></Products>

            
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
          <div className="col-sm-4 pt-3">
            <MDBCard>
              <MDBCardBody>
              <div className="card-background">
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen1}>
                  Create Project
                </Button>
              </div>
              </MDBCardBody>
            </MDBCard>
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
              label="Project Name"
              name="Projectname"
              value = {this.state.Projectname}
              onChange={this.handleChange}
              margin="normal"
              required
            />
            </div>
            <div>
            <TextField
              id="standard-name"
              label="Project Initail Date"
              name="ProjectInitailDate"
              value={this.state.ProjectInitailDate}
              onChange={this.handleChange}
              margin="normal"
              required
            />
            
            </div>
            <div className="pt-3">
              <FormLabel component="legend">Academic Year</FormLabel>

              <RadioGroup
                aria-label="Academic Year"
                name="acdemicYear"
                value={this.state.value}
                onChange={this.handleChange}
              >
              <div pt-0>
                <FormControlLabel value="2" name="acdemicYear" control={<Radio color="primary" onChange={this.handleChange} checked={this.state.Acadamicyear==='2'} name ="Acadamicyear"/>} label="2nd Year" />
                <FormControlLabel value="3" name="acdemicYear" control={<Radio color="primary" onChange={this.handleChange} checked={this.state.Acadamicyear==='3'} name ="Acadamicyear"/>} label="3rd Year" />
                <FormControlLabel value="4" name="acdemicYear" control={<Radio color="primary" onChange={this.handleChange} checked={this.state.Acadamicyear==='4'} name ="Acadamicyear"/>} label="4th Year" />
              </div>
              </RadioGroup>

            </div>
            <div className="pt-3">
              <FormLabel component="legend">Project Type</FormLabel>

              <RadioGroup
                aria-label="Gender"
                name="type"
                value={this.state.value}
                onChange={this.handleChange}
              >
              <div pt-0>
                <FormControlLabel value="individual" name="type" control={<Radio color="primary" onChange={this.handleChange} checked={this.state.ProjectType==='Individual' } value='Individual' name ="ProjectType"/>} label="Individual" />
                <FormControlLabel value="group" name="type" control={<Radio color="primary"onChange={this.handleChange} checked={this.state.ProjectType==='Group' } value ='Group' name ="ProjectType"/>} label="Group"  />
            
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

export default connect(null,{AddProject})(Project)
