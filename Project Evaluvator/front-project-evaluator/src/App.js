import React, { Component } from 'react';
import {createStore,applyMiddleware} from 'redux'
import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import history from './history';
import Pcoordinator from './Components/P_coordinator/Pcoordinator'
import Login from './Components/Auth/Login/Login'
import{BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import {browserHistory} from 'react-router'
import store from './store'
import  Register from './Components/Auth/Register/Register';
import ForgetPassword from './Components/Auth/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/Auth/ForgetPassword/ResetPasword';

import Project from './Components/P_coordinator/Pages/Project/Project'
import Milestones from './Components/P_coordinator/Pages/Project/updateMilestones'

import {Provider } from 'react-redux'
import Navbar from './Components/Navbar/Navbar';
import PageNotFound from './Components/Error/PageNotFound';

import NewSideBar from './Components/P_coordinator/Component/NewSideBar';
import RouteFile from './RouteFile';

import Student from './Components/Student/Student'

import studentTable from './Components/P_coordinator/Pages/Student/studentTable';
import Scoordinator from './Components/S_coordinator/Scoordinator';
import StudentSideBar from './Components/Student/StudentSideBar';
import SCoordinatorSideBar from './Components/S_coordinator/Component/SCoordinatorSideBar';
import EvaluatorSideBar from './Components/Evaluator/SideBar';
import Test from "./Components/Evaluator/Test";
import  Timeslots from './Components/P_coordinator/Pages/Timeslots/Timeslots'
import Evaluator from './Components/Evaluator/Evaluator';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
class App extends Component {

  
  render() {
    return (
    <Provider store={store}>
      <Router history={history} >
        <div className="App">
        <Loading
  show={true}
  color="red"
  change={false}
  showSpinner={true}
/>
          <Switch>
            <Route path = "/project" component ={NewSideBar}/>
            <Route path = "/devices" component ={NewSideBar}/>
            <Route path = "/pg/project" component={NewSideBar}/>
            <Route path ="/pg/student" component={NewSideBar}/>
            <Route path ="/pg/milestone" component={NewSideBar}/>
            <Route path ="/pg/creategroups" component={NewSideBar}/>
            <Route path ="/pg/timeslot" component={NewSideBar}/>
            <Route path ="/stu/home" component={StudentSideBar}/>
            <Route path = "/stu/creategroups" component ={StudentSideBar}/>
            <Route path = "/stu/profile" component ={StudentSideBar}/>
      
            <Route path ="/sc" component={SCoordinatorSideBar}/>
            <Route path ="/evaluator" component={EvaluatorSideBar}/>
            <Route path ="/examGroup" component={EvaluatorSideBar}/>
            <Route path ="/pg/evaluvator" component={NewSideBar}/>
            <Route path ="/pg/sessioncoordinator" component={NewSideBar}/>
            <Route path ="/pg/setgooglesheet" component={NewSideBar}/>
            <Route path ="/pg/updateprojects" component={NewSideBar}/>
            <Route path ="/pg/updatetimeslots" component={NewSideBar}/>
            <Route path ="/pg/updatestudents" component={NewSideBar}/>
            <Route path ="/pg/updategroups" component={NewSideBar}/>
            

            <Route exact path ="/student" component ={Student}/>

            <Route exact path ="/" component={Login}/>
            <Route exact path ="/test" component={Test}/>
            <Route exact path ="/login" component={Login}/>  
            <Route exact path ="/register" component={Register}/>
            <Route exact path ="/forgetPassword" component={ForgetPassword}/>
            <Route exact path="/resetPassword/:userName" component={ResetPassword}/>
            {/* <Route component={PageNotFound} /> */}
          </Switch>
        </div>
      </Router> 
      {/* <Router history={history}>
      <div className="App">
      <Navbar/>
        <Switch>
        <Route exact path ="/" component={Login}/>  
        <Route exact path ="/register" component={Register}/>
        <Route exact path ="/chart" component={Chart}/>
        <Route exact path = "/pg" component ={Pcoordinator}/>
        <Route exact path = "/sc" component ={Scoordinator}/>
        <Route component={PageNotFound} />
        </Switch>
      </div>
      </Router> */}
      </Provider> 
  
    );
  }
}

export default App;
