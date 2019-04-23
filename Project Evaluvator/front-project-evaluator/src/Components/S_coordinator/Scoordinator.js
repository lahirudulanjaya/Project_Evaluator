import React ,{ Component }  from 'react';
import { Route } from 'react-router-dom';
import Project from './Pages/Project/Project';
import Calender from './Component/Calender';
import Calendar from "react-calendar";


class Scoodinater extends Component{
    render(){
        return(
            <div className="container">
            <div className="row">
                <div className="col-sm-12 pl-2 ml-5">
                    <div className="ml-3">
                        <Calender></Calender>
                    </div>
                </div>
            </div>
            </div>
        )
    }
} 

export default Scoodinater
