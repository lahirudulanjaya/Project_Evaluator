import{BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import React, {Component}from 'react'
import StudentProfile from '../Student/StudentProfile'
import StudentProject from '../Student/StudentProject'
import Student from '../Student/Student'
class RouteFile extends Component{
    render() {
        return (
            <div>  
                <Route path="/stu/home" component={props =><StudentProject></StudentProject>}  ></Route>  
                <Route path="/stu/creategroups" component={Student}  ></Route>  
                <Route path="/stu/profile" component={props =><StudentProfile/>}  ></Route>       
            </div>
        );
      }
}
export default RouteFile;