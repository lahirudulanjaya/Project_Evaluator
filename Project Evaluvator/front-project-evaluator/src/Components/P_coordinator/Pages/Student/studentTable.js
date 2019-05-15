import React, { Component } from 'react';
import {getprojectnames,getproject} from '../../../../actions/ProjectActions'
import {connect} from 'react-redux'
import { Dropdown ,Input} from 'semantic-ui-react'
import _ from 'lodash'
import {getstudentbyYear}  from '../../../../actions/P_coodinator-Student'
import Table, {Thead, Tbody, Tr, Th, Td} from "react-row-select-table"
import swal from 'sweetalert'
import Axios from 'axios';
import { Card,Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { MDBBtn } from 'mdbreact';
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
            hidden:true,
            created:false,
            groups:[]
        }
        this.onchangeDropdown =this.onchangeDropdown.bind(this)
        this.handleChecked = this.handleChecked.bind(this);
        this.submitGroups=this.submitGroups.bind(this)
        this.onchange=this.onchange.bind(this)
    }
    componentDidMount(){
     
      this.setState({data:[]})
      this.props.getprojectnames()
    }
   
    onchangeDropdown(e){  
      
      if(!(this.state.groupcount==null) && this.state.groupcount>0){
        this.setState({projectName:e.target.textContent})
        this.props.getstudentbyYear(e.target.textContent)
        this.props.getproject(e.target.textContent)

        this.setState({disable:true})
      
      }
      else{
        this.setState({projects:[]})
  
        } 
    
      
        
      }
      
    onclick=()=>{
      if(!(this.state.groupcount==null) && this.state.groupcount>0){
      this.setState({projects:this.state.Projects})
      }
      else{
       
          swal({
            title: "first you need to enter group count!",
            
            icon: "info",
            dangerMode:true
          });
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
          value.forEach(element => {
            newGroup.push(this.state.data[element])
          });
          
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
        this.setState({hidden:false})
      }
      this.setState({groupcount:e.target.value})

    }
    componentWillReceiveProps(nextProps){
      if(nextProps.project.Currentproject.length>0  && !this.state.hidden && nextProps.project.Currentproject[0].groups.length>0){
        this.setState({created:true})
      }
      this.setState({projects:nextProps.project.project,
        Projects:nextProps.project.project}
        )
        if(!this.state.hidden){
        this.setState({data:nextProps.student.studentbyYear})
        }
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
  <div className="container" style={{borderBlockColor:'red'}}>
  <div className="row">
    <div className="col-sm-12">
    
    {/* <Card fluid color='orange' header='Enter the number of student for group' /> */}
    <h3 style={{backgroundColor:'#F9A602',color:'black',padding:'12px',borderRadius:'5px',marginBottom:'30px'}} >Enter the number of student for group</h3>

    <Input disabled={this.state.disable} error style={{width:'175px'}} type="number" placeholder='max student' onChange={this.onchange} value={this.state.groupcount}  name="groupcount"/>
    {/* <h1>select the project</h1> */}
    <div hidden ={this.state.hidden}>
    <h3 style={{backgroundColor:'#F9A602',color:'black',padding:'12px',borderRadius:'5px',marginBottom:'30px'}} >Select the project</h3>

    
   
    <Dropdown   placeholder='project' search selection options={Projectnames} defaultValue=""  onChange={this.onchangeDropdown} onClick={this.onclick} />
   
    </div>
{!(this.state.created) ?
  <div>
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
           </div>: !this.state.hidden && this.state.disable ? <div><Card fluid color='red' header='No students allowed to this Project' /> </div>
          :<div></div> 
          }
           </div>
           :
           <div><Card fluid color='red' header='You have already created groups ...... click here for update groups' /><Button secondary onClick={this.updateGroup}><Link to="/pg/updategroups"> Update</Link></Button></div>
            }
</div>

 


<div className="row">  
 {this.state.groups.length>0 ?
<div className="col-sm-12">
  Created Groups
</div>
:<div></div>}
       
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

export default connect(mapStateToProps,{getstudentbyYear,getprojectnames,getproject})(StudentTable)