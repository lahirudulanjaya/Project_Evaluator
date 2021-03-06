import React from 'react';
import { getprojectnames, getproject } from '../../../../actions/ProjectActions'
import { connect } from 'react-redux'
import { Dropdown, Input } from 'semantic-ui-react'
import _ from 'lodash'
import { getstudentbyYear } from '../../../../actions/P_coodinator-Student'
import Table, { Thead, Tbody, Tr, Th, Td } from "react-row-select-table"
import swal from 'sweetalert'
import Axios from 'axios';
import { Card, Button, Grid, Segment, Form, Divider, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {MDBFooter,MDBContainer} from 'mdbreact';

var groupno = 1
var groups = []
var Projectnames
var data = []
var dataa = []
var students = []
var selectedstudents = []
class StudentTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      projectName: '',
      column: null,
      data: [],
      direction: null,
      students: [],
      isChecked: false,
      groupcount: null,
      disable: false,
      projects: [],
      Projects: [],
      hidden: true,
      created: false,
      groups: [],
      clicked: false,
      selectcount: false,
      filtervalue: '',
      Data: [],
      Selectedstudent: [],
      total:0,
      cs:0,
      is:0
    }
    this.onchangeDropdown = this.onchangeDropdown.bind(this)
    this.handleChecked = this.handleChecked.bind(this);
    this.submitGroups = this.submitGroups.bind(this)
    this.onchange = this.onchange.bind(this)
    this.searchStudent = this.searchStudent.bind(this)
  }
  componentDidMount() {
    this.setState({ data: [] })
    this.props.getprojectnames()
  }





  searchStudent(e) {
    dataa = []
    this.setState({ filtervalue: e.target.value })
    this.state.Data.map(data => {
      var name = data.Registrationnumber
      console.log(name.includes(e.target.value))
      if (name.includes(e.target.value)) {
        dataa.push(data)
      }
    })
    console.log(dataa)
    this.setState({ data: dataa })

  }







  onchangeDropdown(e) {
    this.setState({ clicked: false ,created:false})
    this.setState({ data: [], groups: [] })
    this.setState({ projectName: e.target.textContent })
    this.props.getstudentbyYear(e.target.textContent)
    this.props.getproject(e.target.textContent)
  }




  onclick = () => {
    if (!(this.state.groupcount == null) && this.state.groupcount > 0) {
      this.setState({ projects: this.state.Projects })
    }
    else {
      swal({
        title: "first you need to enter group count!",
        icon: "info",
        dangerMode: true
      });
    }
  }



  submitGroups() {
    const submitGrps =
    {
      Projectname: this.state.projectName,
      groups: groups
    }
    console.log(submitGrps)
    Axios.put("http://localhost:4000/api/pg/addGroups", submitGrps)
      .then(res => {
        swal({
          title: "Good job!",
          text: "You have succesfully Submit Groups!",
          icon: "success",
        });
      })
      .catch(err => {
        swal("Oops", "Something went wrong!!!", "error")
        console.log(err)
      })
  }




  setslectedvalue = (value) => {
    var stud = []
    students.push(this.state.data[value[0]])
    selectedstudents.push(this.state.data[value[0]])
    this.setState({ Selectedstudent: students })
    this.props.student.studentbyYear.forEach(element => {
      var alreadyin = true
      selectedstudents.map(stude => {
        if ((element.Registrationnumber == stude.Registrationnumber)) {
          alreadyin = false
        }
      }
      )
      if (alreadyin) {
        stud.push(element)
      }
    });
    this.setState({ data: stud })
    var arr = this.state.data
    this.setState({ Data: arr })


    if (this.state.Selectedstudent.length >= this.state.groupcount) {
      swal({
        title: "Are you sure you want to group this?",
        icon: "warning",
        buttons: true,
        dangerMode: false,
      })
        .then((result) => {
          if (result) {
            const group = {
              groupno: groupno,
              students: this.state.Selectedstudent
            }
            groupno++
            groups.push(group)
            this.setState(prevState => ({ groups: [...prevState.groups, group] }))
            value.length = 0
            swal(
              'Cratead!',
              'Group has been created.',
              'success'
            )
            this.setState({ Selectedstudent: [] })
            students = []

          }
          else {
            console.log(this.state.data)

            value.length = 0
            this.state.Selectedstudent.map(stu => {
              this.setState(prevState => ({ data: [...prevState.data, stu] }))

              var found = false
              selectedstudents.map(sstudent => {
                if (sstudent.Registrationnumber == stu.Registrationnumber) {
                  found = true
                }
                if (found) {
                  delete selectedstudents[selectedstudents.indexOf(sstudent)]
                  found = false
                }
              })

              ////////////////////////////////////////////////////////selectedstudents.splice()      must set for selected students cansellllll
            }
            )
            console.log(this.state.data)

            var arr = this.state.data
            this.setState({ Data: arr })
            this.setState({ Selectedstudent: [] })
            students = []
          }
        })
    }
  }
 






  handleChecked() {
    this.setState({ isChecked: !this.state.isChecked });
    console.log(this.state.data)
  }

  onchange(e) {
    if (!(this.state.groupcount == null) && e.target.value <= 0) {
      this.setState({ groupcount: 0 })
      swal({
        title: "Select a positive value",

        icon: "info",
        dangerMode: true
      })
    }

    this.setState({ groupcount: e.target.value })

  }
  onChange = (e) => {
   
      this.setState({[e.target.name]: e.target.value});
    
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.project.Currentproject.length > 0 && nextProps.project.Currentproject[0].groups.length > 0 && this.state.projectName.length>0)
    if (nextProps.project.Currentproject.length > 0 && nextProps.project.Currentproject[0].groups.length > 0 && this.state.projectName.length>0) {
      this.setState({ created: true })
    }
    else{
      this.setState({ created: false })

    }
    this.setState({
      projects: nextProps.project.project,
      Projects: nextProps.project.project
    }
    )

    console.log(nextProps)
