import React, { Component } from 'react'
import {getmilestones,updatemilestone,delemilestone} from '../../../../actions/milestoneActions'
import {connect} from 'react-redux'
import {getprojectnames} from '../../../../actions/ProjectActions'
import { Link } from 'react-router-dom'
import { MDBTable, MDBTableBody, MDBTableHead ,MDBBtn,MDBDataTable, Input,MDBFooter} from 'mdbreact';
import axios from'axios'
import swal from 'sweetalert'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Form,Dropdown} from 'semantic-ui-react'
import _ from 'lodash'

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer,MDBIcon} from 'mdbreact';
import { Button,Card} from 'semantic-ui-react'
import { consolidateStreamedStyles } from 'styled-components';
var stud

var cardStyle={
    backgroundColor: "#DFDFDF",
    size: 'sm'
  }
var groupno
class UpdateGroups extends React.Component{
  constructor(props){
    super(props)
    this.state={
      Projectname:'',
       groups:[],
       updategroups:
         {
        groupno:'',
        students:[{
          Registrationnumber:'',
          Name:''
        }],
        supervisor:'',
        mentor:'',
       

         }
       ,
       open:false,
       Registrationnumber:'',
       Name:''

    }
    this.handleChange =this.handleChange.bind(this)
    this.onchange=this.onchange.bind(this)

  }
  handleClose = () => {
    this.setState({ open: false });
  };
  handleClickOpen = (group) => {
    this.setState({ open: true });
    this.setState(prevState => ({
      updategroups: {
          ...prevState.updategroups,
          groupno: group.groupno,
          students:group.students,
          supervisor:group.supervisor,
          mentor:group.mentor
      }
  }))
  groupno=group.groupno
  stud=group.students.map(stu=>
    <div class="two fields">
<Input value={stu.Registrationnumber} onChange={(e) => {this.onchange1(e, group.groupno,stu.Name)}} name="Registrationnumber" ></Input>
<Input value={stu.Name} onChange={(e) => {this.onchange1(e, group.groupno,stu.Registrationnumber)}} name="Name"></Input>
</div>
)
  
    
  };
 
  handleChange(e,data){
    
    let value = data.value

    this.setState({
      Projectname: value,
    })
    axios.get("http://localhost:4000/api/pg/getproject/"+value)
     .then(res=>{
       console.log(res.data)
       this.setState({groups:res.data})
      })
     .catch(err=>{
      console.log(err)
    })
  }
  

  deletegroups=(value)=>{

    axios.put("http://localhost:4000/api/deletegroups/"+value)
     .then(res=>{
       swal('success')
       axios.get("http://localhost:4000/api/pg/getproject/"+this.state.Projectname)
       .then(res=>{
         console.log(res.data)
         this.setState({groups:res.data})
        })
       .catch(err=>{
        console.log(err)
      })
      })
     .catch(err=>{
      swal ( "Oops" ,  "Something went wrong!!!" ,  "error" )

    })
  }

  updateGroups=(groupno)=>{
var groups=[]
    this.state.groups[0].groups.forEach(element => {
      if(element.groupno==groupno)
      {
        groups.push(this.state.updategroups)
      }
      else{
        groups.push(element)
      }
});
var Grps={
  Projectname: this.state.Projectname,
groups:groups
}
console.log(Grps)
axios.put("http://localhost:4000/api/pg/addGroups", Grps)
.then(res => {
  swal({
    title: "Good job!",
    text: "You have succesfully Submit Groups!",
    icon: "success",
  });

  axios.get("http://localhost:4000/api/pg/getproject/"+this.state.Projectname)
  .then(res=>{
    console.log(res.data)
    this.setState({groups:res.data})
   })
  .catch(err=>{
   console.log(err)
 })
})
.catch(err => {
  console.log(err)
})
    
    
  }

