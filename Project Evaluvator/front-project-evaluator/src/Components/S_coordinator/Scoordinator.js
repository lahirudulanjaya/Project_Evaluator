import React ,{ Component }  from 'react';
import SideNavigation from './Component/Sidebar2'
import { Route } from 'react-router-dom';
import Calender from './Component/Calender'

// import Project from './Pages/Project/Project'

class Scoordinator extends Component{
    render(){
        return(

            <div className="row">
                <div className="col-md-3">
                    <SideNavigation></SideNavigation>
                    
                </div>
                <div className="col-md-9">
                    <Calender></Calender>
                </div>
                <div className="col-md-3"></div>
            </div>
        )
    }
} 

export default Scoordinator
