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
import {MDBContainer,MDBFooter} from 'mdbreact';

import evaluaterImg from '../../images/project-coordinater-images/evaluaters.jpg'
import projectImg from '../../images/project-coordinater-images/project.jpg'
import studentImg from '../../images/project-coordinater-images/student.jpg'
import LoadingBar from 'react-redux-loading-bar'



class Pcoodinater extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projectcount:0,
      evaluvatorscount:0,
      studentcount:0,
      projects: [],
      sheetid:'',
      sheeturl:'',
      Projectname:''
    }
    this.props.getallprojects()
    this.onChange = this.onChange.bind(this)
  }

componentDidMount(){
  axios.get("http://localhost:4000/api/getprojectscount").then(res=>{
    this.setState({projectcount:res.data})
  })
  axios.get("http://localhost:4000/api/getstudentcount").then(res=>{
    this.setState({studentcount:res.data})
  })
  axios.get("http://localhost:4000/api/getevaluvatorscount").then(res=>{
    this.setState({evaluvatorscount:res.data})
  })
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
      
      <div className="container-fluid" >
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-3 pt-3">
            <div class="card text-white bg-primary mb-3" style={{width:"20rem", height:"12rem",fontSize:25}}>
              <div class="card-header text-left"><i className="fa fa-fw fa-file" style={{ fontSize: '1.75em' }} /></div>
              <div class="card-body">
                <h5 class="card-title text-right" style={{fontSize:15}}>Total Project</h5>
                <p style={{fontSize:25}} class="card-text text-white text-right"><CountUp end={this.state.projectcount}></CountUp></p>
              </div>
            </div>
          </div>
          <div className="col-sm-3 pt-3">
            <div class="card text-white bg-primary mb-3" style={{width:"20rem", height:"12rem",fontSize:25,}}>
              <div class="card-header text-left"><i className="fa fa-fw fa-file" style={{ fontSize: '1.75em' }} /></div>
                <div class="card-body">
                  <h5 class="card-title text-right" style={{fontSize:15}}>Total Project</h5>
                  <p style={{fontSize:25}} class="card-text text-white text-right"><CountUp end={this.state.projectcount}></CountUp></p>
              </div>
            </div>
          </div>
          <div className="col-sm-3 pt-3">
            <div class="card text-white bg-primary mb-3" style={{width:"20rem", height:"12rem",fontSize:25}}>
              <div class="card-header text-left"><i className="fa fa-fw fa-users" style={{ fontSize: '1.75em' }} /></div>
                <div class="card-body">
                  <h5 class="card-title text-right" style={{fontSize:15}}>Student Count</h5>
                  <p style={{fontSize:25}} class="card-text text-white text-right"><CountUp end={this.state.studentcount}></CountUp></p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10 pt-3">
    {this.props.project.projects.length>0 ?
    <div style={{border:'2px solid #AFB1B4', borderRadius:'5px', backgroundColor:'#C2C5C9'}}>
        <Header as='h2' icon textAlign='center'>
          <h3 style={{backgroundColor:'#AFB1B4',color:'#1d1e22',padding:'12px',marginBottom:'30px'}} ><i className="fa fa-fw fa-file" style={{ fontSize: '1.50em' }} />&nbsp; All Projects</h3>


          

        </Header>
        <div className="row">

          {this.props.project.projects.map(projects =>
          
            <div className="col-sm ml-5 pb-4">
            {console.log(projects)}
              <Card style={{backgroundColor:'#E3E6EC'}}>
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
        :
        <div>  <h3 style={{backgroundColor:'#00003f',color:'white',padding:'12px',borderRadius:'5px',marginBottom:'30px'}} >No Projects Found</h3>
        </div>}
        </div>
        </div>
        </div>
        <div style={{position: "fixed", left: "0px", width: "100%", bottom: "0px", backgroundColor: "", color: "white",
   textAlign: "center"}}>
      <MDBFooter color="blue" className="font-small pt-4 mt-4" >
    
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.teamExxo.com"> teamExxo.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
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
