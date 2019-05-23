import React, { Component } from 'react'
import {getmilestones,updatemilestone,delemilestone} from '../../../../actions/milestoneActions'
import {connect} from 'react-redux'
import {getprojectnames} from '../../../../actions/ProjectActions'

import { MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact';
import './updateMilestone.css'

import axios from'axios'
import swal from 'sweetalert'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Form,Dropdown} from 'semantic-ui-react'
import _ from 'lodash'

import { MDBCard, MDBCardBody,MDBIcon} from 'mdbreact';
import { Card} from 'semantic-ui-react'



var cardStyle={
  backgroundColor: "#DFDFDF",
  size: 'sm'
}

class Milestones extends Component
{

  constructor(props){
    super(props)
    this.state={
      updateMilestone:{
        name:'',
        Grp_or_I:'',
        MilstoneType:'',
        Markspresentatge:'',
        Duration:''

      },
      id:'',
      milestones:[],
      open: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.onchange=this.onchange.bind(this)
    this.onchange1 =this.onchange1.bind(this)
}


handleClickOpen = (milestone) => {
  this.setState({ open: true });
  this.setState(prevState => ({
    updateMilestone: {
        ...prevState.updateMilestone,
        name: milestone.name,
        Grp_or_I:milestone.Grp_or_I,
        MilstoneType:milestone.MilstoneType,
        Markspresentatge:milestone.Markspresentatge,
        Duration:milestone.Duration
    }
}))
  console.log(milestone)
};

handleClose = () => {
  this.setState({ open: false });
};
  handleChange(e,data){
    
    let value = data.value

    this.setState({
      id: value,
    })
    this.props.getmilestones(value)
  }
  showTable=()=>{

  }

  componentDidMount(){
    this.props.getprojectnames()
    
  }
  onchange(e){
    var namee =e.target.name
    var value =e.target.value


    this.setState(prevState => ({
      updateMilestone: {
          ...prevState.updateMilestone,
          [namee]:value
      }
  }))
    
  }
  onchange1(e,data){
    var namee =data.name
    var value =data.value


    this.setState(prevState => ({
      updateMilestone: {
          ...prevState.updateMilestone,
          [namee]:value
      }
  }))
    
  }
  
  updateMilestone=()=>{
    var Updatemilestone =this.state.updateMilestone
    Updatemilestone.Projectname=this.state.id
    this.props.updatemilestone(Updatemilestone)
    this.props.getmilestones(this.state.id)
  }
 componentWillReceiveProps(nextprops){
   this.setState({milestones:nextprops.milestone.milestone})
 }
 ondelete(name){
   const milestone ={
     name:name,
     Projectname:this.state.id
   }

   swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {

  axios.delete("http://localhost:4000/api/pg/deletemilestone",{data:milestone})
    .then(res=>{
       swal("sucess")
       this.props.getmilestones(this.state.id)
       
    })
    .catch(err=>{
      swal("error")
  })
    } 
  });




 
 }
  render() {
   var stateOptions=[
     {
     id:1,
     text:'presentation',
     value:'presentation'
     },
     {
       id:2,
       text:'document',
       value:'document'
     }
   ]
   var stateOptions1=[
    {
    id:1,
    text:'Individual',
    value:'Individual'
    },
    {
      id:2,
      text:'Group',
      value:'Group'
    }
  ]
  var stateOptions3=[]
  this.props.project.project.map(project=>{
    
    var val={
      id:project._id,
      text:project.Projectname,
      value:project.Projectname
    }
    stateOptions3.push(val)
  })
    return (

    <div className="container">
      <div className="row">

        <div className="col-sm-12 pt-3" >
        <Card className="ml-5" fluid color='orange' header='select project' />
                    <Dropdown placeholder='Select Project to Update Milestone'  selection options={stateOptions3}  value={this.state.id} onChange={this.handleChange}/>
        <div className="ml-5 pt-2">
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
      <input value={this.state.updateMilestone.name} name="name" onChange={this.onchange}/>
    </Form.Field>
    <Form.Field>
      <label>Milestone Type</label>
      <Dropdown placeholder='Milestone type'  selection options={stateOptions} value={this.state.updateMilestone.MilstoneType} name ="MilstoneType"onChange={this.onchange1}/>
      
    </Form.Field>
    <Form.Field>
      <label>Milestone Presentage</label>
      <input value={this.state.updateMilestone.Markspresentatge} name="Markspresentatge"onChange={this.onchange} type="number"/>
    </Form.Field>
    <Form.Field>
      <label>Time Duration</label>
      <input value={this.state.updateMilestone.Duration} name="Duration"onChange={this.onchange} type="number"/>
    </Form.Field>
    <Form.Field>
      <label>Group or Individual</label>
      <Dropdown placeholder='Group / Individual'  selection options={stateOptions1} value={this.state.updateMilestone.Grp_or_I} name ="Grp_or_I"onChange={this.onchange1}/>
    </Form.Field>
  </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cansel
          </Button>
          <Button onClick={this.updateMilestone} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>

        <MDBCard>
          <MDBCardBody style={cardStyle}>
          <MDBTable responsive>
            <MDBTableHead color="primary-color" textWhite>
              <tr>
                <th>Milestone</th>
                <th>Milstone Type</th>
                <th>Markspresentatge</th>
                <th>Time Duration(weeks)</th>
                <th>Group / Individual</th>
                <th>Update</th>
                <th>Delete</th>
                
              </tr>
            </MDBTableHead>
            <MDBTableBody>
                    {this.state.milestones.map(milestones=>
                <tr>
                <td>{milestones.name}</td>
                <td>{milestones.MilstoneType}</td>
                <td>{milestones.Markspresentatge}</td>
                <td>{milestones.Duration}</td>
                <td>{milestones.Grp_or_I}</td>
                
        <td><MDBIcon far icon="edit" className="indigo-text pr-3" size="2x" onClick={()=>this.handleClickOpen(milestones)} /></td>
       <td><MDBIcon icon="trash" className="red-text pr-3" size="2x"onClick={()=>this.ondelete(milestones.name)}/> </td>     


                </tr>
              )}
              </MDBTableBody>

            </MDBTable>
          </MDBCardBody>
        </MDBCard>
     
              
            </div>

             </div>
             </div>
             </div>
           
          

//       <div className='container-fluid'>
//         <div className='row'>
//           <div className='col-sm-3' style={divStyle}>
//             <Sidebar></Sidebar>
//           </div>
//           <div className='col-sm-9'>
//             <h1>hii</h1>
//           <div className="row">
//             <div className="col-sm-3 pb-3 pt-2"> 
//               <select  class="form-control" value={this.state.id} onChange={this.handleChange} >
//               {console.log(this.props.ss)}
//                 {this.props.project.project.map((project) => <option key={project._id} value={project.Projectname}>{project.Projectname}</option>)}
//                     </select>
//             </div>
//             <div className="col-sm-3 pb-3">
//               <a className="btn btn-primary" onClick={this.onClick}>show milestones</a>
//             </div>
//           </div>
//                   <BasicTable></BasicTable>
//           </div>
//         </div>
//       </div>

    )
  }
}

const mapStateToProps = state => {
  return{

    milestone: state.milestone, 
    project :state.project,
   ss:state,
 
}};


export default connect(mapStateToProps,{getmilestones,getprojectnames,updatemilestone,delemilestone})(Milestones);

