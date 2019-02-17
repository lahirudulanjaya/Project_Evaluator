import React, { Component } from 'react';

import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import  Register from './Components/Auth/Register/Register'
import Login from './Components/Auth/Login/Login'
import{BrowserRouter as Router , Route} from 'react-router-dom'



import Navbar from './Components/Navbar/Navbar';
import PageNotFound from './Components/Error/PageNotFound';

class App extends Component {
  render() {
    return (

      <Router>
      <div className="App">
<Route exact path ="/register" component={Register}/>
<Route exact path ="/login" component={Login}/>

      </div>
      </Router>

   
    );
  }
}

export default App;
