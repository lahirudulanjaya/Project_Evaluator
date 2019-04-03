import React, { Component } from 'react'
import {getmilestones} from '../../../../actions/milestoneActions'
import {connect} from 'react-redux'
import {getprojectnames} from '../../../../actions/ProjectActions'


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
          {this.props.project.project.map((project) => <option key={project._id} value={project.Projectname}>{project.Projectname}</option>)}
              </select>
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