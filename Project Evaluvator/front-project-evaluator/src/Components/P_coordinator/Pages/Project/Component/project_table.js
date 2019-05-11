import React,{Component} from 'react';
import { MDBTable, MDBTableBody, MDBTableHead ,MDBBtn} from 'mdbreact';
import {getallprojects,ChangeStatus} from '../../../../../actions/ProjectActions'
import {connect} from 'react-redux'
import {Card} from 'semantic-ui-react'
class Projecttable extends React.Component{
    constructor(props){
        super(props)
        this.state={
          currentproject:{},
          projects:[]
        }
        this.props.getallprojects()

    }
componentDidMount(){
    
}
componentWillMount(){
  this.props.getallprojects()

}


changeState=(projects)=>{
this.props.getallprojects()
this.props.ChangeStatus(projects)

}
componentWillReceiveProps(nextprops){
  this.setState({projects:nextprops.project.projects})
  console.log(nextprops)
}

render(){
  return (
      <div> <h2><b>Current Projects </b></h2>
    <MDBTable responsive>
    
      <MDBTableHead color="primary-color" textWhite>
      
      

        <tr>
          <th>#</th>
          <th>Project Name</th>
          <th>Initiate Date</th>
          <th>Academic Year</th>
          <th>Project Type</th>
          <th>Project Status</th>
          <th>Start/Stop</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
     
          {this.state.projects.map((projects) => 
         <tr>
    
        <td >{""}</td>
          <td >{projects.Projectname}</td>
          <td >{projects.Initiatedate}</td>
          <td >{projects.Acadamicyear}</td>
          <td >{projects.ProjectType}</td>
          <td >{projects.Status.toString()                            
              }</td>
          <td key={projects._id}><MDBBtn  onClick ={()=>this.changeState(projects)} size="sm">Click</MDBBtn ></td>
         
          </tr>

          )}
    
   
                
    {console.log(this.props.project)}

 
      </MDBTableBody>
      
    </MDBTable>
    </div>
  
  );
}
}

const mapStateToProps = state => {
    return{
  
    project: state.project, 
   dd:state
  }};

export default connect(mapStateToProps,{getallprojects,ChangeStatus})(Projecttable);




