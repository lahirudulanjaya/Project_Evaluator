import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput ,MDBIcon ,MDBTable ,MDBTableBody ,MDBTableHead, Row,MDBFooter} from 'mdbreact';
import axios from 'axios'
import swal from 'sweetalert'
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux';
import {Input} from 'semantic-ui-react';
import NumericInput from 'react-numeric-input';
import { getuserprofile } from '../../../../actions/authActions'
import { Card, Icon, Image } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import NavBar from '../../EvaHedear'
import {whologgedin} from '../../../../actions/authActions'
import NavbarPage from '../../../S_coordinator/Component/SCoordinatorNavBar'

const profileIcon = require('../../image/profile-alt.png');


class ExamGroup  extends React.Component {

   constructor(props){
    super(props)
    this.state={
        evaluvator:'',
        Projectname:'',
        Milestone:'',
        groupno:'',
        show:false,
        Timeslot:{},
        group:{
            groupno:'',
            students:[]
        },
      
         
            groupmark:Number,
            individualmarks:[] 
        


    }
    if(!(whologgedin()=="evaluator")){
        this.props.history.push('/login')
    }
    var token =localStorage.getItem('jwttoken')

    axios.get('http://localhost:4000/api/userprofile',{headers:{"Authorization" : `Bearer ${token}`}}).then(res=>{
     
var user =res.data.user.UserName
axios.get("http://localhost:4000/api/getallformdata").then(res=>{
    var proname=''
    var groupno=''
    var prsent =false
    res.data.map(ele=>{
      this.setState({Milestone:ele.Milestone,Projectname : ele.Projectname ,groupno:ele.Timeslost.groupno,evaluvator:user})  
      if(ele.Timeslost.evaluvators.includes(user)){
          prsent =true
        groupno=ele.Timeslost.groupno
        proname=ele.Projectname
        this.setState({Projectname:ele.Projectname})
        this.setState({Timeslot:ele.Timeslost})
      }
        
    })
    if(prsent){
    axios.get("http://localhost:4000/api/getgroupsbyprojectname/"+proname).then(ress=>{
        
    console.log(ress.data[0])
    ress.data[0].groups.map(ee=>{
      
       if(ee.groupno==groupno){
        this.setState({group:ee})
       }
    })
 })
}
    
   
})
             
})
              
              .catch( err=>{
               
  
    })
    console.log(this.props.user.user)

    this.handleChange = this.handleChange.bind(this);

   }

   handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  submitmarks=()=>{
      const obj ={
        evaluvator:this.state.evaluvator,
        Projectname:this.state.Projectname,
        Milestone:this.state.Milestone,
        marks:{
            groupmark:this.state.groupmark,
            groupno:this.state.groupno 
        }
      }
    
    axios.post("http://localhost:4000/api/addmarks/",obj).then(ress=>{
        
        swal("sucess")

     })
     .catch(err=>{
        swal("Oops", "Something went wrong!!", "error")

     })
  }
   componentDidMount(){
       console.log(this.props)
      
        
        if(!(whologgedin()=="evaluator")){
            this.props.history.push('/login')
        }
    
    
   }


    render(){
        console.log(this.state)
        var getAllProjectNameArray=[]


        var allProjects=['g1','g2','g3','g4']

        return(
            <div>
                <NavbarPage></NavbarPage>
                <MDBContainer pt-4 mt-5>
                
                <Paper >
                    {/* <Form onSubmit={this.updateToStudentDetails}>
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
                    </Form> */}
                    {this.state.group.students.length>0  ?<div> 
                                            <h2>Individual Examing</h2>

                     <div className="row">
                         {this.state.group.students.map(student=>
                         <div className="col-6 col-sm-3">
               <Card>
               <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
               <Card.Content>
                 <Card.Header>{student.Registrationnumber}</Card.Header>
                 
              
               </Card.Content>
               <Card.Content extra>
               <input type="text" name="name" />
               </Card.Content>
             </Card>
             </div>
                         )}
          </div> 
          <div className="form-header rounded pt-4 mt-6">
                        <h2>Group Examing</h2>
                        <label>Overall Team</label><input name="groupmark" onChange={this.handleChange}  min={0} max={10} value={this.state.groupmark}/><br/>
                        <Button primary onClick={this.submitmarks}>Submit Marks </Button>

                    </div>
                    </div> :<div>
                    <h3 style={{ backgroundColor: 'red', color: '#1d1e22', padding: '12px', borderRadius: '5px', marginBottom: '30px',marginLeft:'80px', width: '90%' }} > You haven't any Evaluvation today </h3>

                    </div>}
                </Paper>
                </MDBContainer>
              
            </div>
        )
    }
}


const mapStateToProps = state => {
    console.log(state)
    return (    
        {
          user: state.auth.user,
        }    
    )
  }
 
export default connect(mapStateToProps, { getuserprofile })(ExamGroup);
