import React,{Component} from 'react';
import { MDBTable, MDBTableBody, MDBTableHead ,MDBIcon,MDBCard,MDBFooter,MDBContainer} from 'mdbreact';

import {getallprojects} from '../../../../actions/ProjectActions'
import {connect} from 'react-redux'
import {Input} from 'semantic-ui-react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Form,Dropdown,Button} from 'semantic-ui-react'
import _ from 'lodash'
import axios from 'axios'
import swal from 'sweetalert';

class UpdateProject extends React.Component{
    constructor(props){
        super(props)
        this.state={
          currentproject:{},
          projects:[],
          filtervalue:'',
          Projects:[],
          open:false,
          updateProject:{
              Projectname:'',
              Initiatedate:'',
              Acadamicyear:'',
              ProjectType:''

          }
        }
        this.props.getallprojects()
        this.serchProject=this.serchProject.bind(this)
        this.onchange1=this.onchange1.bind(this)
        this.onchange=this.onchange.bind(this)
    }
componentDidMount(){
    
}
componentWillMount(){
  this.props.getallprojects()

}
serchProject(e){
this.setState({filtervalue:e.target.value})
var Projects=[]
this.state.Projects.map(projects=>{
    var name =projects.Projectname
    if(name.includes(e.target.value)){
        Projects.push(projects)
    }

})
this.setState({projects:Projects})
}
handleClickOpen = (project) => {
    this.setState({ open: true });
    this.setState(prevState => ({
      updateProject: {
          ...prevState.updateProject,
          Projectname: project.Projectname,
          Acadamicyear:project.Acadamicyear,
          ProjectType:project.ProjectType,
          Initiatedate:project.Initiatedate
      }
  }))
    console.log(project)
  };
  
  handleClose = () => {
    this.setState({ open: false });
  };
  onchange1(e,data){
    var namee =data.name
    var value =data.value


    this.setState(prevState => ({
        updateProject: {
          ...prevState.updateProject,
          [namee]:value
      }
  }))
    
  }
  onchange(e){
    var namee =e.target.name
    var value =e.target.value


    this.setState(prevState => ({
        updateProject: {
          ...prevState.updateProject,
          [namee]:value
      }
  }))
    
  }

  updateProject=()=>{
    
   
    axios.put("http://localhost:4000/api/pg/updateproject",this.state.updateProject).then(res=>{

        swal({
          title: "Good job!",
          text: "You have succesfully Change Status!",
          icon: "success",
        });
        this.props.getallprojects()
    })
    .catch(err=>{
        swal ( "Oops" ,  "Something went wrong!!!" ,  "error" )
    })
    
  }
  ondelete(name){

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {

axios.delete("http://localhost:4000/api/pg/deleteproject/"+name)
     .then(res=>{
        swal({
            title: "Good job!",
            text: " succesfully Deleted!",
            icon: "success",
          });
          this.props.getallprojects()
     })
     .catch(err=>{
        swal ( "Oops" ,  "Something went wrong!!!" ,  "error" )
    })

       
      } 
    });




   
    
  }

componentWillReceiveProps(nextprops){
  this.setState({projects:nextprops.project.projects,Projects:nextprops.project.projects})
  console.log(nextprops)
}

render(){
   
      var stateOptions=[
        {
        id:1,
        text:'Group',
        value:'Group'
        },
        {
          id:2,
          text:'Individual',
          value:'Individual'
        }
      ]
  return (
      
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6 pt-3">  
              <div class="card text-white bg-primary mb-3" style={{width:"35rem", height:"12rem",fontSize:25}}>
                  <div class="card-header text-center p-3">Search project</div>
                  <div class="card-body">
                    <div className="row pt-3" style={{fontSize:15}}>
                      <div className="col-sm-3 pt-3">
                        Project name
                      </div>
                      <div className="col-sm-9">
                        <Input icon='search' placeholder='Search...' onChange={this.serchProject} value={this.state.filtervalue}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
           
           <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth={true}
          maxWidth="sm"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        ><DialogTitle id="alert-dialog-title">{"Update Milestones"}</DialogTitle>
        <DialogContent>
         
         <Form>
    <Form.Field>
      <label>Name</label>
      <input value={this.state.updateProject.Projectname} name="Projectname" onChange={this.onchange}/>
    </Form.Field>
   
    <Form.Field>
      <label>Initiate date</label>
      <input value={this.state.updateProject.Initiatedate} name="Initiatedate"onChange={this.onchange} type="date"/>
    </Form.Field>
    <Form.Field>
      <label>Acadamic year</label>
      <input value={this.state.updateProject.Acadamicyear} name="Acadamicyear"onChange={this.onchange} type="number"/>
    </Form.Field>
    <Form.Field>
      <label>Group or Individual</label>
      <Dropdown placeholder='Group / Individual'  selection options={stateOptions} value={this.state.updateProject.ProjectType} name ="ProjectType"onChange={this.onchange1}/>
    </Form.Field>
   
  </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.updateProject} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <div className="container">
      <div className="row">
      <div className="col-sm-12">
      
      

      
      <div className="">
        <MDBCard style={{backgroundColor:"#D4D8DE"}}>
          <div className="container pt-3 pb-3" >
    <MDBTable responsive style={{border:'2px solid #AFB1B4', borderRadius:'10px'}}>
    
      <MDBTableHead color="blue" textWhite>
      
      

        <tr style={{color:'#dfdfdf',backgroundColor:'#3978D7'}}>
          <th>#</th>
          <th>Project Name</th>
          <th>Initiate Date</th>
          <th>Academic Year</th>
          <th>Project Type</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
     {console.log(this.state.projects)}
          {this.state.projects.map((projects) => 
         <tr>
    
        <td >{""}</td>
          <td >{projects.Projectname}</td>
          <td >{projects.Initiatedate}</td>
          <td >{projects.Acadamicyear}</td>
          <td >{projects.ProjectType}</td>
          <td><MDBIcon far icon="edit" className="indigo-text pr-3" size="2x" onClick={()=>this.handleClickOpen(projects)} /></td>
       <td><MDBIcon icon="trash" className="red-text pr-3" size="2x"onClick={()=>this.ondelete(projects.Projectname)}/> </td> 
         
          </tr>

          )}
    
   
                
   
      </MDBTableBody>
      
    </MDBTable>
    </div>
   </MDBCard>
   </div>
   </div>
   </div>
   </div>
  
   </div>
    
  
  );
}
}

const mapStateToProps = state => {
    return{
  
    project: state.project, 
   dd:state
  }};

export default connect(mapStateToProps,{getallprojects})(UpdateProject);




