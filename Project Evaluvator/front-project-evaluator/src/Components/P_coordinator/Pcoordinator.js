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
import CountUp from 'react-countup';

import evaluaterImg from '../../images/project-coordinater-images/evaluaters.jpg'
import projectImg from '../../images/project-coordinater-images/project.jpg'
import studentImg from '../../images/project-coordinater-images/student.jpg'



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

      <div class="ui three doubling stackable cards">
        
          <Card style={{width: '15%',height: '15%',margin: '100px'}}>
          <img  src={projectImg} wrapped ui={false} />
          <Card.Content>
            <Card.Header> Total Projects</Card.Header>
            <Card.Meta>
          
            <h1> <span className='date'> <CountUp end={100} /></span></h1>
            </Card.Meta>
        
          </Card.Content>
      
        </Card>
        <Card style={{width: '15%',height: '15%',margin: '100px'}}>
          <img src={studentImg} wrapped ui={false} />

          <Card.Content>
            <Card.Header> Total Students</Card.Header>
            <Card.Meta>
            
            <h1> <span className='date'> <CountUp end={100} /></span></h1>
            </Card.Meta>
        
          </Card.Content>
        
        </Card>
        <Card style={{width: '15%',height: '15%',margin: '100px'}}>
        
          <img src={evaluaterImg} wrapped ui={false} />

          <Card.Content>
            <Card.Header> Total Evaluvators</Card.Header>
            <Card.Meta>
            
            <h1> <span className='date'> <CountUp end={100} /></span></h1>
            </Card.Meta>
        
          </Card.Content>
        
        </Card>

  </div>
    
        <Header as='h2' icon textAlign='center'>
          <h3 style={{backgroundColor:'#302f2f',color:'#e8eaed',padding:'12px',borderRadius:'5px',marginBottom:'30px'}} >All Projects</h3>


          

        </Header>
        <div className="row">

          {this.props.project.projects.map(projects =>
          
            <div className="col-sm ml-5 pt-3">
            {console.log(projects)}
              <Card color="blue">
                <Card.Content>
                  <Card.Header onClick={this.sd}>{projects.Projectname}</Card.Header>
                  <Card.Meta>
                    <span className='date'>Project Initiate date is {projects.Initiatedate}</span>
                  </Card.Meta>
                  <Card.Content extra>
                  
                  
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
