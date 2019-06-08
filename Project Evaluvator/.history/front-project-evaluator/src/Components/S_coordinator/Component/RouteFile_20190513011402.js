import{BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import React, {Component}from 'react';

import SCoordinator from '../Scoordinator';

class RouteFile extends Component{
    render() {
        return (
            <div>                  
                <Route path = "/sc" component ={props => <SCoordinator/>}/>    
            </div>
        );
      }
}
export default RouteFile;