  deleteoneGroup=(groupno)=>{
    var groups=[]
    this.state.groups[0].groups.forEach(element => {
      if(!(element.groupno==groupno))
      {
        groups.push(element)
      }
      
});
var Grps={
  Projectname: this.state.Projectname,
groups:groups
}
console.log(Grps)
axios.put("http://localhost:4000/api/pg/addGroups", Grps)
.then(res => {
  swal({
    title: "Good job!",
    text: "You have succesfully Submit Groups!",
    icon: "success",
  });

  axios.get("http://localhost:4000/api/pg/getproject/"+this.state.Projectname)
  .then(res=>{
    console.log(res.data)
    this.setState({groups:res.data})
   })
  .catch(err=>{
   console.log(err)
 })
})
.catch(err => {
  console.log(err)
})
  }
  componentDidMount(){
    this.props.getprojectnames()
  }
  onchange1=(e,groupno,reg)=>{
    var namee =e.target.name
    var value =e.target.value
var newgrp=[]
    this.state.groups[0].groups.map(grp=>{
      if(grp.groupno==groupno){
        var student=[]
        grp.students.map(st=>{
          if(st.Registrationnumber==reg){
            const students={
              Registrationnumber:reg,
              Name:value,
              Projectname:this.state.Projectname
            }
            student.push(students)
          }
          else{
            student.push(st)
          }
        })
        var grup={
          students:student,
          groupno:grp.groupno,

        }
        newgrp.push(grup)
      }
      else{
        newgrp.push(grp)
      }
    })
    this.setState({updategroups:newgrp})
    var arr=[]
    arr.push({groups:newgrp})
    this.setState({groups:arr});
console.log(this.state)

  }
  onchange(e){
    var namee =e.target.name
    var value =e.target.value


    this.setState(prevState => ({
        updategroups: {
          ...prevState.updategroups,
          [namee]:value
      }
  }))
  }
    render(){
      console.log(this.state)

       
        var stateOptions3=[]
  this.props.project.project.map(project=>{
    
    var val={
      id:project._id,
      text:project.Projectname,
      value:project.Projectname
    }
    stateOptions3.push(val)
  })
        return(

    <div className="container">
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6 pt-3">  
          <div class="card text-white bg-primary mb-3" style={{width:"35rem", height:"12rem",fontSize:25}}>
              <div class="card-header text-center p-3">Update Groups</div>
              <div class="card-body">
                <div className="row pt-3" style={{fontSize:15}}>
                  <div className="col-sm-3 pt-3">
                    Select Project
                  </div>
                  <div className="col-sm-9">
                    <Dropdown placeholder='Select Project to Update Milestone'  selection options={stateOptions3}  value={this.state.Projectname} onChange={this.handleChange}/>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div className="col-sm-12 pt-3" >
        <div className="ml-3 pt-2">
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
      <label>group Number</label>
      <input value={this.state.updategroups.groupno} name="groupno" onChange={this.onchange}/>
    </Form.Field>
   
    <Form.Field>
      <label>Students</label>
  
      {stud}
            </Form.Field>
    <Form.Field>
      <label>Supervisor</label>
      <input value={this.state.updategroups.supervisor} name="supervisor"onChange={this.onchange} />
    </Form.Field>
    <Form.Field>
      <label>Mentor</label>
      <input value={this.state.updategroups.mentor} name="mentor"onChange={this.onchange} />
    </Form.Field>
   
  </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cansel
          </Button>
          <Button onClick={()=>this.updateGroups(this.state.updategroups.groupno)} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {this.state.groups.length>0 && this.state.groups[0].groups.length>0 ?
        <MDBCard>
          <MDBCardBody style={cardStyle}>
          <div className="text-right pb-3">
          <Button className="btn btn-danger" onClick={()=>this.deletegroups(this.state.Projectname)}>Delete all projects</Button>
          </div>
          <div style={{border:'2px solid #AFB1B4', borderRadius:'5px'}}>
          <MDBTable responsive>
            <MDBTableHead color="primary-color" textWhite>
              <tr style={{color:'#dfdfdf',backgroundColor:'#3978D7'}}>
                <th>Group No</th>
                <th>Students</th>
                <th>Supervisor</th>
                <th>Mentors</th>               
                <th>Update</th>
                <th>Delete</th>
                
              </tr>
            </MDBTableHead>
         
              <MDBTableBody>
                    {this.state.groups[0].groups.map(group=>
                <tr>
                <td>{group.groupno}</td>
                <td>{group.students.map(grp=>
                  <div>
{grp.Registrationnumber+" "}
{grp.Name}
</div>
                )}</td>
                <td>{group.supervisor}</td>
                <td>{group.mentor}</td>
                
                
        <td><MDBIcon far icon="edit" className="indigo-text pr-3" size="2x" onClick={()=>this.handleClickOpen(group)} /></td>
       <td><MDBIcon icon="trash" className="red-text pr-3" size="2x"onClick={()=>this.deleteoneGroup(group.groupno)}/> </td>     


                </tr>
              )}
             </MDBTableBody>
              
             
            
            </MDBTable>
            </div>
          </MDBCardBody>
        </MDBCard>
         :
         <div hidden={!(this.state.Projectname.length>0)}>              <Card fluid color='red' header='No groups found ...... click here for create groups' /><Button secondary ><Link to="/pg/creategroups"> Create</Link></Button></div>
        
                     }
        </div>
       
        
        </div>
        </div>
   
        </div>
        
        )
        }
}
const mapStateToProps = state => {
    return{
  
      milestone: state.milestone, 
      project :state.project,
     ss:state,
   
  }};
  
  
  export default connect(mapStateToProps,{getprojectnames})(UpdateGroups);