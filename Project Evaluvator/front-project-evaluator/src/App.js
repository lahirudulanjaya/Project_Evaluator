import React, { Component } from 'react';

import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import  Register from './Components/Auth/Register/Register';
import Login from './Components/Auth/Login/Login';
import{BrowserRouter as Router , Route, Switch} from 'react-router-dom';

import Test from './Components/Register/Register';

import Navbar from './Components/Navbar/Navbar';
import PageNotFound from './Components/Error/PageNotFound';
import StudentPage from './Components/Student/Student';
import Chart from './Components/Student/BarChart/BarChat';

class App extends Component {
  render() {
    return (

      <Router>
      <div className="App">
        <Navbar />
        <Switch>  
        <Route exact path ="/register" component={Register}/>
        <Route exact path ="/login" component={Login}/>
        <Route exact path ="/test" component={Test}/>
        <Route exact path ="/student" component={StudentPage}/>
        <Route exact path ="/chart" component={Chart}/>
        <Route component={PageNotFound} />
        </Switch>
      </div>
      </Router>

  
    );
  }
}

export default App;
