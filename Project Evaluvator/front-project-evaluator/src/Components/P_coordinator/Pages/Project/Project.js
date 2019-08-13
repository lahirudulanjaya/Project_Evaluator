import React,{Component} from 'react'
import Buttonn from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { Button }  from 'semantic-ui-react'
import Projecttable from './Component/project_table'
import DialogTitle from '@material-ui/core/DialogTitle';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Sidebar from '../../Component/Sidebar2';
import Products from './Component/milestone_table';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer,MDBFooter} from 'mdbreact';
import {AddProject,getprojectnames} from '../../../../actions/ProjectActions'
import {connect} from 'react-redux'
import {addmilstones} from '../../../../actions/milestoneActions'
import blue from '@material-ui/core/colors/blue';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from'axios'
import swal from 'sweetalert';
import Student from './uploadStudent'
import Settings from '../../../../settings.png';
import {Card} from 'semantic-ui-react'
import './Project.css';
import {Link} from 'react-router-dom'


const styles = {
  DialogContent: {
    
  },
  Dialog: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

var cardStyle={
  backgroundColor: "#DFDFDF",
  size: 'sm'
}
var buttonStyle={
  backgroundColor: "#DAEAED"
}

class Project extends Component{


constructor(props){
  super(props);

  var today = new Date();
  var year = today.getFullYear();

this.state = {
    open1: false,
    open:false,
    open2:false,
    open3:false,
    Projectname:year,
    Acadamicyear:'',
    Initiatedate:'',
    year:year,
    ProjectType:'',
    errors:'',
    arr:[],

  };
  this.handleChange = this.handleChange.bind(this)
  this.handleChange1 = this.handleChange1.bind(this)
  this.handleChange2 = this.handleChange2.bind(this)


}
componentDidMount(){
 this.props.getprojectnames()
//  this.props.project.map()
}


   

componentWillReceiveProps(nextProps) {
  if (nextProps.errors) {
    this.setState({ errors: nextProps.errors });
  }
  console.log(nextProps)
}

 
  
  
  addproject =(e)=>{
    
    e.preventDefault();

    const Project = {
      Projectname:this.state.Projectname,
      Acadamicyear:this.state.Acadamicyear,
      ProjectType :this.state.ProjectType,
      Initiatedate:this.state.Initiatedate
      }
      if(this.state.ProjectType!='' && this.state.Initiatedate!=null && this.state.Acadamicyear!=''){
          axios.post("http://localhost:4000/api/pg/addproject",Project).then(res=>{
            this.setState({open1:false})
            this.setState({open:true})
            this.props.getprojectnames()
        }
        )
        .catch(err=>{
          swal ( "Oops" ,  "Something went wrong!!!" ,  "error" )
          console.log(err.response.data)
        })
      }else{
        swal ( "Oops" ,  "Something went wrong!!!" ,  "error" )
      }
      
  }
  addMilstones=()=>{

  }

  
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleCloses = () => {
    this.setState({ open: false });
    this.setState({open3:true})
    
  };
  handleClickOpen1 = () => {
    this.setState({ open1: true });
  };

  handleClose1 = () => {
    this.setState({ open1: false });
  };
  handleClose3=()=>{
    this.setState({ open3: false });

  }
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
      <div>
         <Dialog 
            
            open={this.state.open3}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title"><FormLabel><b>Import Student Details</b></FormLabel></DialogTitle>
            <DialogContent >
           
    <Student proname ={this.state.Projectname}></Student>

          
            </DialogContent>
             <DialogActions>
             
              <Link to="/pg/creategroups"><Buttonn  color="primary" autoFocus >
                Create Groups
              </Buttonn></Link>
              <Buttonn onClick={this.handleClose3} color="primary" autoFocus>
                Close
              </Buttonn>
              
            </DialogActions>  
          </Dialog>

      <div className="container">
      <div className="row">
      {/* <div className="col-sm-3 pt-3">
        <div class="card text-white bg-primary mb-3" style={{width:"20rem", height:"12rem",fontSize:25}}>
          <div class="card-header text-left"><img src={Settings} alt="" className="logo"/></div>
            <div class="card-body">
              <h5 class="card-title text-right" style={{fontSize:15}}>Create A New Project</h5>
              <Buttonn style={buttonStyle} variant="outlined" color="dark" onClick={this.handleClickOpen1}>
                  Create Project
                </Buttonn>
          </div>
        </div>
      </div> */}
        {/* <div className="col-sm-4 pt-2">
          <div className="">
            <MDBCard>
              <MDBCardBody style={cardStyle}>
              <div className="card-background">
              <img src={Settings} alt="" className="logo"/>
                <Buttonn style={buttonStyle} variant="outlined" color="dark" onClick={this.handleClickOpen1}>
                  Create Project
                </Buttonn>
              </div>
              </MDBCardBody>
            </MDBCard>
          </div>
        </div> */}
      
      </div>
    
      {/* <Card fluid color='orange' header='Current Projects' /> */}
      <div className="container pt-5" >
        <div className="row">
        <div className="col-sm-1"></div>
      <div style={{border:'2px solid #AFB1B4', borderRadius:'5px', backgroundColor:'#C2C5C9'}}>
      <h3 style={{backgroundColor:'#AFB1B4',color:'black',padding:'12px',marginBottom:'30px'}} ><i className="fa fa-fw fa-file" style={{ fontSize: '1.50em' }} />&nbsp;Current Projects <div className='d-flex flex-row-reverse'><Buttonn style={buttonStyle} variant="outlined" color="dark" onClick={this.handleClickOpen1}>
      <img src={Settings} alt="" className="logo"/><b>Create Project</b>
                </Buttonn></div></h3>
      <div className="row">
      <div className="col-sm-11">
      

      
      <div className="pb-5">
        <MDBCard>
          <MDBCardBody style={cardStyle}>
            <Projecttable></Projecttable>
          </MDBCardBody>
        </MDBCard>
      </div>
      </div>
      </div>
      </div>

      <div className="row">
      <div className="col-sm-4">
            
            </div>

            <Dialog
             fullWidth={true}
             maxWidth='sm'
              open={this.state.open1}
              onClose={this.handleClose1}
              aria-labelledby="alert-dialog-title1"
              aria-describedby="alert-dialog-description"
            >
      
  <div className="header pt-2 yellow lighten-2">
              <MDBRow className="d-flex justify-content-start">
              <DialogTitle id="alert-dialog-title1"><FormLabel ><b>Create New Project</b></FormLabel></DialogTitle>

              </MDBRow>
</div>

              <DialogContent>
              
            
            <form autoComplete="off">
            
            <div>
            <TextField
              id="standard-name"
              label="Project Name"
              name="Projectname"
              value = {this.state.Projectname}
              onChange={this.handleChange}
              margin="normal"
              required
              InputLabelProps={{
                shrink: true,
              }}

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
                required
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
                required
              >
              <div pt-0>
                <FormControlLabel value="individual" name="type" control={<Radio color="primary" onChange={this.handleChange2} checked={this.state.ProjectType==='Individual' } value='Individual' name ="ProjectType"/>} label="Individual" />
                <FormControlLabel value="group" name="type" control={<Radio color="primary"onChange={this.handleChange2} checked={this.state.ProjectType==='Group' } value ='Group' name ="ProjectType"/>} label="Group"  />
            
              </div>
              </RadioGroup>

            </div>
            <Button  secondary onClick ={this.addproject}>
            Submit
          </Button>
          
          </form>
              </DialogContent>
            </Dialog>
     
              
          </div>
      <div className="col-sm-9">
          
            <Dialog 
            fullWidth={true}
            maxWidth='xl'
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <div className="header pt-2 yellow lighten-2">
              <MDBRow className="d-flex justify-content-start">
              <DialogTitle id="responsive-dialog-title"><FormLabel><b>Define MIlestones for Project</b></FormLabel></DialogTitle>
              </MDBRow>
              </div>
              <DialogContent >
             
      <Products proname={this.state.Projectname} closepropt={this.handleCloses}/>

            
              </DialogContent>
              <DialogActions>
                <Buttonn onClick={this.handleClose} color="primary">
                  Submit 
                </Buttonn>
                <Buttonn onClick={this.handleClose} color="primary" autoFocus>
                  Close
                </Buttonn>
              </DialogActions>
            </Dialog>


            {/* <Dialog 
            fullWidth={true}
            maxWidth='xl'
              open={this.state.open2}
             // onClose={this.handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title"><FormLabel><b>Define MIlestones for Project</b></FormLabel></DialogTitle>
              <DialogContent >
             
      <Products proname={this.state.Projectname} closepropt={this.handleClose}></Products>

            
              </DialogContent>
               <DialogActions>
                <Buttonn onClick={this.handleClose} color="primary">
                  Submit 
                </Buttonn>
                <Buttonn onClick={this.handleClose} color="primary" autoFocus>
                  Close
                </Buttonn>
              </DialogActions> 
            </Dialog> */}

            <form noValidate autoComplete="off">
            

            
            </form>
            <form noValidate autoComplete="off">

            </form>
          </div>
          
          </div>
         
      </div>
      
      </div>
      <div style={{position: "fixed", left: "0px", width: "100%", bottom: "0px", backgroundColor: "", color: "white",
   textAlign: "center"}}>
      <MDBFooter color="blue" className="font-small pt-4 mt-4" >
    
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.teamExxo.com"> teamExxo.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
    </div>

      </div>
     
    );
  }
}

const mapStateToProps = state => {
  return{

  project: state.project, 
 
}};

// export default AlertDialog;

export default connect(mapStateToProps,{AddProject,getprojectnames,addmilstones})(withStyles(styles)(Project))
