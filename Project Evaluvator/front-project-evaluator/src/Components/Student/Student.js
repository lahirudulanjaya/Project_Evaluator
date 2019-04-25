import React from 'react';
import Navbar from '../Navbar/Navbar'
import {connect} from 'react-redux'
import {getstudentProject,getstudentbyYear} from '../../actions/P_coodinator-Student'
import { Table } from 'semantic-ui-react'

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
            {student:nextprops.student.studentProject[0],recive:true}
           
            )
        console.log(this.state)
    }
    
    render() { 
        return (
            <div>
                <Navbar username={this.props.user.UserName}></Navbar>
            
              {(this.state.student==null)
            ? <div>you havent assign project right now</div> :
            <div>project = {this.state.student.Projectname}

            {(this.state.student.Acadamicyear==2) ?
            
            <div>
                group list
                <div>
                <Table striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Group No</Table.HeaderCell>
        <Table.HeaderCell>Students Registrationnumber</Table.HeaderCell>
        <Table.HeaderCell>Student Name</Table.HeaderCell>
        <Table.HeaderCell>Supervisor</Table.HeaderCell>
        <Table.HeaderCell>Mentors</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
                    {this.state.student.groups.map(groups=>
                         <Table.Row verticalAlign='top'>
                         <Table.Cell>{groups.groupno}</Table.Cell>
                         <Table.Cell>
                         {groups.students.map(students=>
                         <div>
                            {students.Registrationnumber}
                            </div>
                            )}
                            </Table.Cell>
                             <Table.Cell>
                         {groups.students.map(students=>
                         <div>
                            {students.Name}
                            </div>
                            )}
                            </Table.Cell>
                            {/* <Table.cell>
                               
                            </Table.cell>
                            <Table.cell>
                               
                            </Table.cell>  */}
                         </Table.Row>
                        
                        )}
                        </Table.Body>
                        </Table>
                </div>
                </div>:
        <div>
            you have to create own groups
        </div>
        
        }
            </div>
            
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