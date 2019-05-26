import React,{Component} from 'react';
import { MDBTable, MDBTableBody, MDBTableHead ,MDBDataTable} from 'mdbreact';

import {connect} from 'react-redux'
import {Input} from 'semantic-ui-react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Form,Dropdown,Button} from 'semantic-ui-react'
import _ from 'lodash'
import axios from 'axios'
import swal from 'sweetalert';
import {getprojectnames} from '../../../../actions/ProjectActions'
import { getpresentations } from '../../../../actions/milestoneActions'
import {Link }from 'react-router-dom'

import { Card} from 'semantic-ui-react'
class Updatetimeslots extends React.Component{
    constructor(props){
        super(props)
        this.state={
          Projectname:'',
          presentations:[],
          changewith:'',
          timeslots:{
            Milestone:'',
            Timeslosts:[
              {
                starttime:'',
                endtime:'',
                evaluvators:[],
                venue:''
              }
            ],
            Evaluvatorlist:[]
          },
          replacevaluvator:'',
          selectedEvaluvator:'',
          withchangeEvaluvator:'',
          presentation:'',
          open:false,
          updateProject:{
              Projectname:'',
              Initiatedate:'',
              Acadamicyear:'',
              ProjectType:''

          }
        }
        this.serchProject=this.serchProject.bind(this)
        this.onchange1=this.onchange1.bind(this)
        this.onchange=this.onchange.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.onchangeDropdown1=this.onchangeDropdown1.bind(this)
      }

      
    onchangeDropdown1(e){
       
        this.setState({presentation:e.target.textContent})

        axios.get("http://localhost:4000/api/gettimeslots",{ params: {
          Milestone:e.target.textContent,
          Projectname:this.state.Projectname
        }
})
        
        .then(res=>{
         this.setState({timeslots:res.data})
         console.log(res.data)
        })
        .catch(err=>{

        })


    }

    deleteTimelost=()=>{
      var dl={
      Milestone:this.state.presentation,
      Projectname:this.state.Projectname
      }
      axios.delete("http://localhost:4000/api/deletetimeslot",{data:dl}).then(res=>{
        swal(
          'Updated!',
          '',
          'success'
        )
        axios.get("http://localhost:4000/api/gettimeslots",{ params: {
        Milestone:this.state.presentation,
        Projectname:this.state.Projectname
      }
})
      
      .then(res=>{
       this.setState({timeslots:res.data})
       console.log(res.data)
      })
      .catch(err=>{

      })
      })
      .catch(err=>{
        swal ( "Oops" ,  "Something went wrong!!!" ,  "error" )

      })
    }




    componentDidMount(){
        this.props.getprojectnames()
        
      }
componentWillMount(){

}
serchProject(e){
this.setState({filtervalue:e.target.value})
var Projects=[]
this.state.Projects.map(projects=>{
    var name =projects.Projectname
    if(name.includes(e.target.value)){
        Projects.push(projects)
    }

})
this.setState({projects:Projects})
}
handleClickOpen = (project) => {
    this.setState({ open: true });
 
    console.log(project)
  };
  handleClickOpen1 = (project) => {
    this.setState({ open1: true });
 
  };
  
  handleClose = () => {
    this.setState({ open: false });
  };

