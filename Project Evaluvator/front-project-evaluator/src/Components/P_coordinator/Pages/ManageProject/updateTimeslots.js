import React,{Component} from 'react';
import { MDBTable, MDBTableBody, MDBTableHead ,MDBIcon} from 'mdbreact';

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
import {getprojectnames} from '../../../../actions/ProjectActions'


import { Card} from 'semantic-ui-react'
class Updatetimeslots extends React.Component{
    constructor(props){
        super(props)
        this.state={
          Projectname:'',
          changewith:'',
          timeslots:{
            Milestone:'',
            Timeslosts:[
              {
                start:'',
                end:'',
                evaluvators:[],
                venue:''
              }
            ],
            Evaluvatorlist:[]
          },
          selectedEvaluvator:'',
          withchangeEvaluvator:'',
          open:false,
          updateProject:{
              Projectname:'',
              Initiatedate:'',
              Acadamicyear:'',
              ProjectType:''

          }
        }
        this.serchProject=this.serchProject.bind(this)
        this.onchange1=this.onchange1.bind(this)
        this.onchange=this.onchange.bind(this)
        this.handleChange=this.handleChange.bind(this)

      }
    componentDidMount(){
        this.props.getprojectnames()
        
      }
componentWillMount(){

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
  //   this.setState(prevState => ({
  //     updateProject: {
  //         ...prevState.updateProject,
  //         Projectname: project.Projectname,
  //         Acadamicyear:project.Acadamicyear,
  //         ProjectType:project.ProjectType,
  //         Initiatedate:project.Initiatedate
  //     }
  // }))
    console.log(project)
  };
  handleClickOpen1 = (project) => {
    this.setState({ open1: true });
  //   this.setState(prevState => ({
  //     updateProject: {
  //         ...prevState.updateProject,
  //         Projectname: project.Projectname,
  //         Acadamicyear:project.Acadamicyear,
  //         ProjectType:project.ProjectType,
  //         Initiatedate:project.Initiatedate
  //     }
  // }))
  //   console.log(project)
  };
  
  handleClose = () => {
    this.setState({ open: false });
  };
  handleClose1 = () => {
    this.setState({ open1: false });
  };
  handleChange(e,data){
    
    let value = data.value

    this.setState({
      Projectname: value,
    })
    axios.get("http://localhost:4000/api/gettimeslots/"+value)
    .then(res=>{
      this.setState({timeslots:res.data})
      console.log(res.data)
    })
    .catch(err=>{
      swal ( "Oops" ,  "Something went wrong!!!" ,  "error" )

    })
  }
  onchange1(e,data){
    var namee =data.name
    var value =data.value


    this.setState({[namee] :value})
    
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
   
    axios.delete("http://localhost:4000/api/pg/deleteproject/"+name)
     .then(res=>{
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

componentWillReceiveProps(nextprops){
  this.setState({projects:nextprops.project.projects,Projects:nextprops.project.projects})
  console.log(nextprops)
}

render(){
  var stateOptions3=[]
  this.props.project.project.map(project=>{
    
    var val={
      id:project._id,
      text:project.Projectname,
      value:project.Projectname
    }
    stateOptions3.push(val)
  })
  var arr=[]
  

   
      var selectEvaluvators=[]
      this.state.timeslots.Evaluvatorlist.map(eva=>{
        var lis={
          id:eva.name,
          text:eva.name,
          value:eva.name
        }
        arr.push(eva.name)
        selectEvaluvators.push(lis)
      })
      var changewithEvaluvators=[]
      
      this.state.timeslots.Timeslosts.map(eva=>{
        if(eva.evaluvators.includes(this.state.selectedEvaluvator)){
          eva.evaluvators.forEach(element => {
          arr.forEach(ele => {
            if(ele==element){
              var index= arr.indexOf(element)
            if (index !== -1) arr.splice(index, 1);
            console.log(arr)
            }
            
          });
            
          });
        
        }
        
      
        
      
        })
        arr.map(eva=>{
          var lis={
            id:eva,
            text:eva,
            value:eva
          }
          changewithEvaluvators.push(lis)
        })
     
      
  return (
      <div>
 <Dropdown placeholder='Select Project to Update Milestone'  selection options={stateOptions3}  value={this.state.id} onChange={this.handleChange}/>
 
           <Input icon='search' placeholder='Search...' onChange={this.serchProject} value={this.state.filtervalue}/>
           <h2><b>All Projects</b></h2>
           <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth={true}
          maxWidth="sm"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        ><DialogTitle id="alert-dialog-title">{"Change Evaluvator"}</DialogTitle>
        <DialogContent>
         
         <Form>
    
    <Form.Field>
      <label>Select the Evaluvator</label>
      <Dropdown placeholder='Choose Evaluvator to Change'  selection options={selectEvaluvators} value={this.state.selectedEvaluvator} name ="selectedEvaluvator"onChange={this.onchange1}/>
    </Form.Field>
    <Form.Field>
      <label>Select evaluvator for change with</label>
      <Dropdown placeholder='Choose Evaluvator to Exchange'  selection options={changewithEvaluvators} value={this.state.changewith} name ="changewith"onChange={this.onchange1}/>
    </Form.Field>
  </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cansel
          </Button>
          <Button onClick={this.updateProject} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
          open={this.state.open1}
          onClose={this.handleClose1}
          fullWidth={true}
          maxWidth="sm"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        ><DialogTitle id="alert-dialog-title">{"Change Evaluvator"}</DialogTitle>
        <DialogContent>
         
         <Form>
    
    <Form.Field>
      <label>Select the Evaluvator</label>
      <Dropdown placeholder='Choose Evaluvator to Change'  selection options={selectEvaluvators} value={this.state.selectedEvaluvator} name ="selectedEvaluvator"onChange={this.onchange1}/>
    </Form.Field>
    <Form.Field>
      <label>Select evaluvator for change with</label>
      <Dropdown placeholder='Choose Evaluvator to Exchange'  selection options={changewithEvaluvators} value={this.state.changewith} name ="changewith"onChange={this.onchange1}/>
    </Form.Field>
  </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose1} color="primary">
            Cansel
          </Button>
          <Button onClick={this.updateProject} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Button secondary  onClick={()=>this.handleClickOpen1()} >Change Evaluvators</Button>
       <Button secondary onClick={()=>this.handleClickOpen()}>Replace Evaluvator</Button>
    <MDBTable responsive>
    
    
      <MDBTableHead color="primary-color" textWhite>
      
      

        <tr>
          <th>#</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Evaluvators</th>
          <th>Venue</th>
        
        </tr> 
      </MDBTableHead>
      <MDBTableBody>
     {console.log(this.state.projects)}
          {this.state.timeslots.Timeslosts.map((timeslots) => 
         <tr>
    
        <td >{""}</td>
          <td >{timeslots.start}</td>
          <td >{timeslots.end}</td>
          <td >{
            timeslots.evaluvators  }</td>
          <td>{timeslots.venue}</td>
        
        
         
          </tr>

          )}
    
   
                
    {console.log(this.props.project)}

      
      </MDBTableBody>
      
    </MDBTable>
    {
      console.log(this.state.timeslots.Timeslosts.length>0)
      
     
    }
    </div>
  
  );
}
}

const mapStateToProps = state => {
    return{
  
    project: state.project, 
   dd:state
  }};

export default connect(mapStateToProps,{getprojectnames})(Updatetimeslots);




