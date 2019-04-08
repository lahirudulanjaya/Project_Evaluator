import React, { Component } from 'react'
import {getmilestones} from '../../../../actions/milestoneActions'
import {connect} from 'react-redux'
import {getprojectnames} from '../../../../actions/ProjectActions'

import { MDBTable, MDBTableBody, MDBTableHead ,MDBBtn,MDBBadge} from 'mdbreact';
import Sidebar from '../../Component/Sidebar2';
import './Milestone.css'
import FormLabel from '@material-ui/core/FormLabel';

var divStyle={
  background:"#6699FF",
  height: "1000px",
};

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
       <div className="col-sm-3" style={divStyle}>
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


export default connect(mapStateToProps,{getmilestones,getprojectnames})(Milestones);

