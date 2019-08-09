import React from './node_modules/react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput ,MDBIcon} from './node_modules/mdbreact';
import axios from './node_modules/axios'
import swal from './node_modules/sweetalert'
import {Form,Dropdown} from './node_modules/semantic-ui-react'


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