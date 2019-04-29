import React, { Component } from 'react';
import Sidebar from './Component/Sidebar2'
import { Route } from 'react-router-dom';
import Project from './Pages/Project/Project'
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import { getallprojects } from '../../actions/ProjectActions'
import { connect } from 'react-redux'
import { Header,Input,Popup } from 'semantic-ui-react'
import axios from 'axios'
import swal from 'sweetalert';

class Pcoodinater extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: [],
      sheetid:'',
      Projectname:''
    }
    this.props.getallprojects()
    this.onChange = this.onChange.bind(this)
  }


  onChange(e) {

    

    this.setState(
      {[e.target.name]: e.target.value},
      );
  }

  onOpen=(name)=>{
    const post ={
      sheetid:this.state.sheetid,
      Projectname:name
    }
    console.log(post)
    axios.post("http://localhost:4000/api/setgooglesheet",post)
    .then(res=>{
      swal("Sussefully uploaded")
    }).catch(err=>{
      swal ( "Oops" ,  "Something went wrong!!!" ,  "error" )
      console.log(err)
    })

  }
  render() {
    return (
      <div className="container">

        <Header as='h2' icon textAlign='center'>
          <Icon name='settings' circular />
          <Header.Content>All Projects</Header.Content>
        </Header>
        <div className="row">
          {this.props.project.projects.map(projects =>
            <div class="col-sm">
              <Card>
                <Card.Content>
                  <Card.Header onClick={this.sd}>{projects.Projectname}</Card.Header>
                  <Card.Meta>
                    <span className='date'>Project Initiate date is {projects.Initiatedate}</span>
                  </Card.Meta>
                  <Card.Content extra>
                    <div className='ui two buttons'>
                      
          <Popup
    trigger={<Button basic color='green' >
   Add Google sheet details
</Button>}
    on ='click'
    content={<div><Input  focus placeholder='Enter Sheetid' value={this.state.sheetid} onChange={this.onChange} name="sheetid" /><Button basic color='green' onClick={()=>this.onOpen(projects.Projectname)}>Submit</Button></div>}
    basic
  />

                    </div>
                  </Card.Content>
                </Card.Content>
              </Card>
            </div>
          )}




        </div>

      </div>
    )
  }
}
const mapStateToProps = state => {
  return {

    project: state.project,

  }
};

export default connect(mapStateToProps, { getallprojects })(Pcoodinater)
