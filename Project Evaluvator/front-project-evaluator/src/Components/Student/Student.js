import React from 'react';
import Header from './Component/Header'
import { connect } from 'react-redux'
import { getstudentProject, getstudentbyYear,getgroupsbyproject } from '../../actions/P_coodinator-Student'
import { getsendrequest, getrequest, cheackallaccepted } from '../../actions/requestActions'
import { getuserprofile } from '../../actions/authActions'
import { Table, Button, Icon } from 'semantic-ui-react'
import Tables, { Thead, Tbody, Tr, Th, Td } from "react-row-select-table"
import Axios from 'axios';
import { whologgedin } from '../../actions/authActions'
import swal from 'sweetalert';
import PureComponent from './chart'

class Student extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      academicyear: null,
      studentProject: '',
      student: null,
      groups: null,
      students: [],
      request: null,
      requests: [],
      isaccepted: false,
      clicked: false,
      Restrictions: {
        cs: 2,
        is: 1,
        total: 4
      },
      alreadyin: false,
    }

    this.showlist = this.showlist.bind(this)
    this.creategroup = this.creategroup.bind(this)
    this.props.getuserprofile()


  }
  componentDidMount() {
    if (!(whologgedin() == "student")) {
      this.props.history.push('/login')
    }

    this.props.getuserprofile()
    this.props.getstudentProject(this.props.user.Registrationnumber)
    this.props.getstudentbyYear(this.props.user.Registrationnumber)
    this.props.getsendrequest(this.props.user.Registrationnumber)
    this.props.getrequest(this.props.user.Registrationnumber)
    this.props.cheackallaccepted(this.props.user.Registrationnumber)

  }



  deleteRequest = () => {

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          Axios.delete("http://localhost:4000/api/deleterequest/" + this.props.user.Registrationnumber).then(res => {
            swal({
              title: "Good job!",
              text: "You have succesfully Submit Groups!",
              icon: "success",
            });
            this.props.getsendrequest(this.props.user.Registrationnumber)
            this.props.getrequest(this.props.user.Registrationnumber)
          })
            .catch(
              err => {
                swal("Oops", "Something went wrong!!!", "error")

              }
            )
        }
      })
  }

  sendgroupRequest = (value) => {

    var cs = 0;
    var is = 0;

    value.forEach(ele => {
      if (this.state.students[ele].Registrationnumber.substring(4, 6) == "cs") {
        cs++
      }
      if (this.state.students[ele].Registrationnumber.substring(4, 6) == "is") {
        is++
      }

    })
    if (cs >= (this.state.Restrictions.cs) && is >= (this.state.Restrictions.is)) {
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
                this.props.cheackallaccepted(this.props.user.Registrationnumber)

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
    else {
      value.length = 0
      swal("Oops", "Invalid Group Please Read the Group Restrictions", "error")
    }



  }
  showlist = () => {
    var registratinnumbers=[]
    var newgrp =[]
    Axios.get('http://localhost:4000/api/pg/getstudents/'+this.props.user.Registrationnumber).then(resp=>{
    console.log(resp.data[0].Projectname)
            Axios.get('http://localhost:4000/api/getgroupsbyprojectname/'+resp.data[0].Projectname).then(res=>{
              res.data[0].groups.map(ele=>{
                ele.students.map(reg=>{
                  registratinnumbers.push(reg.Registrationnumber)
                })
              })

              Axios.get('http://localhost:4000/api/pg/getstudents/'+resp.data[0].Projectname).then(res=>{
              
              console.log(res.data)
              res.data.map(ele=>{
                if(!(registratinnumbers.includes(ele.Registrationnumber))){
                  newgrp.push(ele)
                }
              })
              console.log(newgrp)
             
              this.props.getsendrequest(this.state.user.Registrationnumber)
              this.getrestrictions()
              this.setState({ clicked: true })

              this.setState({students:newgrp})
            })

             

            })
          })
  }


  componentWillReceiveProps(nextprops) {


    if (!(this.props.user === nextprops.user)) {
      console.log(nextprops)
      this.props.getstudentProject(nextprops.user.Registrationnumber)
      this.props.getstudentbyYear(nextprops.user.Registrationnumber)
      this.props.getsendrequest(nextprops.user.Registrationnumber)
      this.props.getrequest(nextprops.user.Registrationnumber)
      this.props.cheackallaccepted(nextprops.user.Registrationnumber)
      this.props.getgroupsbyproject("2016cs129")
    }
    this.setState({ user: nextprops.user })
    if (nextprops.student.studentbyYear.length > 0) {
      this.setState(
        {

          student: nextprops.student.studentbyYear[0],
          groups: nextprops.student.studentProject[0],
          // students: nextprops.student.studentbyYear,
          request: nextprops.request.request.reciver,
          requests: nextprops.request.requests,
          isaccepted: nextprops.request.isaccepted,
          studentProject: nextprops.student.Projectname,
          recive: true
        }


      )


    }
    
    if(!(this.state.groups==null )){
      var isexsists=false
      this.state.groups.groups.map(element=>{
        element.students.map(stu=>{
          if(stu.Registrationnumber==this.props.user.Registrationnumber){
            isexsists=true
            this.setState({alreadyin:true})
          }
        })
      })
    }
    console.log(this.state.isaccepted)


    this.setState({ request: nextprops.request.request.reciver })

  }

  getrestrictions = () => {

    Axios.get("http://localhost:4000/api/getrestrictions/" + this.state.student.Projectname)
      .then(res => {
        console.log(res.data[0].Restrictions)
        this.setState({ Restrictions: res.data[0].Restrictions })
      })
      .catch(err => {

      })

  }
  creategroup() {
var groups=[]
    Axios.get('http://localhost:4000/api/pg/getstudents/'+this.props.user.Registrationnumber).then(res=>{
    console.log(res.data[0].Projectname)
            Axios.get('http://localhost:4000/api/getgroupsbyprojectname/'+res.data[0].Projectname).then(res=>{
              res.data[0].groups.map(ele=>{
                groups.push(ele)
              })
                     
              const students = []
              this.state.request.forEach(element => {
                const student = {}
                student.Registrationnumber = element.Registrationnumber
                students.push(student)
              });
              students.push({ Registrationnumber: this.state.user.Registrationnumber })
              const grp= {
                students: students,
                groupno: groups.length+1
              }
              console.log(grp)
              groups.push(grp)
            
              const submitGrps = {
          
                Projectname: this.state.student.Projectname,
                groups: groups
              }
              console.log(groups)
              Axios.put("http://localhost:4000/api/pg/addGroups", submitGrps)
                .then(res => {
                  swal({
                    title: "Good job!",
                    text: "You have succesfully Submit Groups!",
                    icon: "success",
                  });
                  this.props.getstudentProject(this.state.user.Registrationnumber)
                  this.props.cheackallaccepted(this.state.user.Registrationnumber)
                  Axios.delete("http://localhost:4000/api/deleterequest/" + this.props.user.Registrationnumber).then(res => {
          
                  })
          
                })
                .catch(err => {
                  console.log(err)
                  swal("Oops", "Something went wrong!!", "error")
                })


            })
        })
        .catch(err=>{

        })
       
    // this.props.getstudentProject(this.state.user.Registrationnumber)

 

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
    console.log(this.state)
   
    return (
      <div>
        <div style={{padding:'70px'}}>
        <PureComponent></PureComponent>
        </div>
      <div hidden={!(this.state.student == null) && this.state.student.Projectname.substring(7, 8) == 2}>

        {(this.state.student == null)
          ?
          <div>

            you havent assign project right now</div> :
          <div><h2 style={{ backgroundColor: 'blue', color: 'white', padding: '12px', borderRadius: '5px', marginBottom: '30px',marginLeft:'400px', width: '50%' }}>Project : {this.state.student.Projectname}</h2>

</div>
        }

          <div style={{ marginLeft: '200px' ,width:'50%',borderRadius: '5px', marginBottom: '30px'}} hidden={!this.state.alreadyin} >
          <h3 style={{ backgroundColor: 'red', color: '#1d1e22', padding: '12px', borderRadius: '5px', marginBottom: '30px',marginLeft:'200px', width: '90%' }} > You already in a group </h3>
            </div>

                {this.state.request ?
                  <div style={{ marginLeft: '200px' ,width:'50%'}} hidden={this.state.alreadyin} >
                        <div>

Group Requests
</div> 
                    <h3 style={{ backgroundColor: '#feda6a', color: '#1d1e22', padding: '12px', borderRadius: '5px', marginBottom: '30px' }} > Your Request. </h3>

                    <Table celled >
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
                      <Button secondary  onClick={this.creategroup} disabled={!this.state.isaccepted}>create your group</Button>
                      <Button secondary onClick={this.deleteRequest}>Delete Request</Button>

                    </Table>
                  </div>
                  :
                  <div style={{ marginLeft: '100px' }}   hidden={this.state.alreadyin} >
                    <h3 style={{ backgroundColor: '#feda6a', color: '#1d1e22', padding: '12px', borderRadius: '5px', marginBottom: '30px',marginLeft:'100px', width: '70%' }} >Hello {this.state.user.UserName} You Haven't Send Any Request Yet. If you wish to send request for create group click below </h3>

                    <Button onClick={this.showlist} secondary style={{padding:'12px', borderRadius: '5px', marginBottom: '30px'}}> Show Student list</Button>

                    <div hidden={!this.state.clicked}>
                      <h3 style={{ backgroundColor: 'red', color: '#1d1e22', padding: '12px', borderRadius: '5px', marginBottom: '30px', width: '90%' }} > Total Maximum member count is {this.state.Restrictions.total}. Group must contain atleast {this.state.Restrictions.cs} CS Students and {this.state.Restrictions.is} IS Students  </h3>

                      <Tables onCheck={(value) => value.length >= this.state.Restrictions.total
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
              </div>
    )
  }}
const mapStateToProps = state => {
  return (
    {
      user: state.auth.user,
      student: state.studentDetail,
      request: state.requests
    }

  )


}



export default connect(mapStateToProps, { getstudentProject, getstudentbyYear, getsendrequest, getrequest, cheackallaccepted, getuserprofile,getgroupsbyproject })(Student);