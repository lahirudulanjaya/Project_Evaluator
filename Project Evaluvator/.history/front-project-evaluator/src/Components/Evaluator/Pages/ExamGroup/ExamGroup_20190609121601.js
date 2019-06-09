import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput ,MDBIcon ,MDBTable ,MDBTableBody ,MDBTableHead, Row} from 'mdbreact';
import axios from 'axios'
import swal from 'sweetalert'
import {Form,Dropdown, Item,Button} from 'semantic-ui-react'
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux';
import {Input} from 'semantic-ui-react';
import NumericInput from 'react-numeric-input';



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
            m1:<NumericInput name={milestone+'-'+m1} min={0} max={10} value={0}/>,
            m2:<NumericInput name={milestone+'-'+m2} min={0} max={10} value={0}/>,
            m3:<NumericInput name={milestone+'-'+m3} min={0} max={10} value={0}/>,
            m4:<NumericInput name={milestone+'-'+m4} min={0} max={10} value={0}/>,
        }
        return rowElement;
    }
    addSlot(milestone,m1,m2,m3,m4,m5){
        var rowElement={
            milestone:milestone,
            m1:<NumericInput name={milestone+'-'+m1} min={0} max={10} value={0}/>,
            m2:<NumericInput name={milestone+'-'+m2} min={0} max={10} value={0}/>,
            m3:<NumericInput name={milestone+'-'+m3} min={0} max={10} value={0}/>,
            m4:<NumericInput name={milestone+'-'+m4} min={0} max={10} value={0}/>,
            m5:<NumericInput name={milestone+'-'+m5} min={0} max={10} value={0}/>,
        }
        return rowElement;
    }

    updateToStudentDetails(){
        console.log('--------updateToStudentDetails-------');
    }

    getAllProjectName(){
        axios.get("http://localhost:4000/api/pg/getprojectsnames")
     .then(res=>{
        //  var ar=[];
        console.log(res)
        console.log(res.data)

        console.log('----------Projectname')
       console.log(res.status)
       console.log('----------Projectname')
    //    const len=res.data.length;
    //    var i;
    //    for(i=0;i<len;i++){
    //         ar[i]=res.data[i].Projectname;
    //    }
    //    console.log('----------ar')
    //    console.log('--------'+ ar + '--Projectname')
       return res.data;

    //    this.setState({groups:res.data})
      })
     .catch(err=>{
      console.log(err)
    })
    }

    render(){
        var getAllProjectNameArray=[]
        getAllProjectNameArray=this.getAllProjectName();
        console.log(getAllProjectNameArray);
        const teamMember=['2016CS001','2016CS002','2016CS003','2016CS004','2016CS005','2016CS006']
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
                <Dropdown placeholder='Select Project'  selection options={getAllProjectNameArray} /*value={this.getAllProjectNameArray.Projectname} */ />
                <Paper >
                    <Form onSubmit={this.updateToStudentDetails}>
                    <MDBTable btn>
                        <MDBTableHead columns={columns} />
                        <MDBTableBody rows={rows} />
                    </MDBTable>
                    <Button type ='submit' color="primary" autoFocus>Submit</Button>
                    </Form>
                </Paper>
               
            </div>
        )
    }
}

export default ExamGroup ;