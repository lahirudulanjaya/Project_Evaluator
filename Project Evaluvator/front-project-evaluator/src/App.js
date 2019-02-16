import React, { Component } from 'react';

import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import  Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import PageNotFound from './Components/Error/PageNotFound';
import Register from './Components/Register/Register';

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
