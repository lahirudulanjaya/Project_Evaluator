import{BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import React, {Component}from 'react'
import Evaluator from './Evaluator'

class RouteFile extends Component{
    render() {
        return (
            <div>                    
                <Route path = "/evaluator" component ={props => <Evaluator/>}/>     
            </div>
        );
      }
}
export default RouteFile;