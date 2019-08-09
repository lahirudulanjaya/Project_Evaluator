import{BrowserRouter as Router , Route, Switch} from './node_modules/react-router-dom'
import React, {Component}from './node_modules/react'
import Evaluator from './Evaluator'
import ExamGroup from './Pages/ExamGroup/ExamGroup'


class RouteFile extends Component{
    render() {
        return (
            <div>                    
                <Route path = "/evaluator" component ={props => <Evaluator/>}/>
                <Route path = "/examGroup" component ={props => <ExamGroup/>}/>

                     
            </div>
        );
      }
}
export default RouteFile;