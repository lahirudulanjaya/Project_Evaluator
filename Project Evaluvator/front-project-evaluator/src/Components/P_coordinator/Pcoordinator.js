import React ,{ Component }  from 'react';
import Sidebar from './Component/Sidebar2'
import { Route } from 'react-router-dom';
import Project from './Pages/Project/Project'
import { Card, Icon, Image,Button } from 'semantic-ui-react'
import {getallprojects} from '../../actions/ProjectActions'
import {connect} from 'react-redux'
import { Header } from 'semantic-ui-react'

class Pcoodinater extends Component{
    constructor(props){
        super(props)
        this.state={
            projects:[]
        }
        this.props.getallprojects()
    }
    

    render(){
        return(
            <div className="container">
                
                <Header as='h2' icon textAlign='center'>
      <Icon name='settings' circular />
      <Header.Content>All Projects</Header.Content>
    </Header>
    <div className="row">    
        {this.props.project.projects.map(projects=>
        <div class="col-sm ml-4">
         <Card>
        <Card.Content>
        <Card.Header>{projects.Projectname}</Card.Header>
        <Card.Meta>
          <span className='date'>Project Initiate date is {projects.Initiatedate}</span>
        </Card.Meta>
        <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Add Marks
          </Button>
          
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
    return{
  
    project: state.project, 
   
  }};

export default connect(mapStateToProps,{getallprojects})(Pcoodinater)
