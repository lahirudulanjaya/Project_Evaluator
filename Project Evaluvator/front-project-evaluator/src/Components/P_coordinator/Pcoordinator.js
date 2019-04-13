import React ,{ Component }  from 'react';
import Sidebar from './Component/Sidebar2'
import { Route } from 'react-router-dom';
import Project from './Pages/Project/Project'

var divStyle={
    background:"#6699FF",
    height: "1000px",
  };
class Pcoodinater extends Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3" style={divStyle}>
                        <Sidebar></Sidebar>
                    </div>
                </div>
            </div>
        )
    }
} 

export default Pcoodinater
