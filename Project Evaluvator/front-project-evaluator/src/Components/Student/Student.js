import React from 'react';
import Navbar from '../Navbar/Navbar'
import {connect} from 'react-redux'
import {getstudentProject,getstudentbyYear} from '../../actions/P_coodinator-Student'
import { Table,Button } from 'semantic-ui-react'
import Tables, {Thead, Tbody, Tr, Th, Td} from "react-row-select-table"
import Axios from 'axios';
import swal from 'sweetalert';

class Student  extends React.Component {
    constructor(props){
        super(props)
        this.state={
            user:[],
            academicyear :null,
            studentProject:null,
           student:null,
           groups:null,
           students:[]
           

        }
        this.props.getstudentProject(this.props.user.Registrationnumber)
        this.props.getstudentbyYear(this.props.user.Registrationnumber)
        this.showlist=this.showlist.bind(this)
    }
componentDidMount(){
    this.setState({user:this.props.user})
        
        
        
}
sendgroupRequest=(value)=>{
      
    swal({
      title: "Are you sure you want to group this?",
      icon: "warning",
      buttons: true,
      dangerMode: false,
    })
    .then((result) => {
        if (result) {
          value.sort().reverse()
          const newGroup =[]
        //   newGroup.push.apply(newGroup,[this.state.students[value[0]].Registrationnumber,this.state.students[value[1]].Registrationnumber,this.state.students[value[2]].Registrationnumber])
        //     newGroup.map(newGroup=>{
        //         return newGroup.active=false                
        //     })

            value.forEach(element => {
                const reciver={
                    Registrationnumber:this.state.students[element].Registrationnumber,
                    active:false
                }
                newGroup.push(reciver)
            });
          const  request ={
            sender:this.props.user.Registrationnumber,
            reciver :newGroup
            }
            
          
        
          value.length=0

            Axios.post("http://localhost:4000/api/sendgrouprequest",request)
            .then(res=>{
                swal(
                    'Cratead!',
                    'Group has been created.',
                    'success'
                  )
            })
            .catch(err=>{
                swal ( "Oops" ,  "Something went wrong!!!" ,  "error" )
            })

          
        }
        else{
          value.length=0

        }
      })
}
showlist=()=>{
    {this.props.getstudentbyYear(this.state.student.Projectname)}

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
            {student:nextprops.student.studentbyYear[0],
            groups:nextprops.student.studentProject[0],
            students:nextprops.student.studentbyYear,
                recive:true}
           
            )
        console.log(nextprops)
    }
    
    render() { 
        return (
            <div>
                <Navbar username={this.props.user.UserName}></Navbar>
            
              {(this.state.student==null)
            ?
             <div>
                 
                 you havent assign project right now</div> :
            <div>project = {this.state.student.Projectname} 
           

            {(this.state.student.Projectname.substring(7,8)==2) ?
            
            <div>
                group list
                <div>
                {!(this.state.groups==null) ? <div>   
                <Table striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Group No</Table.HeaderCell>
        <Table.HeaderCell>Students Registrationnumber</Table.HeaderCell>
        <Table.HeaderCell>Student Name</Table.HeaderCell>
        <Table.HeaderCell>Supervisor</Table.HeaderCell>
        <Table.HeaderCell>Mentors</Table.HeaderCell>
      </Table.Row>
      {console.log(this.state)}
    </Table.Header>

    
    <Table.Body>
   
                    {this.state.groups.groups.map(groups=>
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
                        </div>:
                        
                        <div>

                        </div>
                    }
                </div>
                </div>:
        <div>
            you have to create own groups
<Button onClick={this.showlist}> Show List</Button>
            <Tables onCheck={(value) => value.length>=3 
    ? this.sendgroupRequest(value)
    : console.log("fvfvf")
    }  >
          <Thead>
            <Tr>
              <Th>Registrationnumber</Th>
              <Th>Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {this.state.students.map(students=>

<Tr>
<Td>{students.Registrationnumber}</Td>
<Td>{students.Name}</Td>
</Tr>
              )}
           
           
          </Tbody>
        </Tables>
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