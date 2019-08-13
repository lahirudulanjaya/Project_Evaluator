
import React from 'react'
import { getuserprofile } from '../../actions/authActions'
import { connect } from 'react-redux'
import axios from 'axios'
import { Table, Button, Icon } from 'semantic-ui-react'

class StudentProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            groups:[]

         }
         console.log(this.props)
    }
    componentDidMount(){
        axios.get('http://localhost:4000/api/pg/getstudents/'+this.props.user.Registrationnumber).then(res=>{
    console.log(res.data[0].Projectname)
            axios.get('http://localhost:4000/api/getgroupsbyprojectname/'+res.data[0].Projectname).then(res=>{
                this.setState({groups:res.data[0].groups})
            })
        })
        .catch(err=>{

        })
    }
    render() { 
        return (
            <div>            
                <h2>Your Project</h2>
                <h3>Group List</h3>
                <div style={{ marginLeft: '100px' }}>
              
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

                        {this.state.groups.map(groups =>
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
                  </div> 

            </div> 
         );
    }
}
const mapStateToProps = state => {
    console.log(state)
    return (    
        {
          user: state.auth.user,
        }    
    )
  }
 
export default connect(mapStateToProps, { getuserprofile })(StudentProject);

