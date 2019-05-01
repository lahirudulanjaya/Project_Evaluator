import React ,{ Component }  from 'react';
import { Route } from 'react-router-dom';
import Calendar from "react-calendar";
import {connect} from'react-redux'
import { getallprojects,getprojectnames } from '../../actions/ProjectActions'


class Scoodinater extends Component{

    constructor(props){
        super(props)
        this.props.getprojectnames()

        this.state={
            projectnames:[]
        }
    }

   componentWillReceiveProps(){
       console.log(this.props)
   }
    render(){
        return(
            <div className="container">
            <div className="row">
                <div className="col-sm-12 pl-2 ml-5">
                    <div className="ml-3">
                        <Calendar></Calendar>
                    </div>
                </div>
            </div>
            </div>
        )
    }
} 

const  mapStateToProps=(state)=>{
    console.log(state)
return{
    projects:state.project
}



}

export default connect(mapStateToProps,{getprojectnames})(Scoodinater)
