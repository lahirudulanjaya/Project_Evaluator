import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead,MDBInput,MDBFooter,MDBContainer } from 'mdbreact';
import {getstudentbyYear} from '../../../../actions/P_coodinator-Student'
import {connect} from 'react-redux'
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class EnhancedTable extends React.Component  {
  constructor(props){
    super(props)
  this.state={
    year:'',
    student:[],
    count:0
  }
  this.props.getstudentbyYear("1600")
  this.handleChange = this.handleChange.bind(this)

}

handleChange(e){
  this.setState({[e.target.name]: e.target.value});
}

  componentDidMount(){
    this.setState({student:this.props.students.studentbyYear})
  }
  searchstudent=()=>{
    this.props.getstudentbyYear(this.state.year)
  }
  componentWillReceiveProps(nextprops){
    this.setState({student:nextprops.students.studentbyYear})
  }

  render(){
  return (
    <div>
    <div>
      <TextField
          id="standard-password-input"
          label="Enter the year"         
          type="text"
          value={this.state.year}
          onChange={this.handleChange}
          name="year"
          autoComplete="current-password"
          margin="normal"
        />
        </div>
        <Button variant="contained" color="primary" onClick={this.searchstudent} >
        Search
      </Button>

    <MDBTable small >
      <MDBTableHead color="primary-color" textWhite>
        <tr>
          <th>Select</th>
          <th>Name</th>
          <th>Indexnumber</th>
          
        </tr>
      </MDBTableHead>
      {console.log(this.props.students)}
      <MDBTableBody>
      {this.state.student.map(student=>
        <tr>
          <td> <Checkbox color="primary"  ></Checkbox></td>
          <td>{student.Name}</td>
          <td>{student.Registrationnumber}</td>
        </tr>
      )}
        
      </MDBTableBody>
    </MDBTable>
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
  );
  }
}
const mapStatetoProps=(state)=>{
  return{
    students :state.studentDetail
  }
}

export default connect(mapStatetoProps,{getstudentbyYear})(EnhancedTable);

