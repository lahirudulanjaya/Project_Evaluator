import React, { Component } from 'react';
import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import  Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Navbar></Navbar> */}
        <Login className="LoginForm"></Login>
      </div>
    );
  }
}

export default App;
