import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput ,MDBIcon} from 'mdbreact';
import axios from 'axios'
import swal from 'sweetalert'
import {Form,Dropdown} from 'semantic-ui-react'


var teamMember
var groupno

class ExamGroup  extends React.Component {


    render(){

        var allProjects=['g1','g2','g3','g4']

        return(
            <div>
                 <h1>ExamGroup text view</h1>
                <Dropdown placeholder='Select Project'  selection options={allProjects} />

               
            </div>
        )
    }
}

export default ExamGroup ;