import React ,{ Component }  from 'react';
import { Route } from 'react-router-dom';
import Calendar from "react-calendar";

import SessionListTable from './Component/SessionListTable';


class Scoodinater extends Component{

    constructor(props){
        super(props)

        this.state={
            projectnames:[]
        }
    }

   componentWillReceiveProps()
   {
       console.log(this.props)
   }
    render(){
        return(
            <div className="container">

                <div className="row">
                    <div className="col-sm-12">
                    
                       <SessionListTable></SessionListTable>

                    </div>
                </div>
            </div>
        )
    }
} 



export default (Scoodinater)
