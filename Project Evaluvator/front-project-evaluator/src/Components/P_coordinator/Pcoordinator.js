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
      sheeturl:'',
      Projectname:''
    }
    this.props.getallprojects()
    this.onChange = this.onChange.bind(this)
  }


  onChange(e) {
    this.setState(
      {sheeturl: e.target.value},
      );
      const sheetid =e.target.value.split('/')
      
      this.setState({sheetid:sheetid[5]})
  }
  openSheet(url){
    window.open(url)
  }

  onOpen=(name)=>{
    const post ={
      sheetid:this.state.sheetid,
      Projectname:name,
      Sheeturl:this.state.sheeturl
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

      <h3>  When adding googlesheet to project you need to share your googlesheet with <b><i>ucscprojectevaluation@ucsc-projec-tevaluation.iam.gserviceaccount.com</i></b></h3>
          {this.props.project.projects.map(projects =>
          
            <div class="col-sm">
            {console.log(projects)}
              <Card>
                <Card.Content>
                  <Card.Header onClick={this.sd}>{projects.Projectname}</Card.Header>
                  <Card.Meta>
                    <span className='date'>Project Initiate date is {projects.Initiatedate}</span>
                  </Card.Meta>
                  <Card.Content extra>
                  {!(projects.Sheeturl) ?
                    <div className='ui two buttons'>
                      
          <Popup
    trigger={<Button basic color='green' >
   Add Google sheet details
</Button>}
    on ='click'
    content={<div><Input  focus placeholder='Enter Sheetid' value={this.state.sheeturl} onChange={this.onChange} name="sheetid" /><Button basic color='green' onClick={()=>this.onOpen(projects.Projectname)}>Submit</Button></div>}
    basic
  />
                    </div>:
                    <div basic color='green'>
                      Sheeturl : <a onClick={()=>this.openSheet(projects.Sheeturl)}>{projects.Sheeturl}</a>
                    </div>
                  }
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
