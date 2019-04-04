import React,{Component} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Projecttable from './Component/project_table'
import DialogTitle from '@material-ui/core/DialogTitle';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Sidebar from '../../Component/Sidebar2';
import Products from './Component/milestone_table';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer} from 'mdbreact';
import {AddProject,getprojectnames} from '../../../../actions/ProjectActions'
import {connect} from 'react-redux'
import {addmilstones} from '../../../../actions/milestoneActions'
import { prototype } from 'module';
import blue from '@material-ui/core/colors/blue';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  DialogContent: {
    
  },
  Dialog: {
    backgroundColor: blue[100],
    color: blue[600],
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
    Projectname:year,
    Acadamicyear:'',
    Initiatedate:'',
    year:year,
    ProjectType:'',
    errors:'',
    arr:[],
    project_names:[
      {
        _id:1,
        Projectname:"sdsd"
      },
      {
        _id:13,
        Projectname:"sdsdsdc"
      }

    ]
  };
  this.handleChange = this.handleChange.bind(this)
  this.handleChange1 = this.handleChange1.bind(this)
  this.handleChange2 = this.handleChange2.bind(this)


}
componentDidMount(){
 this.props.getprojectnames()
//  this.props.project.map()
}

// componentWillMount(){
//   this.props.getprojectnames()
  
// }
   

componentWillReceiveProps(nextProps) {
  if (nextProps.errors) {
    this.setState({ errors: nextProps.errors });
  }
  console.log(nextProps)
}

 
  
  
  addproject =()=>{
    alert(this.props.projectnames)
    const Project = {
      Projectname:this.state.Projectname,
      Acadamicyear:this.state.Acadamicyear,
      ProjectType :this.state.ProjectType,
      Initiatedate:this.state.Initiatedate
      }
      this.props.AddProject(Project)
      this.props.getprojectnames()
  }
  addMilstones=()=>{

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
 handleChange1(e){
  this.setState({[e.target.name]: e.target.value});
  this.setState({Projectname:this.state.year+" _ "+e.target.value+" _ "+this.state.ProjectType })

}
handleChange2(e){  
  this.setState({[e.target.name]: e.target.value});
  this.setState({Projectname:this.state.year+" _ "+this.state.Acadamicyear+" _ "+e.target.value})
}


  render() {

    return (
      
      <div className="row">
        <div className="col-sm-3">
          <Sidebar/>
        </div>

      <div className="col-sm-9">
      <h2>Current Projects</h2>
      <Projecttable ></Projecttable>

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
            fullWidth={true}
            maxWidth='xl'
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title"><FormLabel><b>Define MIlestones for Project</b></FormLabel></DialogTitle>
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
             fullWidth={true}
             maxWidth='sm'
              open={this.state.open1}
              onClose={this.handleClose1}
              aria-labelledby="alert-dialog-title1"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title1"><FormLabel><b>Create New Project</b></FormLabel></DialogTitle>
              <DialogContent>
          
            
            <form noValidate autoComplete="off">
            
            <div>
            <TextField
              id="standard-name"
              label="Project Name"
              name="Projectname"
              value = {this.state.Projectname}
              onChange={this.handleChange}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            </div>
            <div>
            <TextField
              id="standard-name"
              type="date"
              label="Project Initail Date"
              name="Initiatedate"
              value={this.state.Initiatedate}
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
                onChange={this.handleChange1}
              >
              <div pt-0>
                <FormControlLabel value="2" name="acdemicYear" control={<Radio color="primary" onChange={this.handleChange1} checked={this.state.Acadamicyear==='2'} name ="Acadamicyear"/>} label="2nd Year" />
                <FormControlLabel value="3" name="acdemicYear" control={<Radio color="primary" onChange={this.handleChange1} checked={this.state.Acadamicyear==='3'} name ="Acadamicyear"/>} label="3rd Year" />
                <FormControlLabel value="4" name="acdemicYear" control={<Radio color="primary" onChange={this.handleChange1} checked={this.state.Acadamicyear==='4'} name ="Acadamicyear"/>} label="4th Year" />
              </div>
              </RadioGroup>

            </div>
            <div className="pt-3">
              <FormLabel component="legend">Project Type</FormLabel>

              <RadioGroup

                aria-label="Gender"
                name="type"
                value={this.state.value}
                onChange={this.handleChange2}
              >
              <div pt-0>
                <FormControlLabel value="individual" name="type" control={<Radio color="primary" onChange={this.handleChange2} checked={this.state.ProjectType==='Individual' } value='Individual' name ="ProjectType"/>} label="Individual" />
                <FormControlLabel value="group" name="type" control={<Radio color="primary"onChange={this.handleChange2} checked={this.state.ProjectType==='Group' } value ='Group' name ="ProjectType"/>} label="Group"  />
            
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
// Project.propTypes = {
//   getprojectnames:PropTypes.func.isRequired,
//   project: PropTypes.object.isRequired,
  
// };
const mapStateToProps = state => {
  return{

  project: state.project, 
 
}};

// export default AlertDialog;

export default connect(mapStateToProps,{AddProject,getprojectnames,addmilstones})(withStyles(styles)(Project))
