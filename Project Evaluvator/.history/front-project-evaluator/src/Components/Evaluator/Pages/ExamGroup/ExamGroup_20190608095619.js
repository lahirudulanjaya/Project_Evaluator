import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput ,MDBIcon ,MDBTable ,MDBTableBody ,MDBTableHead} from 'mdbreact';
import axios from 'axios'
import swal from 'sweetalert'
import {Form,Dropdown} from 'semantic-ui-react'
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux'

var teamMember
var groupno

class ExamGroup  extends React.Component {


    render(){
        const teamMember=['2016CS001','2016CS002','2016CS003','2016CS004']
        const milestoneList=['milestone1','milestone2','milestone3','milestone4']
        const columns=[
            {
              label: '#',
              field: 'id',
            },
            {
              label: teamMember[0],
              field: 'first',
            },
            {
              label: teamMember[1],
              field: 'last',
            },
            {
              label: teamMember[2],
              field: 'handle',
              sort: 'asc'
            },
            {
              label: teamMember[3],
              field: 'button',
              
            }]
        const rows=[]
        var element={
            id:"milestone1",
            first:<input></input>,
            last:<input></input>,
            handle:<input></input>,
            button:<input></input>
          }
          rows.push(element)
        var allProjects=['g1','g2','g3','g4']

        return(
            <div>
                 <h1>ExamGroup text view</h1>
                <Dropdown placeholder='Select Project'  selection options={allProjects} />
                <Paper >
                    <MDBTable btn>
                        <MDBTableHead columns={columns} />
                        <MDBTableBody rows={rows} />
                    </MDBTable>
                </Paper>
               
            </div>
        )
    }
}

export default ExamGroup ;