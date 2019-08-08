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

    addSlot(milestone,m1,m2,m3){
        var rowElement={
            milestone:milestone,
            m1:milestone+'-'+m1,
            m2:milestone+'-'+m2,
            m3:milestone+'-'+m3
        }
        return rowElement;
    }
    addSlot(milestone,m1,m2,m3,m4){
        var rowElement={
            milestone:milestone,
            m1:milestone+'-'+m1,
            m2:milestone+'-'+m2,
            m3:milestone+'-'+m3,
            m4:milestone+'-'+m4
        }
        return rowElement;
    }
    addSlot(milestone,m1,m2,m3,m4,m5){
        var rowElement={
            milestone:milestone,
            m1:milestone+'-'+m1,
            m2:milestone+'-'+m2,
            m3:milestone+'-'+m3,
            m4:milestone+'-'+m4,
            m5:milestone+'-'+m5
        }
        return rowElement;
    }

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
       

          var j;
          for(j=0;j<milestoneListLength;j++){
            //   var rowElement={}
            //   rowElement.milestone=milestoneList[j];
                if(teamMemberLength==5){
                    var teamp=this.addSlot(milestoneList[j],teamMember[0],teamMember[1],teamMember[2],teamMember[3],teamMember[4],teamMember[5]);
                    rows.push(teamp);
                }
                else if(teamMemberLength==4){
                    var teamp=this.addSlot(milestoneList[j],teamMember[0],teamMember[1],teamMember[2],teamMember[3],teamMember[4]);
                    rows.push(teamp);
                }
                else if(teamMemberLength==3){
                    var teamp=this.addSlot(milestoneList[j],teamMember[0],teamMember[1],teamMember[2],teamMember[3]);
                    rows.push(teamp);
                }
           
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