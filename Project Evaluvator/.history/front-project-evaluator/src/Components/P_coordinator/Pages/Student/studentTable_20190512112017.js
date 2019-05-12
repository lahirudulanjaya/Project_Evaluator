import React, { Component } from 'react';
import {getprojectnames} from '../../../../actions/ProjectActions'
import {connect} from 'react-redux'
import { Dropdown ,Input} from 'semantic-ui-react'
import _ from 'lodash'
import {getstudentbyYear}  from '../../../../actions/P_coodinator-Student'
import Table, {Thead, Tbody, Tr, Th, Td} from "react-row-select-table"
import swal from 'sweetalert'
import Axios from 'axios';
import { Card,Button } from 'semantic-ui-react'
var groupno=1
var groups=[]
var Projectnames
class StudentTable extends React.Component{
    constructor(props){
        super(props)
        this.state={
            projectName:'',
            column: null,
            data: [],
            direction: null,
            students:[],
            isChecked: false,
            groupcount:null,
            disable:false,
            projects:[],
            Projects:[],
            
            groups:[]
        }
        this.onchangeDropdown =this.onchangeDropdown.bind(this)
        this.handleChecked = this.handleChecked.bind(this);
        this.submitGroups=this.submitGroups.bind(this)
        this.onchange=this.onchange.bind(this)
    }
    componentDidMount(){
      this.props.getprojectnames()
    }
   
    onchangeDropdown(e){   
      if(!(this.state.groupcount==null) && this.state.groupcount>0){
        this.setState({projectName:e.target.textContent})
        this.props.getstudentbyYear(e.target.textContent)
      
      }
      else{
        this.setState({projects:[]})
  
          alert("first you need to enter group count")
        } 
    
      
        
      }
      
    onclick=()=>{
      if(!(this.state.groupcount==null) && this.state.groupcount>0){
      this.setState({projects:this.state.Projects})
      }
      else{
        this.setState({projects:[]})
  
          alert("first you need to enter group count")
        }
    }
    submitGroups(){
      const submitGrps ={
        Projectname :this.state.projectName,
        groups :groups
      }
      console.log(submitGrps)
      Axios.put("http://localhost:4000/api/pg/addGroups",submitGrps)
      .then(res=>{
        swal({
          title: "Good job!",
          text: "You have succesfully Submit Groups!",
          icon: "success",
        });
      })
      .catch(err=>{
        swal ( "Oops" ,  "Something went wrong!!!" ,  "error" )
        console.log(err)
      })
    }
    createGroup=(value)=>{
      
      swal({
        title: "Are you sure you want to group this?",
        icon: "warning",
        buttons: true,
        dangerMode: false,
      })
      .then((result) => {
        if (result) {
          value.sort().reverse()
          const newGroup =[]
          newGroup.push.apply(newGroup,[this.state.data[value[0]],this.state.data[value[1]],this.state.data[value[2]],this.state.data[value[3]]])
         
          const  group ={
            groupno :groupno,
            students :newGroup
            }
            groupno++
          groups.push(group)
          this.setState(prevState => ({ groups: [...prevState.groups, group] }))
          console.log(this.state.data)
          value.forEach(element => {
            this.setState(this.state.data.splice(element,1))
          });
        
          value.length=0



          swal(
            'Cratead!',
            'Group has been created.',
            'success'
          )
        }
        else{
          value.length=0

        }
      })



    

    }
    handleChecked () {
        this.setState({isChecked: !this.state.isChecked});
        console.log(this.state.data)
      }

    onchange(e){
      if(!(this.state.groupcount==null) && this.state.groupcount>0){
        this.setState({disable:false})
      }
      this.setState({groupcount:e.target.value})

    }
    componentWillReceiveProps(nextProps){
      this.setState({projects:nextProps.project.project,
        Projects:nextProps.project.project}
        )
        this.setState({data:nextProps.student.studentbyYear})
        console.log(nextProps.project.project)

    }

    handleSort = (clickedColumn) => () => {
        const { column, data, direction } = this.state
    
        if (column !== clickedColumn) {
          this.setState({
            column: clickedColumn,
            data: _.sortBy(data, [clickedColumn]),
            direction: 'ascending',
          })
    
          return
        }
    
        this.setState({
          data: data.reverse(),
          direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
      }


    render(){
      console.log(this.state.projects)
      if(this.state.projects.length>0){
       var  Projectnames = this.state.projects.map(project=>
            ({
                key:project._id,
                text:project.Projectname,
                value:project.Projectname

            })
        )
          }
        

return(
  <div className="container">
  <div className="row">
    <div className="col-sm-12">
    
    {/* <Card fluid color='orange' header='Enter the number of student for group' /> */}
    <h3 style={{backgroundColor:'#302f2f',color:'#e8eaed',padding:'12px',borderRadius:'5px',marginBottom:'30px'}} >Enter the number of student for group</h3>

    <Input error type="number" placeholder='max student' onChange={this.onchange} value={this.state.groupcount}  name="groupcount"/>
    {/* <h1>select the project</h1> */}
    <h3 style={{backgroundColor:'#302f2f',color:'#e8eaed',padding:'12px',borderRadius:'5px',marginBottom:'30px'}} >Select the project</h3>

    
   
    <Dropdown placeholder='project' search selection options={Projectnames} defaultValue=""  onChange={this.onchangeDropdown} onClick={this.onclick} disabled={this.state.disable}/>
   
   
    {(this.state.data.length>0) ?
    <div>
    <Table onCheck={(value) => value.length>=this.state.groupcount
    ? this.createGroup(value)
    : console.log("fvfvf")
    }  >
          <Thead>
            <Tr>
              <Th>Registrationnumber</Th>
              <Th>Name</Th>
            </Tr>
          </Thead>
          
         
          
        <Tbody>
            {this.state.data.map(data=>

<Tr>
<Td>{data.Registrationnumber}</Td>
<Td>{data.Name}</Td>
</Tr>
              )}
               
              </Tbody>
       
          
           
           
           
        </Table>
    
        <div className="col-sm-6">
           <Button secondary  onClick={this.submitGroups}>Submit Groups</Button>
           </div>
           </div>:<div></div>}
</div>
 
<div className="col-sm-12">
Created Groups
</div>

<div className="row">  
 
       
        {this.state.groups.map(groups=>
        <div class="col-sm">
         <Card>
        <Card.Content>
        <Card.Header>Group No :{groups.groupno}</Card.Header>
        <Card.Meta>
          <span className='date'>Students </span>
          {groups.students.map(students=>
            <div>{students.Registrationnumber} : {students.Name}</div>
            )}
          
        </Card.Meta>
        
        </Card.Content>
        </Card>
        </div>
        )}
        
        </div>
        
</div>
</div>

    
)
    }

}
const mapStateToProps = state => {
    return{
  
    project: state.project, 
    student:state.studentDetail
   
  }};

export default connect(mapStateToProps,{getstudentbyYear,getprojectnames})(StudentTable)