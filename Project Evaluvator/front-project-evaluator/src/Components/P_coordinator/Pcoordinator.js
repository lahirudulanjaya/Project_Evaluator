import React ,{ Component }  from 'react';
import SideNavigation from './Component/Sidebar2'

class Pcoodinater extends Component{
    render(){
        return(
            <div className="row">
                <div className="col-md-3">
                    <SideNavigation></SideNavigation>
                </div>
            </div>
        )
    }
} 

export default Pcoodinater
