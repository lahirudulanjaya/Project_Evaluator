import React from 'react';
import Navbar from '../Navbar/Navbar'
import {connect} from 'react-redux'
import {getstudentProject,getstudentbyYear} from '../../actions/P_coodinator-Student'
class Student  extends React.Component {
    constructor(props){
        super(props)
        this.state={
            user:[],
            academicyear :null,
            studentProject:null,
           student:null
           

        }
        this.props.getstudentProject(this.props.user.Registrationnumber)
        this.props.getstudentbyYear(this.props.user.Registrationnumber)
    }
componentDidMount(){
    this.setState({user:this.props.user})
        var year =this.props.user.Registrationnumber
        this.setState({studentyear:year.substring(0,4)})
        const curyear=parseInt(new Date().getFullYear())
        const studentyear =parseInt(this.props.user.Registrationnumber.substring(0,4))
        this.setState({academicyear:curyear-studentyear})
        
        
}
    // componentWillMount(){
    //     this.setState({user:this.props.user})
    //     var year =this.props.user.Registrationnumber
    //     this.setState({studentyear:year.substring(0,4)})
    //     const curyear=parseInt(new Date().getFullYear())
    //     const studentyear =parseInt(this.props.user.Registrationnumber.substring(0,4))
    //     this.setState({academicyear:curyear-studentyear})
    //     this.props.getstudentProject(this.props.user.Registrationnumber)
    //     this.props.getstudentbyYear(this.props.user.Registrationnumber)

    // }
    componentWillReceiveProps(nextprops)
    {
        this.setState(
            {student:nextprops.student.studentbyYear[0],recive:true}
           
            )
        console.log(this.state)
    }
    
    render() { 
        return (
            <div>
                <Navbar username={this.props.user.UserName}></Navbar>
            
              {(this.state.student==null)
            ? <div>you havent assign project right now</div> :
            <div>project = {this.state.student.Projectname}</div>
            
            }
            </div>
          );
    }
}
const mapStateToProps =state=>{
 {console.log(state)}
     return(
        
    

         (state.auth.user.user) ?
         {user:state.auth.user.user,
            student:state.studentDetail
        } :
        { user :[]}
     )
     
    
}


 
export default connect(mapStateToProps,{getstudentProject,getstudentbyYear})(Student) ;