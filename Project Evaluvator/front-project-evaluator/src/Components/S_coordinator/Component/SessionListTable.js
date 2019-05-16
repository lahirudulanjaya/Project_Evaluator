import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import {getallprojects} from '../../../actions/ProjectActions';
import {connect} from 'react-redux'
import axios from 'axios'
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead  } from 'mdbreact';

import moment from 'moment'






class  SessionListTable extends React.Component {
  constructor(props){
    super(props)
    this.state={
      Projects:[],
      Presentations:[]
    }
  }
  componentDidMount()
  {
    this.props.getallprojects()
    axios.get("http://localhost:4000/api/allmilestone")
    .then(res=>{
      this.setState({Presentations:res.data})
    })
    .catch(err=>{

    })
  }
  componentWillReceiveProps(next){
this.setState({Projects:next.project.projects})
  }
  render(props){
console.log(this.state)


const columns= [
  {
    label: '#',
    field: 'id',
  },
  {
    label: 'Project Name',
    field: 'first',
  },
  {
    label: 'Presentation ',
    field: 'last',
  },
  {
    label: 'Approximate Date',
    field: 'handle',
    sort: 'asc'
  },
  {
    label: 'Manage',
    field: 'button',
    
  }
];



var rows=[]
var i=1
this.state.Projects.map(Projects=>{
  this.state.Presentations.map(pres=>{
    if(Projects.Projectname == pres.Projectname){
      var dat = new Date(Projects.Initiatedate)
      var date =  moment(Number(dat.getTime() + 60000*60*24*7*(pres.Duration))).format("DD MMM YYYY hh:mm a")
      var element={
        id:i,
        first:Projects.Projectname,
        last:pres.name,
        handle: date,
        button:<MDBBtn color="blue" outline size="sm">Click</MDBBtn>
      }
      rows.push(element)
      i++
    }
  })
})




  return (
    <Paper >
      <MDBTable btn>
      <MDBTableHead columns={columns} />
      <MDBTableBody rows={rows} />
    </MDBTable>
    </Paper>
  );
}
}


const mapStateToProps =state =>{
  console.log(state)
  return{
  
    project: state.project, 
  
  }
}

export default connect(mapStateToProps,{getallprojects})(SessionListTable);