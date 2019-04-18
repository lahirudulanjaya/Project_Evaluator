import{BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import React, {Component}from 'react'

import Milestones from './Components/P_coordinator/Pages/Project/updateMilestones';
import Project from './Components/P_coordinator/Pages/Project/Project';
import Student from './Components/P_coordinator/Pages/Student/Student';
import Pcoordinator from './Components/P_coordinator/Pcoordinator';

class RouteFile extends Component{
    render() {
        return (
            <div>
            <Route path = "/project" component ={props => <Pcoordinator/>}/>
            <Route path="/devices" component={props => < Project/>} />
            <Route path="/student" component={props => < Student/>} />
            <Route path="/pg/project" component={props => < Project/>} /> 
            <Route path="/pg/milestone" component={props => <Milestones/>}/>                       
            </div>

        );
      }
}
export default RouteFile;