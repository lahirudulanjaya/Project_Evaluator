import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput ,MDBIcon ,MDBTable ,MDBTableBody ,MDBTableHead, Row} from 'mdbreact';
import axios from 'axios'
import swal from 'sweetalert'
import {Form,Dropdown, Item} from 'semantic-ui-react'
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux'
import {Input} from 'semantic-ui-react'


var teamMember
var groupno

class ExamGroup  extends React.Component {


    render(){
        const teamMember=['2016CS001','2016CS002','2016CS003','2016CS004','2016CS005']
        const teamMemberLength=teamMember.length
        const milestoneList=['milestone1','milestone2','milestone3','milestone4']
        const milestoneListLength=milestoneList.length

        const columns=[
            {
              label: '#',
              field: 'id',
            }
           
        ]

        var i;
        for(i=0;i<teamMemberLength;i++){
            var member={
                label: teamMember[i],
                field: teamMember[i]
              }
            columns.push(member)
        }

        const rows=[]
       

          var j,q;
         
          for(j=0;j<milestoneListLength;j++){
            var tempMember
            var rowElement={}
              rowElement.milestone=milestoneList[j];
              
            for(q=0;q<teamMemberLength;q++){
                var iteam=milestoneList[j]+'-'+teamMember[q];
                //  tempMember=teamMember[q];
                rowElement.teamMember[q]=iteam;

                console.log("11111111111111111111111111"+rowElement.);


            }
            rows.push(rowElement);
            console.log("2222222222222222222"+rowElement);
          }


        var allProjects=['g1','g2','g3','g4']

        return(
            <div>
                 <h1>Exam Group </h1>
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