import{BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import React, {Component}from 'react'

import Milestones from './Components/P_coordinator/Pages/Project/updateMilestones';
import Project from './Components/P_coordinator/Pages/Project/Project';
import Student from './Components/P_coordinator/Pages/Student/Student';
import Pcoordinator from './Components/P_coordinator/Pcoordinator';
import StudentTable from './Components/P_coordinator/Pages/Student/studentTable'
import  Timeslots from './Components/P_coordinator/Pages/Timeslots/Timeslots'
import Evaluvator from './Components/P_coordinator/Pages/Evaluvator/envaluvator'
import Sessioncoodinator from './Components/P_coordinator/Pages/SessionCoodinator/Sessioncoordinator'
import Setgooglesheet from './Components/P_coordinator/Pages/setgooglesheet'
import  UpdateProjects  from './Components/P_coordinator/Pages/ManageProject/updateProject'
import Updatetimeslots from './Components/P_coordinator/Pages/ManageProject/updateTimeslots'
import UpdateStudents from './Components/P_coordinator/Pages/Student/UpdateStudents'
import UpdateGroups from './Components/P_coordinator/Pages/ManageProject/updateGroups'
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
            <Route path="/pg/evaluvator" component={props=><Evaluvator/>}/>
            <Route path="/pg/sessioncoordinator" component={props=><Sessioncoodinator/>}/>
            <Route path ="/pg/setgooglesheet" component={props=><Setgooglesheet/>}/>
            
            <Route path ="/pg/updateprojects" component={props=><UpdateProjects/>}/>
            
            <Route path ="/pg/updatetimeslots" component={props=><Updatetimeslots/>}/>
            <Route path ="/pg/updatestudents" component ={props=><UpdateStudents/>}/>
            <Route path ="/pg/updategroups" component ={props=><UpdateGroups/>}/>

            
            </div>

        );
      }
}
export default RouteFile;