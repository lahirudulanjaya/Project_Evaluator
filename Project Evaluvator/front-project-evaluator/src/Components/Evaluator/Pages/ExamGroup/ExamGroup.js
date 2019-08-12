import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput ,MDBIcon ,MDBTable ,MDBTableBody ,MDBTableHead, Row,MDBFooter} from 'mdbreact';
import axios from 'axios'
import swal from 'sweetalert'
import {Form,Dropdown, Item,Button} from 'semantic-ui-react'
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux';
import {Input} from 'semantic-ui-react';
import NumericInput from 'react-numeric-input';
const profileIcon = require('../../image/profile-alt.png');




var teamMember
var groupno

class ExamGroup  extends React.Component {

   

    addSlot3(milestone,m1,m2,m3){
        var rowElement={
            milestone:milestone,
            m1:milestone+'-'+m1,
            m2:milestone+'-'+m2,
            m3:milestone+'-'+m3
        }
        return rowElement;
    }
    addSlot4(milestone,m1,m2,m3,m4){
        var rowElement={
            milestone:milestone,
            m1:<NumericInput name={milestone+'-'+m1} min={0} max={10} value={0}/>,
            m2:<NumericInput name={milestone+'-'+m2} min={0} max={10} value={0}/>,
            m3:<NumericInput name={milestone+'-'+m3} min={0} max={10} value={0}/>,
            m4:<NumericInput name={milestone+'-'+m4} min={0} max={10} value={0}/>,
        }
        return rowElement;
    }
    addSlot5(milestone,m1,m2,m3,m4,m5){
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
        // console.log('--++----'+getAllProjectNameArray);
        const teamMember=['2016CS001','2016CS002','2016CS003','2016CS004','2016CS005']
        const teamMemberImage=[profileIcon,profileIcon,profileIcon,profileIcon,profileIcon]
        const teamMemberLength=teamMember.length
        const milestoneList=['Delivery']
        const milestoneListLength=milestoneList.length
        

        const columns=[
            {
              label: ' ',
              field: 'id',
            }
           
        ]

        var i;
        for(i=0;i<teamMemberLength;i++){
            var member={
                label: <img style={{width: '100px', height: '100px'}} src={teamMemberImage[i]} />,
                field: <img src={teamMemberImage[i]} />/*<img src={ucscpng} />*/
              }
            columns.push(member)
        }
        const rows=[]
       

          var j;
          for(j=0;j<milestoneListLength;j++){
            //   var rowElement={}
            //   rowElement.milestone=milestoneList[j];
                if(teamMemberLength==5){
                    var teamp=this.addSlot5(milestoneList[j],teamMember[0],teamMember[1],teamMember[2],teamMember[3],teamMember[4],teamMember[5]);
                    rows.push(teamp);
                }
                else if(teamMemberLength==4){
                    var teamp=this.addSlot4(milestoneList[j],teamMember[0],teamMember[1],teamMember[2],teamMember[3],teamMember[4]);
                    rows.push(teamp);
                }
                else if(teamMemberLength==3){
                    var teamp=this.addSlot3(milestoneList[j],teamMember[0],teamMember[1],teamMember[2],teamMember[3]);
                    rows.push(teamp);
                }
           
          }


        var allProjects=['g1','g2','g3','g4']

        return(
            <div>
                <MDBContainer pt-4 mt-5>
                 <h1>Exam Group </h1>
                <Dropdown placeholder='Select Project'  selection options={getAllProjectNameArray} /*value={this.getAllProjectNameArray.Projectname} */ />
                <Paper >
                    <Form onSubmit={this.updateToStudentDetails}>
                    <div className="form-header rounded pt-4 mt-6">
                        <h2>Induvidual Examing</h2>
                    <MDBTable btn>
                        <MDBTableHead columns={columns} />
                        <MDBTableBody rows={rows} />
                    </MDBTable>
                    
                    </div>
                    <div className="form-header rounded pt-4 mt-6">
                        <h2>Group Examing</h2>
                        <label>Overall Team</label><NumericInput  min={0} max={10} value={0}/><br/>
                       
                    </div>
                    <Button type ='submit' color="primary" autoFocus>Submit</Button>
                    </Form>
                </Paper>
                </MDBContainer>
                <div style={{position: "fixed", left: "0px", width: "100%", bottom: "0px", backgroundColor: "", color: "white",
                    textAlign: "center"}}>
                        <MDBFooter color="blue" className="font-small pt-4 mt-4" >
                        
                        <div className="footer-copyright text-center py-3">
                            <MDBContainer fluid>
                            &copy; {new Date().getFullYear()} Copyright: <a href="https://www.teamExxo.com"> teamExxo.com </a>
                            </MDBContainer>
                        </div>
                        </MDBFooter>
                </div>
            </div>
        )
    }
}

export default ExamGroup ;