console.log(this.state)
  }
  setdata = () => {
    this.setState({Data:[],Selectedstudent:[],groups:[]})
    students=[]
    selectedstudents=[]
    
    console.log(this.state.data.length)
    this.setState({ clicked: true })


    groups = []
    groupno = 1
    if (!(this.state.groupcount == null) && this.state.groupcount > 0 && this.state.projectName.length > 0) {
      this.setState({ selectcount: true })
      this.setState({ data: this.props.student.studentbyYear, Data: this.props.student.studentbyYear })
    }
    else if (this.state.projectName.length <= 0) {

      swal({
        title: "Select the Project!",

        icon: "info",
        dangerMode: true
      });
      this.setState({ data: [], selectcount: false })
    }
    else if ((this.state.groupcount == null) && this.state.groupcount <= 0) {

      swal({
        title: "Select the Group Count!",

        icon: "info",
        dangerMode: true
      });
      this.setState({ data: [], selectcount: false })
    }

  }


  handleSort = (clickedColumn) => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }
  submitRestrictions=()=>{
   
      

    const  Restrictions={
        Projectname:this.state.projectName,
          total :this.state.total,
          cs:this.state.cs,
          is :this.state.is
      }
  
  console.log(Restrictions)
    Axios.put("http://localhost:4000/api/setrestrictions",Restrictions)
    .then(res => {
      swal({
        title: "Good job!",
        text: "You have succesfully Submit Groups!",
        icon: "success",
      });
    })
    .catch(err => {
      swal("Oops", "Something went wrong!!!", "error")
      console.log(err)
    })
  }


  render() {
    console.log(this.state)
    if (this.state.projects.length > 0) {
      var Projectnames = this.state.projects.map(project =>
        ({
          key: project._id,
          text: project.Projectname,
          value: project.Projectname

        })
      )
    }


    return (
      
      <div className="container pt-3">
        <div style={{border:'2px solid #AFB1B4', borderRadius:'5px', backgroundColor:'#C2C5C9',marginBottom:'100px'}}>
        <h2>Create groups for project</h2>

        <div className="row pt-3">
          
          <div className="col-sm-3">

          </div>

          <div className="col-sm-6 " style={{border:'2px', borderRadius:'5px', backgroundColor:'#3E85CD'}}>
            <div className="row">
              <div className="col-sm-12">
              </div>
            </div>
            <div className="row pb-3 pt-3">
              <div className="col-sm-6">
                <h3 style={{textAlign:"left"}}>Select the project</h3>
              </div>
              <div className="col-sm-6">
                <div style={{textAlign:"left"}}>
                <Dropdown placeholder='project' search selection options={Projectnames} defaultValue="" onChange={this.onchangeDropdown} />
                </div>
              </div>
            </div>
            <div hidden={this.state.created} >

            <div className="row pb-3">
              <div className="col-sm-6">
                <h3 style={{textAlign:"left"}}>Enter the number of student for a group</h3>
              </div>
              <div className="col-sm-6">
                <div style={{textAlign:"left"}}>
                  <Input disabled={this.state.disable} error style={{ width: '175px' }} type="number" placeholder='max student' onChange={this.onchange} value={this.state.groupcount} name="groupcount" />
                </div>
              </div>
            </div>
            <div className="row pb-3">
              <div className="col-sm-12">
                <Button secondary onClick={this.setdata}>Show student list</Button>

              </div>
            </div>
            </div>
          </div>
          </div>
          <div className="col-sm-12 pt-3 pb-3">
            
            {!(this.state.created) ?
              <div >

                <Segment placeholder>
                  <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>

                      <div >
                        <Input icon='search' placeholder='Search...' onChange={this.searchStudent} value={this.state.filtervalue} />

                        {(this.state.data.length > 0) ?
                          <div>

                            <Table onCheck={(value) => this.setslectedvalue(value)

                            }  >

                              <Thead>
                                <Tr>
                                  <Th>Registrationnumber</Th>
                                  <Th>Name</Th>
                                </Tr>
                              </Thead>



                              <Tbody>
                                {this.state.data.map(data =>

                                  <Tr>
                                    <Td>{data.Registrationnumber}</Td>
                                    <Td>{data.Name}</Td>
                                  </Tr>
                                )}

                              </Tbody>





                            </Table>


                          </div> : ((this.state.clicked) && (this.state.data.length < 1) && (this.state.selectcount)) ? <div>        {console.log(this.state)}
<Card fluid color='red' header='No student Found' /> </div>
                            : <div></div>
                        }
                      </div>


                    </Grid.Column>

                    <Grid.Column >
                      <h3>Selected students list</h3>
                      <List divided relaxed>

                        {this.state.Selectedstudent.map(student =>
                          <List.Item>
                            <List.Icon name='user' size='large' verticalAlign='middle' />
                            <List.Content >
                              <List.Header as='a'>{student.Registrationnumber}  {student.Name}</List.Header>
                            </List.Content>
                          </List.Item>

                        )
                        }


                      </List>
                    </Grid.Column>
                  </Grid>

                  <Divider vertical></Divider>
                </Segment>

              </div>

              :
              <div>        {console.log(this.state)}
              <Card fluid color='red' header='You have already created groups ...... click here for update groups' /><Button secondary onClick={this.updateGroup}><Link to="/pg/updategroups"> Update</Link></Button></div>
            }
          </div>


          <div className="row">
            {this.state.groups.length > 0 ?
              <div className="col-sm-12">
                <h3>Created Groups</h3>
</div>
              : <div></div>}

            {this.state.groups.map(groups =>
              <div class="col-sm" style={{ padding: '10px' }}>
                <Card color='blue'>
                  <Card.Content>
                    <Card.Header>Group No :{groups.groupno}</Card.Header>
                    <Card.Meta>
                      <span className='date'>Students </span>
                      {groups.students.map(students =>
                        <div>{students.Registrationnumber} : {students.Name}</div>
                      )}

                    </Card.Meta>

                  </Card.Content>
                </Card>
              </div>
            )}

          </div>

        </div>
        <div className="col-sm-6">
          <Button hidden={this.state.data.length == 0 && this.state.groups.length < 2} secondary onClick={this.submitGroups}>Submit Groups</Button>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <h3 style={{ backgroundColor: 'blue', color: 'white', padding: '12px', borderRadius: '5px', marginBottom: '30px' }} >Set restrictions for Creating groups for 3rd year students</h3>

            <Form>
            <Dropdown placeholder='project' search selection options={Projectnames} defaultValue="Select the project" onChange={this.onchangeDropdown} />

              <Form.Group widths='equal'>
  <Form.Field controlId="formBasicEmail">
    <label>Maximum number of members per group</label>
    <input type="number" placeholder="Maximum members" name="total" value={this.state.total} onChange={this.onChange}/>
   
  </Form.Field>
  <Form.Field controlId="formBasicPassword">
    <label>Minimum IS Students per group</label>
    <input type="number" placeholder="Minimun IS students" name ="is" value={this.state.is} onChange={this.onChange} />
  </Form.Field>
  <Form.Field controlId="formBasicPassword">
    <label>Minimum CS Students per group</label>
    <input type="number" placeholder="Minimun CS students" name="cs" value={this.state.cs} onChange={this.onChange} />
  </Form.Field>
  </Form.Group>
 
  <Button secondary type="submit" onClick={this.submitRestrictions} >
    Submit
  </Button>
</Form>



            </div>
            </div>
       
      </div>


    )
  }

}
const mapStateToProps = state => {
  console.log(state)
  return {

    project: state.project,
    student: state.studentDetail

  }
};

export default connect(mapStateToProps, { getstudentbyYear, getprojectnames, getproject })(StudentTable)