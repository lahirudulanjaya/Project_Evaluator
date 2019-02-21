import React, { Component } from 'react';
import {createStore,applyMiddleware} from 'redux'
import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import  Register from './Components/Auth/Register/Register'
import Login from './Components/Auth/Login/Login'
import{BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import store from './store'

import {Provider } from 'react-redux'
import Navbar from './Components/Navbar/Navbar';
import PageNotFound from './Components/Error/PageNotFound';
class App extends Component {
  render() {
    return (
<Provider store={store}>
      <Router>
      <div className="App">
        <Navbar />
        <Switch>  
        <Route exact path ="/register" component={Register}/>
        <Route exact path ="/login" component={Login}/>
        <Route component={PageNotFound} />
        </Switch>
      </div>
      </Router>
      </Provider>
  
    );
  }
}

export default App;
