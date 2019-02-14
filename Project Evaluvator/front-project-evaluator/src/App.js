import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import  Login from './Components/Login/Login'
class App extends Component {
  render() {
    return (
      <div className="App">
  <Login></Login>
      </div>
    );
  }
}

export default App;
