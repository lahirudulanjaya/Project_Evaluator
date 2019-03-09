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

import Project from './Components/P_coordinator/Pages/Project/Project'
import Test from './Components/Register/Register';


import {Provider } from 'react-redux'
import Navbar from './Components/Navbar/Navbar';
import PageNotFound from './Components/Error/PageNotFound';

import StudentPage from './Components/Student/Student';
import Chart from './Components/Student/BarChart/BarChat';


class App extends Component {
  render() {
    return (
<Provider store={store}>
      <Router history={history}>
      <div className="App">
        <Navbar />
        <Switch>  
        <Route exact path ="/register" component={Register}/>
        <Route exact path ="/login" component={Login}/>
        <Route exact path ="/test" component={Test}/>
        <Route exact path ="/student" component={StudentPage}/>
        <Route exact path ="/chart" component={Chart}/>
        <Route exact path = "/pg" component ={Pcoordinator}/>
        <Route exact path = "/pg/project" component={Project}/>
        <Route component={PageNotFound} />
        </Switch>
      </div>
      </Router>
      </Provider> 
  
    );
  }
}

export default App;
