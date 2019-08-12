import React,{Component} from 'react';
import { MDBTable, MDBTableBody, MDBTableHead ,MDBBtn} from 'mdbreact';
import {getallprojects,ChangeStatus} from '../../../../../actions/ProjectActions'
import {connect} from 'react-redux';
import controlProjecticonImg from   '../../../../../../src/images/icon/controlProjecticon.png';
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
      <div>
        {this.state.projects.length>0 ?
    <MDBTable style={{borderRadius:'5px'}} responsive>

      <MDBTableHead color="primary-color" textWhite>
        <tr style={{border:'2px solid black', borderRadius:'5px',color:'white',backgroundColor:'#043E9E'}}>
          <th><img src={controlProjecticonImg} alt='#'/></th>
          <th><b>Project Name</b></th>
          <th><b>Initiate Date</b></th>
          <th><b>Academic Year</b></th>
          <th><b>Project Type</b></th>
          <th><b>Project Status</b></th>
          <th><b>Start/Stop</b></th>
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
          <td key={projects._id}><MDBBtn  onClick ={()=>this.changeState(projects)} size="sm" >Click</MDBBtn ></td>
         
          </tr>

          )}
    
   
                
    

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
    :
    <div><Card fluid color="red" header="You haven't created any Projects click CREATE PROJECT to create a new project" /></div>
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

export default connect(mapStateToProps,{getallprojects,ChangeStatus})(Projecttable);




