import React,{Component} from 'react';
import { MDBTable, MDBTableBody, MDBTableHead ,MDBBtn} from 'mdbreact';
import {getallprojects,ChangeStatus} from '../../../../../actions/ProjectActions'
import {connect} from 'react-redux'

class Projecttable extends React.Component{
    constructor(props){
        super(props)
        this.state={
          currentproject:{}
        }

    }
componentDidMount(){
    this.props.getallprojects()
}

changeState=(projects)=>{

this.props.ChangeStatus(projects)
}

render(){
  return (
      
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
     
          {this.props.project.projects.map((projects) => 
         <tr>
    
        <td >{""}</td>
          <td >{projects.Projectname}</td>
          <td >{projects.Initiatedate}</td>
          <td >{projects.Acadamicyear}</td>
          <td >{projects.ProjectType}</td>
          <td >{projects.Status.toString()                            
              }</td>
          <td key={projects._id}><MDBBtn  onClick ={()=>this.props.ChangeStatus(projects)} size="sm">Click</MDBBtn ></td>
         
          </tr>

          )}
    
   
                
    {console.log(this.props.project)}

        {/* <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr> */}
      </MDBTableBody>
      
    </MDBTable>
  
  );
}
}

const mapStateToProps = state => {
    return{
  
    project: state.project, 
   
  }};

export default connect(mapStateToProps,{getallprojects,ChangeStatus})(Projecttable);