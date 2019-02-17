import React, { Component } from 'react';

import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
<<<<<<< HEAD
import  Register from './Components/Auth/Register/Register'
import Login from './Components/Auth/Login/Login'
import{BrowserRouter as Router , Route} from 'react-router-dom'
=======

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import  Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import PageNotFound from './Components/Error/PageNotFound';
import Register from './Components/Register/Register';
>>>>>>> 30a14dec0abf98ee04b920ff315eddeb37ee4922

class App extends Component {
  render() {
    return (
<<<<<<< HEAD
      <Router>
      <div className="App">
<Route exact path ="/register" component={Register}/>
<Route exact path ="/login" component={Login}/>

      </div>
      </Router>
=======
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/signup" component={Register}/>
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
>>>>>>> 30a14dec0abf98ee04b920ff315eddeb37ee4922
    );
  }
}

export default App;
