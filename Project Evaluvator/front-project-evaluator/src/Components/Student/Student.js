import React from 'react';
import Header from './Component/Header'
import { connect } from 'react-redux'
import { getstudentProject, getstudentbyYear } from '../../actions/P_coodinator-Student'
import { getsendrequest, getrequest, cheackallaccepted } from '../../actions/requestActions'
import {getuserprofile} from '../../actions/authActions'
import { Table, Button, Icon } from 'semantic-ui-react'
import Tables, { Thead, Tbody, Tr, Th, Td } from "react-row-select-table"
import Axios from 'axios';
import {whologgedin} from '../../actions/authActions'
import swal from 'sweetalert';


class Student extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: [],
      academicyear: null,
      studentProject: null,
      student: null,
      groups: [],
      students: [],
      request: null,
      requests: [],
      isaccepted: false,
      clicked:false



    }
    
    this.showlist = this.showlist.bind(this)
    this.creategroup = this.creategroup.bind(this)
    this.props.getuserprofile()
    

  }
  componentDidMount() {
    if(!(whologgedin()=="student")){
      this.props.history.push('/login')
  }

  this.props.getuserprofile()

  this.props.getstudentProject(this.props.user.Registrationnumber)
    this.props.getstudentbyYear(this.props.user.Registrationnumber)
    this.props.getsendrequest(this.props.user.Registrationnumber)
    this.props.getrequest(this.props.user.Registrationnumber)

  }
 
  // componentWillMount(){
  //   this.props.getuserprofile()
  //   this.props.getstudentProject(this.props.user.Registrationnumber)
  //   this.props.getstudentbyYear(this.props.user.Registrationnumber)
  //   this.props.getsendrequest(this.props.user.Registrationnumber)
  //   this.props.getrequest(this.props.user.Registrationnumber)


  // }

  componentWillUpdate(){
    console.log(this.state)

  }
  
 
  
  sendgroupRequest = (value) => {

    swal({
      title: "Are you sure you want to group this?",
      icon: "warning",
      buttons: true,
      dangerMode: false,
    })
      .then((result) => {
        if (result) {
          value.sort().reverse()
          const newGroup = []
          //   newGroup.push.apply(newGroup,[this.state.students[value[0]].Registrationnumber,this.state.students[value[1]].Registrationnumber,this.state.students[value[2]].Registrationnumber])
          //     newGroup.map(newGroup=>{
          //         return newGroup.active=false                
          //     })

          value.forEach(element => {
            const reciver = {
              Registrationnumber: this.state.students[element].Registrationnumber,
              active: "pending"
            }
            newGroup.push(reciver)
          });
          const request = {
            sender: this.state.user.Registrationnumber,
            reciver: newGroup
          }



          value.length = 0

          Axios.post("http://localhost:4000/api/sendgrouprequest", request)
            .then(res => {
              swal(
                'Cratead!',
                'Group has been created.',
                'success'
              )
              this.props.getsendrequest(this.state.user.Registrationnumber)
            })
            .catch(err => {
              swal("Oops", "Something went wrong!!!", "error")
            })


        }
        else {
          value.length = 0

        }
      })
  }
  showlist = () => {
    { this.props.getstudentbyYear(this.state.student.Projectname) }
    this.props.getsendrequest(this.state.user.Registrationnumber)
this.setState({clicked:true})
  }

  // componentWillMount(){
  //     this.setState({user:this.state.user})
  //     var year =this.state.user.Registrationnumber
  //     this.setState({studentyear:year.substring(0,4)})
  //     const curyear=parseInt(new Date().getFullYear())
  //     const studentyear =parseInt(this.state.user.Registrationnumber.substring(0,4))
  //     this.setState({academicyear:curyear-studentyear})
  //     this.props.getstudentProject(this.state.user.Registrationnumber)
  //     this.props.getstudentbyYear(this.state.user.Registrationnumber)

  // }
  componentWillReceiveProps(nextprops) {

    if(!(this.props.user===nextprops.user)){
      this.props.getstudentProject(nextprops.user.Registrationnumber)
    this.props.getstudentbyYear(nextprops.user.Registrationnumber)
    this.props.getsendrequest(nextprops.user.Registrationnumber)
    this.props.getrequest(nextprops.user.Registrationnumber)

    }
    console.log(nextprops.student.studentbyYear.length)
    this.setState({user:nextprops.user})
    console.log(this.state)
    if(nextprops.student.studentbyYear.length>0){
    this.setState(
      {
        
        student: nextprops.student.studentbyYear[0],
        groups: nextprops.student.studentProject[0],
        students: nextprops.student.studentbyYear,
        request: nextprops.request.request.reciver,
        requests: nextprops.request.requests,
        isaccepted: nextprops.request.isaccepted,
        recive: true
      }
    

    )
    }


    this.setState({ request: nextprops.request.request.reciver })
    console.log(this.state.groups)

  }
  creategroup() {
    this.props.getstudentProject(this.state.user.Registrationnumber)

    const students = []
    this.state.request.forEach(element => {
      const student = {}
      student.Registrationnumber = element.Registrationnumber
      students.push(student)
    });
    students.push({ Registrationnumber: this.state.user.Registrationnumber })
    var groupnumber
    if (!this.state.groups) {
      groupnumber = 1
    }
    else {
      groupnumber = this.state.groups.groups.length + 1
    }
    const submitGrps = {

      Projectname: this.state.student.Projectname,
      groups: {
        students: students,

        groupno: groupnumber



      }
    }
    console.log(submitGrps)
    Axios.put("http://localhost:4000/api/pg/addGroups", submitGrps)
      .then(res => {
        swal({
          title: "Good job!",
          text: "You have succesfully Submit Groups!",
          icon: "success",
        });
        this.props.getstudentProject(this.state.user.Registrationnumber)

      })
      .catch(err => {
        swal("Oops", "Something went wrong!!!", "error")
      })

  }
  confirmRequest(id) {
    Axios.get("http://localhost:4000/api/checkaccepted/" + id).then(res => {
      swal("sucess")
      this.props.getsendrequest(this.state.user.Registrationnumber)

    })
      .catch(err => {
        alert(err)
      })
  }

  render() {
    {console.log(this.state)}
    return (
      <div>

        {(this.state.student == null)
          ?
          <div>

            you havent assign project right now</div> :
          <div><h2>project = {this.state.student.Projectname}</h2>


            {(this.state.student.Projectname.substring(7, 8) == 2) ?

              <div>
                group list
                <div>
                  {!(this.state.groups == null) ? <div>
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

                        {this.state.groups.groups.map(groups =>
                          <Table.Row verticalAlign='top'>
                            <Table.Cell>{groups.groupno}</Table.Cell>
                            <Table.Cell>
                              {groups.students.map(students =>
                                <div>
                                  {students.Registrationnumber}
                                </div>
                              )}
                            </Table.Cell>
                            <Table.Cell>
                              {groups.students.map(students =>
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
                  </div> :

                    <div>

                    </div>
                  }

                </div>
              </div> :
              <div>


                <div>
                <div >
                    {!(this.state.groups == null) ? <div>
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

                          {this.state.groups.groups.map(groups =>
                            <Table.Row verticalAlign='top'>
                              <Table.Cell>{groups.groupno}</Table.Cell>
                              <Table.Cell>
                                {groups.students.map(students =>
                                  <div>
                                    {students.Registrationnumber}
                                  </div>
                                )}
                              </Table.Cell>
                              <Table.Cell>
                                {groups.students.map(students =>
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
                    </div> :

                      <div>

                      </div>
                    }

                  </div>
                </div>

                {this.state.request ?
<div>
<h3 style={{backgroundColor:'#feda6a',color:'#1d1e22',padding:'12px',borderRadius:'5px',marginBottom:'30px'}} > Your Request. </h3>

                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Registartionnumber</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>

                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {this.state.request.map(request =>

                        <Table.Row>
                          <Table.Cell>{request.Registrationnumber}</Table.Cell>
                          {request.active == "pending" ?
                            <Table.Cell negative><Icon name='circle notched' loading /> Pending</Table.Cell> :
                            request.active == "accepted" ?
                              <Table.Cell active><Icon name='checkmark' /> Accepted</Table.Cell> :
                              <Table.Cell negative><Icon name='frown' /> Rejected</Table.Cell>

                          }
                        </Table.Row>
                      )}
                    </Table.Body>
                    <Button secondary disabled={!this.state.isaccepted} onClick={this.creategroup}>create your group</Button>

                  </Table>
</div>
                  :
                  <div>
    <h3 style={{backgroundColor:'#feda6a',color:'#1d1e22',padding:'12px',borderRadius:'5px',marginBottom:'30px'}} > You Haven't Send Any Request Yet. </h3>

                    <Button onClick={this.showlist} secondary> Show Student list</Button>
<div hidden={!this.state.clicked}>
                    <Tables  onCheck={(value) => value.length >= 3
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
                        {this.state.students.map(students =>

                          <Tr>
                            <Td>{students.Registrationnumber}</Td>
                            <Td>{students.Name}</Td>
                          </Tr>
                        )}


                      </Tbody>
                    </Tables>
</div>
                  </div>



                }




              </div>

            }
          </div>

        }
      </div>
    );
  }
}
const mapStateToProps = state => {
  return (



    
      {
        user: state.auth.user,
        student: state.studentDetail,
        request: state.requests
      } 
      
  )


}



export default connect(mapStateToProps, { getstudentProject, getstudentbyYear, getsendrequest, getrequest, cheackallaccepted,getuserprofile })(Student);