import React ,{ Component }  from 'react';
import SideNavigation from './Component/Sidebar2'
import { Route } from 'react-router-dom';
import Project from './Pages/Project/Project';
import Calender from './Component/Calender';

class Scoodinater extends Component{
    render(){
        return(

            <div className="row">
                <div className="col-md-3">
                    <SideNavigation></SideNavigation>
                </div>
                <div className="col-md-9"><Calender></Calender></div>
            </div>
        )
    }
} 

export default Scoodinater