  replacevaluvator=()=>{
    var newset=[]
    this.state.timeslots.Timeslosts.map(timeslot=>{
      if(timeslot.evaluvators.includes(this.state.selectedEvaluvator)){
        var arr =timeslot.evaluvators
        var index =arr.indexOf(this.state.selectedEvaluvator)
        if (index !== -1) {
          arr[index] = this.state.replacevaluvator
      }
     var ts= {
       groupno:timeslot.groupno,
        starttime:timeslot.starttime,
        endtime:timeslot.endtime,
        evaluvators:arr,
        venue:timeslot.venue
      }
      newset.push(ts)

      }
      else{
        newset.push(timeslot)
      }
    })
    const value = {
      Projectname:this.state.Projectname,
      Timeslots:newset,
      Milestone:this.state.presentation
    }
    console.log(newset)

    axios.put("http://localhost:4000/api/updatetimeslot",value)
    .then(res=>{
      swal(
        'Updated!',
        '',
        'success'
      )
      axios.get("http://localhost:4000/api/gettimeslots",{ params: {
        Milestone:this.state.presentation,
        Projectname:this.state.Projectname
      }
})
      
      .then(res=>{
       this.setState({timeslots:res.data})
       console.log(res.data)
      })
      .catch(err=>{

      })
    })
    .catch(err=>{
      swal ( "Oops" ,  "Something went wrong!!!" ,  "error" )

    })
    
  }
  handleClose1 = () => {
    this.setState({ open1: false });
  };
  handleChange(e,data){
    
    let value = data.value

    this.setState({
      Projectname: value,
    })
    this.props.getpresentations(value)
  }
  onchange1(e,data){
    var namee =data.name
    var value =data.value


    this.setState({[namee] :value})
    
  }
  onchange(e){
    var namee =e.target.name
    var value =e.target.value


    this.setState(prevState => ({
        updateProject: {
          ...prevState.updateProject,
          [namee]:value
      }
  }))
  
    
  }


componentWillReceiveProps(nextprops){
  this.setState({projects:nextprops.project.projects,Projects:nextprops.project.projects})
  this.setState({ presentations: nextprops.presentations.presentation })
}

render(){
  var rows =[]
  var notice =""
 if(this.state.timeslots){
  this.state.timeslots.Timeslosts.map(timeslot=>{
   if(timeslot.groupno>0){
var row={
  groupno:Number(timeslot.groupno),
  starttime:timeslot.starttime,
  endtime:timeslot.endtime,
  evaluvators:timeslot.evaluvators.map(ee=>
    ee+"   "
  ),
  venue:timeslot.venue
}
rows.push(row)
   }


  })


  var data = {
    columns: [
      {
        label: 'Group no',
        field: 'groupno',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Start Time',
        field: 'starttime',
        sort: 'asc',
        width: 270
      },
      {
        label: 'End Time',
        field: 'endtime',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Evaluvators',
        field: 'evaluvators'
      },
      {
        label: 'Venue',
        field: 'venue',
        sort: 'asc',
        width: 150
      }
     
    ],
    rows: rows
  }




 
  var arr=[]
  

   
      var selectEvaluvators=[]
      this.state.timeslots.Evaluvatorlist.map(eva=>{
        var lis={
          id:eva.name,
          text:eva.name,
          value:eva.name
        }
        arr.push(eva.name)
        selectEvaluvators.push(lis)
      })
      var changewithEvaluvators=[]
      
      this.state.timeslots.Timeslosts.map(eva=>{
        if(eva.evaluvators.includes(this.state.selectedEvaluvator)){
          eva.evaluvators.forEach(element => {
          arr.forEach(ele => {
            if(ele==element){
              var index= arr.indexOf(element)
            if (index !== -1) arr.splice(index, 1);
            console.log(arr)
            }
            
          });
            
          });
        } 
      
        })
        arr.map(eva=>{
          var lis={
            id:eva,
            text:eva,
            value:eva
          }
          changewithEvaluvators.push(lis)
        })
      }
      else{
        notice= <div><Card fluid color='red' header='you havent create time slot click here to create timeslot' /><Button secondary onClick={this.updateGroup}><Link to="/pg/timeslot"> create</Link></Button>
</div>
      
      }
      

        var stateOptions3=[]
        this.props.project.project.map(project=>{
          
          var val={
            id:project._id,
            text:project.Projectname,
            value:project.Projectname
          }
          stateOptions3.push(val)
        })
        if (this.state.presentations.length > 0) {
          var  presentation = this.state.presentations.map(presentation =>
                  ({
                      key: presentation.name,
                      text: presentation.name,
                      value: presentation.name
  
                  }
  
                  )
  
              )
          }
     
      
  return (
      <div>
        <div>
 <Dropdown placeholder='Select Project to Update Milestone'  selection options={stateOptions3}  value={this.state.id} onChange={this.handleChange}/>
 </div>
 
 Select the Presentation
            <div>
                    <Dropdown placeholder='State' search selection options={presentation} onChange={this.onchangeDropdown1}/>
                </div>
         
           <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth={true}
          maxWidth="sm"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        ><DialogTitle id="alert-dialog-title">{"Change Evaluvator"}</DialogTitle>
        <DialogContent>
     Still not developed    
         {/* <Form>
    <Form.Field>
      <label>Select the Evaluvator</label>
      <Dropdown placeholder='Choose Evaluvator to Change'  selection options={selectEvaluvators} value={this.state.selectedEvaluvator} name ="selectedEvaluvator"onChange={this.onchange1}/>
    </Form.Field>
    <Form.Field>
      <label>Select evaluvator for change with</label>
      <Dropdown placeholder='Choose Evaluvator to Exchange'  selection options={changewithEvaluvators} value={this.state.changewith} name ="changewith"onChange={this.onchange1}/>
    </Form.Field>
  </Form> */}
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cansel
          </Button>
          <Button  color="primary" autoFocus>
            Save
          </Button>
        </DialogActions> */}
      </Dialog>

      <Dialog
          open={this.state.open1}
          onClose={this.handleClose1}
          fullWidth={true}
          maxWidth="sm"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        ><DialogTitle id="alert-dialog-title">{"Change Evaluvator"}</DialogTitle>
        <DialogContent>
         
         <Form>
    
    <Form.Field>
      <label>Select the Evaluvator</label>
      <Dropdown placeholder='Choose Evaluvator to Change'  selection options={selectEvaluvators} value={this.state.selectedEvaluvator} name ="selectedEvaluvator"onChange={this.onchange1}/>
    </Form.Field>
    <Form.Field>
      <label>Enter evaluvator for change with</label>
      <Input placeholder='Enter Evaluvator to Exchange'   value={this.state.replacevaluvator} name ="replacevaluvator" onChange={this.onchange1}/>
    </Form.Field>
  </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose1} color="primary">
            Cansel
          </Button>
          <Button onClick={this.replacevaluvator} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Button secondary hidden={!(rows.length>0)}  onClick={()=>this.handleClickOpen()} >Change Evaluvators</Button>
       <Button secondary hidden={!(rows.length>0)} onClick={()=>this.handleClickOpen1()}>Replace Evaluvator</Button>
       <Button secondary hidden={!(rows.length>0)} onClick={this.deleteTimelost}>Detele All Timeslot and Create Again</Button>
<h2>{notice}</h2>
  <div hidden={!(rows.length>0)}>
    <MDBDataTable striped 
      bordered
      hover
      data={data}></MDBDataTable>
      </div>
      {/* <div hidden={!(!(rows.length>0) && (this.state.presentation.length>0))}>
    you havent create any timeslots yet
      </div> */}
   
    </div>
  
  );
}
}

const mapStateToProps = state => {
    return{
  
    project: state.project, 
    presentations: state.milestone
  }};

export default connect(mapStateToProps,{getprojectnames,getpresentations})(Updatetimeslots);




