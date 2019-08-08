import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput ,MDBIcon} from 'mdbreact';
import axios from 'axios'
import swal from 'sweetalert'
import {Form,Dropdown} from 'semantic-ui-react'


var teamMember
var groupno

class ExamGroup  extends React.Component {


    render(){
        return(
            <div>
                <Dropdown placeholder='Select Project to Update Milestone'  selection options={stateOptions3}  value={this.state.Projectname} onChange={this.handleChange}/>

                <h1>ExamGroup text view</h1>
            </div>
        );
    }
}

export default ExamGroup ;