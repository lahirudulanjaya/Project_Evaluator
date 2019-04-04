import React, { Component } from 'react'
import {getmilestones} from '../../../../actions/milestoneActions'
import {connect} from 'react-redux'
import {getprojectnames} from '../../../../actions/ProjectActions'
import { MDBTable, MDBTableBody, MDBTableHead ,MDBBtn,MDBBadge} from 'mdbreact';
import Sidebar from '../../Component/Sidebar2';
import './Milestone.css'
import FormLabel from '@material-ui/core/FormLabel';

class Milestones extends Component
{
  constructor(props){
    super(props)
    this.state={
      id:'',
      milestones:[]
    }
    this.handleChange = this.handleChange.bind(this)
}
  handleChange(e){
    let index = e.nativeEvent.target.selectedIndex
    let value = e.nativeEvent.target[index].text

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
 componentWillReceiveProps(nextprops){
   this.setState({milestones:nextprops.milestone.milestone})
 }
  render() {
    return (
      <div className="row">
       <div className="col-sm-3">
          <Sidebar/>
        </div>
        <div className="col-sm-9">
        <div className="row">
<h4><b>select project</b></h4>
        <select  className="form-control" value={this.state.id} onChange={this.handleChange} >
       
          {this.props.project.project.map((project) => <option  value={project.Projectname}>{project.Projectname}</option>)}
              </select>
              
        
              <MDBTable responsive>
      <MDBTableHead color="primary-color" textWhite>
        <tr>
          <th>Milestone</th>
          <th>Time Duration(weeks)</th>
          <th>start</th>
          <th>finish</th>
          
        </tr>
      </MDBTableHead>
      <MDBTableBody>
              {this.state.milestones.map(milestones=>
          <tr>
          <td>{milestones.name}</td>
          <td>{milestones.Duration}</td>
          <td><MDBBtn>{milestones.start.toString()}</MDBBtn></td>
          <td><MDBBtn>{milestones.stop.toString()}</MDBBtn></td>


          </tr>
        )}
        </MDBTableBody>

      </MDBTable>

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


export default connect(mapStateToProps,{getmilestones,getprojectnames})(Milestones);

