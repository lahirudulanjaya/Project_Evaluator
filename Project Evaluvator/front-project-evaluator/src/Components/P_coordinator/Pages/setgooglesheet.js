import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import { getallprojects } from '../../../actions/ProjectActions'
import { connect } from 'react-redux'
import { Header,Input,Popup } from 'semantic-ui-react'
import axios from 'axios'
import swal from 'sweetalert';
import { yellow } from '@material-ui/core/colors';

class Setgooglesheet extends Component {
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
  componentWillReceiveProps(nextprops){
    console.log(nextprops)
    this.setState({projects:nextprops.project.projects})

  }
  deleteurl=(name)=>{
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {

    axios.delete("http://localhost:4000/api/deletesheet/"+name)
    .then(res=>{
      swal("Sussefully deleted")
      this.props.getallprojects()
    })
    .catch(err=>{
      swal ( "Oops" ,  "Something went wrong!!!" ,  "error" )
    })
  }
})
  }

  onOpen=(name)=>{
    const post ={
      sheetid:this.state.sheetid,
      Projectname:name,
      Sheeturl:this.state.sheeturl
    }
   // console.log(post)
    axios.post("http://localhost:4000/api/setgooglesheet",post)
    .then(res=>{
      swal("Sussefully uploaded")
      //this.props.getallprojects()
    }).catch(err=>{
      swal ( "Oops" ,  "Something went wrong!!!" ,  "error" )
      console.log(err)
    })

  }
  
  render() {
   var headerrrr =<div><h3>When adding googlesheet to project you need to share your googlesheet with</h3><h3 style={{color:"yellow"}}> ucscprojectevaluation@ucsc-projec-tevaluation.iam.gserviceaccount.com</h3></div>
    return (
      <div className="container">

        
        <div className="row pt-2 ml-3">
        <Card.Group>
        <Card className="ml-5" fluid color='orange' header='Before add googlesheet to project you need to create groups' />
        <Card className="ml-5" fluid color='green' header= {headerrrr}/>
    
  </Card.Group>

       <div class="col-sm ml-5 pt-3" style={{borderStyle:'solid',background:'#03002e',marginTop:'50px'}}>
       <Card.Group>
          {this.state.projects.map(projects =>
          
            
              <Card color="grey" >
                <Card.Content>
                  <Card.Header onClick={this.sd}>{projects.Projectname}</Card.Header>
                  <Card.Meta>
                    <span className='date'><h5>Project Initiate date is :</h5>{projects.Initiatedate}</span>
                  </Card.Meta>
                  <Card.Content extra>
                  {!(projects.Sheeturl) ?
                    <div className='ui two buttons'>
                      
          <Popup
    trigger={<Button primary  >
   Add Google sheet details
</Button>}
    on ='click'
    content={<div><Input  focus placeholder='Enter Sheeturl' value={this.state.sheeturl} onChange={this.onChange} name="sheetid" /><Button  color='green' onClick={()=>this.onOpen(projects.Projectname)}>Submit</Button></div>}
    basic
  />
                    </div>:
                    <div basic style={{color:'green'}}>
                      Sheeturl : <a  onClick={()=>this.openSheet(projects.Sheeturl)}>{projects.Sheeturl}</a>
                      <div>
                      <Button color='red' onClick={()=>this.deleteurl(projects.Projectname)}>remove </Button>
                      </div>
                    </div>
                  }
                  </Card.Content>
                </Card.Content>
              </Card>
            
          )}
          </Card.Group>
          </div>




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

export default connect(mapStateToProps, { getallprojects })(Setgooglesheet)
