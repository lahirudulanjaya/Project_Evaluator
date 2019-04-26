import React from 'react';
import Navbar from '../Navbar/Navbar'
import { connect } from 'react-redux'
import { getstudentProject, getstudentbyYear } from '../../actions/P_coodinator-Student'
import { getsendrequest, getrequest } from '../../actions/requestActions'
import { Table, Button, Icon, Popup } from 'semantic-ui-react'
import Tables, { Thead, Tbody, Tr, Th, Td } from "react-row-select-table"
import Axios from 'axios';
import swal from 'sweetalert';
import { request } from 'https';

class Student extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: [],
      academicyear: null,
      studentProject: null,
      student: null,
      groups: null,
      students: [],
      request: null,
      requests: []


    }
    this.props.getstudentProject(this.props.user.Registrationnumber)
    this.props.getstudentbyYear(this.props.user.Registrationnumber)
    this.props.getsendrequest(this.props.user.Registrationnumber)
    this.props.getrequest(this.props.user.Registrationnumber)
    this.showlist = this.showlist.bind(this)
  }
  componentDidMount() {
    this.setState({ user: this.props.user })
    this.props.getsendrequest(this.props.user.Registrationnumber)
    this.props.getrequest(this.props.user.Registrationnumber)



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
            sender: this.props.user.Registrationnumber,
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
              this.props.getsendrequest(this.props.user.Registrationnumber)
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
  componentWillReceiveProps(nextprops) {
    this.setState(
      {
        student: nextprops.student.studentbyYear[0],
        groups: nextprops.student.studentProject[0],
        students: nextprops.student.studentbyYear,
        request: nextprops.request.request.reciver,
        requests: nextprops.request.requests,
        recive: true
      }

    )


    this.setState({ request: nextprops.request.request.reciver })
    console.log(this.state.requests)

  }
  confirmRequest(id) {
    Axios.get("http://localhost:4000/api/checkaccepted/"+id).then(res=>{
      alert("sucess")
    })
    .catch(err=>{
      alert(err)
    })
  }

  render() {
    return (
      <div>
        <Navbar username={this.props.user.UserName} requestcount={this.state.requests.length} requests={this.state.requests} accept ={()=>this.confirmRequest(this.props.user.Registrationnumber)}></Navbar>

        {(this.state.student == null)
          ?
          <div>

            you havent assign project right now</div> :
          <div>project = {this.state.student.Projectname}


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
              </div> :
              <div>
                you have to create own groups
<Button onClick={this.showlist}> Show List</Button>
                <Tables onCheck={(value) => value.length >= 3
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



                {this.state.request ?

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
                  </Table>
                  :
                  <div>
                    You Havent Send Any Request Yet. If you wish to create group click show list and select three students
      </div>}




              </div>

            }
          </div>

        }
      </div>
    );
  }
}
const mapStateToProps = state => {
  { console.log(state) }
  return (



    (state.auth.user.user) ?
      {
        user: state.auth.user.user,
        student: state.studentDetail,
        request: state.requests
      } :
      { user: [] }
  )


}



export default connect(mapStateToProps, { getstudentProject, getstudentbyYear, getsendrequest, getrequest })(Student);