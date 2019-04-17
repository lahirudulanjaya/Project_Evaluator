import React, { Component } from 'react';
import {getprojectnames} from '../../../../actions/ProjectActions'
import {connect} from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import _ from 'lodash'
import {getstudentbyYear}  from '../../../../actions/P_coodinator-Student'
import Table, {Thead, Tbody, Tr, Th, Td} from "react-row-select-table"
import swal from 'sweetalert'
import { Button } from 'semantic-ui-react'
import Axios from 'axios';

var groupno=1
var groups=[]
class studentTable extends React.Component{
    constructor(props){
        super(props)
        this.props.getprojectnames()
        this.state={
            projectName:'',
            column: null,
            data: [],
            direction: null,
            students:[],
            isChecked: false
        }
        this.onchangeDropdown =this.onchangeDropdown.bind(this)
        this.handleChecked = this.handleChecked.bind(this);
        this.submitGroups=this.submitGroups.bind(this)
    }
    onchangeDropdown(e){
        this.setState({projectName:e.target.textContent})
        this.props.getstudentbyYear(e.target.textContent)

        
    }
    submitGroups(){
      const submitGrps ={
        Projectname :this.state.projectName,
        groups :groups
      }
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
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((result) => {
        if (result) {
          value.sort().reverse()
          const newGroup =[]
          newGroup.push.apply(newGroup,[this.state.data[value[0]],this.state.data[value[1]],this.state.data[value[2]],this.state.data[value[3]]])
          groupno++
          const  group ={
            groupno :groupno,
            students :newGroup
            }
          groups.push(group)
          console.log(groups)
          value.forEach(element => {
            this.setState(this.state.data.splice(element,1))
          });
        
          value.length=0




          swal(
            'Cratead!',
            'Your file has been deleted.',
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
    componentWillReceiveProps(nextProps){
        this.setState({data:nextProps.student.studentbyYear})
        console.log(nextProps.student.studentbyYear)

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
        const Projectnames = this.props.project.project.map(project=>
            ({
                key:project._id,
                text:project.Projectname,
                value:project.Projectname

            })
        )
        

return(
    <div>
    <h1>select the project</h1>
    
   
    <Dropdown placeholder='State' search selection options={Projectnames} onChange={this.onchangeDropdown} />
   
    <Button secondary  onClick={this.submitGroups}>Submit Groups</Button>
    <Table onCheck={(value) => value.length>=4 
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
    
    
</div>


    
)
    }

}
const mapStateToProps = state => {
    return{
  
    project: state.project, 
    student:state.studentDetail
   
  }};

export default connect(mapStateToProps,{getstudentbyYear,getprojectnames})(studentTable)