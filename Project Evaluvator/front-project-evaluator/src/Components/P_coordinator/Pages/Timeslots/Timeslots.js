
import React from 'react'
import {getprojectnames,getproject} from '../../../../actions/ProjectActions'
import {getpresentations} from '../../../../actions/milestoneActions'
import {connect} from 'react-redux'
import { Dropdown } from 'semantic-ui-react'

class Timeslot extends React.Component {
    constructor(props){
        super(props)
        this.state={
            presentations:[]
        }
        this.props.getprojectnames()
        this.onchangeDropdown=this.onchangeDropdown.bind(this)
    }
    onchangeDropdown(e){
        this.setState({projectName:e.target.textContent})
        this.props.getproject(e.target.textContent)
        this.props.getpresentations(e.target.textContent)

        
    }

componentDidMount(){
    this.setState({projects:this.props.projects})

}
componentWillReceiveProps(nextprops){
    console.log(nextprops)
    this.setState({presentations:nextprops.presentations.presentation})
    console.log(nextprops.presentations.presentation)
}
    render() {
        const Projectnames = this.props.projects.project.map(project=>
            ({
                key:project._id,
                text:project.Projectname,
                value:project.Projectname

            })
        ) 
        var i =1
        var presentation
        if(this.state.presentations.length>0){
         presentation =this.state.presentations.map(presentation=>
            ({
                key : i++,
                text:presentation.name,
                value :presentation.name

            }
            
            )
            
        )
        }
        console.log(this.state)
        return (  
            <div>
                Slect the project 
                <div>
                <Dropdown placeholder='State' search selection options={Projectnames} onChange={this.onchangeDropdown} />
                </div>
                Select the Presentation
            <div>
                <Dropdown placeholder='State' search selection options={presentation} />
                {console.log(this.state.projects)}
                </div>
            </div>

        );
    }
    
}
const mapStateToProps =state =>{
    console.log(state)
    return {
        projects:state.project,
        presentations :state.milestone
        
    }
}
 
export default connect(mapStateToProps,{getprojectnames,getproject,getpresentations})(Timeslot);