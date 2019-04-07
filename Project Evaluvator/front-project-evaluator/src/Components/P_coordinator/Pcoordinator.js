import React ,{ Component }  from 'react';
import SideNavigation from './Component/Sidebar2'
import { Route } from 'react-router-dom';
import Project from './Pages/Project/Project'
class Pcoodinater extends Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <SideNavigation></SideNavigation>
                    </div>
                </div>
            </div>
        )
    }
} 

export default Pcoodinater
