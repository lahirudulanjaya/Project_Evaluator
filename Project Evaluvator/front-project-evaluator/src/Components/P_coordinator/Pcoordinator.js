import React ,{ Component }  from 'react';
import SideNavigation from './Component/Sidebar2'
import { Route } from 'react-router-dom';
import Project from './Pages/Project/Project'
class Pcoodinater extends Component{
    render(){
        return(
            
            
 <div className='fluid-container'>
    <div className='row'>
      <div className='aside col-md-2 col-sm-3 sidebarMenu'>
      <SideNavigation></SideNavigation>
      </div>
      <div className='main col-md-10'>       
        <div className='fluid-container'>
          <Route exact path='/project' component={Project} />
        </div>
      </div> 
    </div> 
  </div>
        )
    }
} 

export default Pcoodinater
