import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput ,MDBIcon} from 'mdbreact';
import axios from 'axios'
import swal from 'sweetalert'
import {Form,Dropdown} from 'semantic-ui-react'


var teamMember
var groupno

class ExamGroup  extends React.Component {

    teamMember=group.students.map(stu=>
        <div class="two fields">
    <Input value={stu.Registrationnumber} onChange={(e) => {this.onchange1(e, group.groupno,stu.Name)}} name="Registrationnumber" ></Input>
    <Input value={stu.Name} onChange={(e) => {this.onchange1(e, group.groupno,stu.Registrationnumber)}} name="Name"></Input>
    </div>
    )

    groupno=group.groupno

    
<Input value ={stu.Registrationnumber} onChange={(e) => {this.onchange1(e, group.groupno,stu.Name)}} name="Registrationnumber" ></Input>
<Input value={stu.Name} onChange={(e) => {this.onchange1(e, group.groupno,stu.Registrationnumber)}} name="Name"></Input>

    onchange1=(e,groupno,reg)=>{
        var namee =e.target.name
        var value =e.target.value
    var newgrp=[]
        this.state.groups[0].groups.map(grp=>{
          if(grp.groupno==groupno){
            var student=[]
            grp.students.map(st=>{
              if(st.Registrationnumber==reg){
                const students={
                  Registrationnumber:reg,
                  Name:value,
                  Projectname:this.state.Projectname
                }
                student.push(students)
              }
              else{
                student.push(st)
              }
            })
            var grup={
              students:student,
              groupno:grp.groupno,
    
            }
            newgrp.push(grup)
          }
          else{
            newgrp.push(grp)
          }
        })
        this.setState({updategroups:newgrp})
        var arr=[]
        arr.push({groups:newgrp})
        this.setState({groups:arr});
    console.log(this.state)
    
      }

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