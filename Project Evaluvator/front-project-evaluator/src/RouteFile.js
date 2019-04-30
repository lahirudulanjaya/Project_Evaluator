import{BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import React, {Component}from 'react'

import Milestones from './Components/P_coordinator/Pages/Project/updateMilestones';
import Project from './Components/P_coordinator/Pages/Project/Project';
import Student from './Components/P_coordinator/Pages/Student/Student';
import Pcoordinator from './Components/P_coordinator/Pcoordinator';
import StudentTable from './Components/P_coordinator/Pages/Student/studentTable'
import  Timeslots from './Components/P_coordinator/Pages/Timeslots/Timeslots'


class RouteFile extends Component{
    render() {
        return (
            <div>
            <Route path = "/project" component ={props => <Pcoordinator/>}/>
            <Route path="/devices" component={props => < Project/>} />
            <Route path="/student" component={props => < Student/>} />
            <Route path="/pg/project" component={props => < Project/>} /> 
            <Route path="/pg/milestone" component={props => <Milestones/>}/>  
            <Route path="/pg/creategroups" component={props => <StudentTable/>}/>    
            <Route path="/pg/timeslot" component={props => <Timeslots/>}/>                       
                   
            
            </div>

        );
      }
}
export default RouteFile;