import React,{Component} from 'react';
import { MDBTable, MDBTableBody, MDBTableHead ,MDBIcon} from 'mdbreact';

import {getallprojects} from '../../../../actions/ProjectActions'
import {connect} from 'react-redux'
import {Search} from 'semantic-ui-react'
class UpdateProject extends React.Component{
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
Searchchange=(e,value)=>{
    this.setState({ isLoading: true, value })

}


changeState=(projects)=>{
this.props.getallprojects()

}
componentWillReceiveProps(nextprops){
  this.setState({projects:nextprops.project.projects})
  console.log(nextprops)
}

render(){
    const { isLoading, value, results } = this.state
  return (
      <div>
          <Search
            loading={isLoading}
            // onResultSelect={this.handleResultSelect}
            onSearchChange={this.Searchchange}
            
            results={results}
            value={value}
            {...this.props}
          />
           <h2><b>All Projects</b></h2>
    <MDBTable responsive>
    
      <MDBTableHead color="primary-color" textWhite>
      
      

        <tr>
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
     
          {this.state.projects.map((projects) => 
         <tr>
    
        <td >{""}</td>
          <td >{projects.Projectname}</td>
          <td >{projects.Initiatedate}</td>
          <td >{projects.Acadamicyear}</td>
          <td >{projects.ProjectType}</td>
          <td><MDBIcon far icon="edit" className="indigo-text pr-3" size="2x" onClick={()=>this.handleClickOpen(projects)} /></td>
       <td><MDBIcon icon="trash" className="red-text pr-3" size="2x"onClick={()=>this.ondelete(projects)}/> </td> 
         
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




