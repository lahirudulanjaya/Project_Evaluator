import React, { Component } from 'react'
import {getmilestones} from '../../../../actions/milestoneActions'
import {connect} from 'react-redux'
import {getprojectnames} from '../../../../actions/ProjectActions'
import { MDBTable, MDBTableBody, MDBTableHead ,MDBBtn} from 'mdbreact';

class Milestones extends Component {
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
  onClick=()=>{
    console.log(this.props.milestone)
    
  }
  componentDidMount(){
    this.props.getprojectnames()
    
  }
  componentWillMount(){

  }
  render() {
    return (
      <div>
        <h1>hii</h1>
       
        <select  class="form-control" value={this.state.id} onChange={this.handleChange} >
        {console.log(this.props.ss)}
          {this.props.project.project.map((project) => <option key={project._id} value={project.Projectname}>{project.Projectname}</option>)}
              </select>
              <button onClick={this.onClick}>show milestones</button>
              <BasicTable></BasicTable>
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

export const BasicTable = props => {
  return (
    <MDBTable>
      <MDBTableHead color="primary-color" textWhite>
        <tr>
          <th>#</th>
          <th>First</th>
          <th>Last</th>
          <th>Handle</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
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
        </tr>
      </MDBTableBody>
    </MDBTable>
  );
}