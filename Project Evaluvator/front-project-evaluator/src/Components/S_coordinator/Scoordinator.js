import React ,{ Component }  from 'react';


import SessionListTable from './Component/SessionListTable';
import { MDBTable, MDBTableBody, MDBTableHead ,MDBDataTable,MDBFooter,MDBContainer} from 'mdbreact';

import {connect} from 'react-redux'
import {Input} from 'semantic-ui-react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Form,Dropdown} from 'semantic-ui-react'
import _ from 'lodash'
import axios from 'axios'
import swal from 'sweetalert';
import {getprojectnames} from '../../actions/ProjectActions'
import { getpresentations } from '../../actions/milestoneActions'
import {Link }from 'react-router-dom'
import Button from 'react-bootstrap/Button';

import { Card} from 'semantic-ui-react'


class Scoodinater extends Component{

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

          },
          black:true
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

    removeFormdata=(ee)=>{
        const obj ={
            Projectname: this.state.Projectname,
            Milestone:this.state.presentation,
            groupno:ee.groupno
        }
        axios.delete("http://localhost:4000/api/deleteformdata" ,{data:obj}).then(res=>{
            swal(
                'Sended Sucssefully!',
                '',
                'success'
              )
              this.setState({black: !this.state.black})
        })
    }
    
    sendshowFormdata=(ee)=>{
      const obj ={
          Projectname: this.state.Projectname,
          Milestone:this.state.presentation,
          Timeslost:ee
      }
      axios.post("http://localhost:4000/api/addformdata" ,obj).then(res=>{
          swal(
              'Sended Sucssefully!',
              '',
              'success'
            )
            this.setState({black: !this.state.black})
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

  swapEvaluvator=()=>{

    var newset=[]
    this.state.timeslots.Timeslosts.map(timeslot=>{
      if(timeslot.evaluvators.includes(this.state.selectedEvaluvator)){
        var arr =timeslot.evaluvators
        var index =arr.indexOf(this.state.selectedEvaluvator)
        if (index !== -1) {
          arr[index] = this.state.changewith
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
      else if(timeslot.evaluvators.includes(this.state.changewith)){
        
          var arr =timeslot.evaluvators
          var index =arr.indexOf(this.state.changewith)
          if (index !== -1) {
            arr[index] = this.state.selectedEvaluvator
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
  var btn_class = this.state.black ? "primary" : "danger";
  console.log(btn_class)

  var rows =[]
  var notice =""
 if(this.state.timeslots.Timeslosts){
  this.state.timeslots.Timeslosts.map(timeslot=>{
   
var row={
  groupno:Number(timeslot.groupno),
  starttime:timeslot.starttime,
  endtime:timeslot.endtime,
  evaluvators:timeslot.evaluvators.map(ee=>
    ee+"   "
  ),
  venue:timeslot.venue,
  SendForm:<Button variant={btn_class} onClick={()=>this.sendshowFormdata(timeslot)} >Send data</Button>,
  CloseForm:<Button variant={btn_class}  onClick={()=>this.removeFormdata(timeslot)}>Close Form</Button>

}
rows.push(row)
   
console.log(rows)

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
      },
      {
        label: 'Send Form',
        field: 'SendForm',
        width: 150
      },
      {
        label: 'Close Form',
        field: 'CloseForm',
        width: 150
      },
     
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
        <div className="container">
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6 pt-3">  
              <div class="card text-white bg-primary mb-3" style={{width:"35rem",fontSize:25}}>
                  <div class="card-header text-center p-3">Set Visibility of Evaluvater </div>
                  <div class="card-body">
                    <div className="row pt-3" style={{fontSize:15}}>
                      <div className="col-sm-3 pt-3 text-left">
                        Select Project
                      </div>
                      <div className="col-sm-9 text-left">
                        <Dropdown placeholder='Select Project to Update Milestone'  selection options={stateOptions3}  value={this.state.id} onChange={this.handleChange}/>
                      </div>
                    </div>
                    <div className="row pt-3" style={{fontSize:15}}>
                      <div className="col-sm-3 pt-1 text-left">
                        Select the Presentation
                      </div>
                      <div className="col-sm-9 text-left">
                        <Dropdown placeholder='State' search selection options={presentation} onChange={this.onchangeDropdown1}/>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        
         


   
      <div className="container">
       
<h2>{notice}</h2>
{console.log(rows)}
  <div hidden={!(rows.length>1)}>
    <div style={{border:'2px solid #AFB1B4', borderRadius:'5px', backgroundColor:'#CFD1D5', marginLeft: '75px', marginBottom:'50px'}}>
      <div className="p-3">
    <MDBDataTable striped 
      bordered
      hover
      data={data}></MDBDataTable>
      </div>
      </div>
      </div>
      {/* <div hidden={!(!(rows.length>0) && (this.state.presentation.length>0))}>
    you havent create any timeslots yet
      </div> */}

      
    </div>
  </div>
  );
}
}
const mapStateToProps = state => {
    return{
  
    project: state.project, 
    presentations: state.milestone
  }};


export default connect(mapStateToProps,{getprojectnames,getpresentations})(Scoodinater)











