import React, { Component } from 'react';
import {getprojectnames} from '../../../../actions/ProjectActions'
import {connect} from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import _ from 'lodash'
import {getstudentbyYear}  from '../../../../actions/P_coodinator-Student'
import Table, {Thead, Tbody, Tr, Th, Td} from "react-row-select-table"
var grupnum=1
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
    }
    onchangeDropdown(e){
        this.setState({projectName:e.target.textContent})
        this.props.getstudentbyYear(e.target.textContent)

        
    }
  
    createGroup=(value)=>{
      console.log(value)
      const newGroup =[]
      newGroup.push.apply(newGroup,[this.state.data[value[0]],this.state.data[value[1]],this.state.data[value[2]],this.state.data[value[3]]])
      grupnum++
      const  group ={
        groupnum :grupnum,
        students :newGroup
      }
      groups.push(group)
      console.log(groups)
      var arr =this.state.data
      this.setState(this.state.data.splice(1,1))
      // value.forEach(element => {
      //   alert(element)
      //   arr.splice(element-1,1)
      //   this.setState(this.state.data.splice(element,1))
      // });
      // console.log(arr)
      
      alert("sdvsf")
      value.length=0

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