import React, { Component } from 'react'
import {getmilestones,updatemilestone,delemilestone} from '../../../../actions/milestoneActions'
import {connect} from 'react-redux'
import {getprojectnames} from '../../../../actions/ProjectActions'

import { MDBTable, MDBTableBody, MDBTableHead ,MDBBtn,MDBDataTable} from 'mdbreact';
import axios from'axios'
import swal from 'sweetalert'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Form,Dropdown} from 'semantic-ui-react'
import _ from 'lodash'

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer,MDBIcon} from 'mdbreact';
import { Card} from 'semantic-ui-react'

var cardStyle={
    backgroundColor: "#DFDFDF",
    size: 'sm'
  }

class UpdateGroups extends React.Component{
  constructor(props){
    super(props)
    this.state={
      Projectname:'',
       groups:[]

    }
    this.handleChange =this.handleChange.bind(this)
  }
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
  componentDidMount(){
    this.props.getprojectnames()
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
        return(
    <div className="container">
      <div className="row">

        <div className="col-sm-12 pt-3" >
        <Card className="ml-5" fluid color='orange' header='Select project' />
                    <Dropdown placeholder='Select Project to Update Milestone'  selection options={stateOptions3}  value={this.state.Projectname} onChange={this.handleChange}/>
        <div className="ml-5 pt-2">
        
        <MDBCard>
          <MDBCardBody style={cardStyle}>
          <MDBTable responsive>
            <MDBTableHead color="primary-color" textWhite>
              <tr>
                <th>Group No</th>
                <th>Students</th>
                <th>Supervisor</th>
                <th>Mentors</th>
               
                <th>Update</th>
                <th>Delete</th>
                
              </tr>
            </MDBTableHead>
         
              {this.state.groups.length>0 ?
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
                <td></td>
                <td></td>
                
                
        <td><MDBIcon far icon="edit" className="indigo-text pr-3" size="2x" onClick={()=>this.handleClickOpen()} /></td>
       <td><MDBIcon icon="trash" className="red-text pr-3" size="2x"onClick={()=>this.ondelete()}/> </td>     


                </tr>
              )}
             </MDBTableBody>
               :
        <div></div>
                    }
             

            </MDBTable>
          </MDBCardBody>
        </MDBCard>
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