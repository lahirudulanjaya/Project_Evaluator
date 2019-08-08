import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput ,MDBIcon} from 'mdbreact';
import axios from 'axios'
import swal from 'sweetalert'
import {Form,Dropdown} from 'semantic-ui-react'
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead  } from 'mdbreact';
import {connect} from 'react-redux'
import axios from 'axios'

var teamMember
var groupno

class ExamGroup  extends React.Component {


    render(){
        const columns=['2016CS001','2016CS002','2016CS003','2016CS004']
        const rows=['milestone1','milestone2','milestone3','milestone4']
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