
import React from 'react'
import { getprojectnames, getproject } from '../../../../actions/ProjectActions'
import { getpresentations } from '../../../../actions/milestoneActions'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import { Form, Input, Button, Table, Popup, Checkbox, List,Card } from 'semantic-ui-react'
import {
    DateInput,
    TimeInput,
    
} from 'semantic-ui-calendar-react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './Timeslots.css'
import axios from 'axios'
import moment from 'moment'
import swal from 'sweetalert'
import {Link} from 'react-router-dom'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

var Evaluators = []
var checkedevaluvators = []
var selectedEvaluvators = []
var submitted = []
var cardStyle={
    backgroundColor: "#DFDFDF",
    size: 'sm'
  }
 

class Timeslot extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            presentations: [],
            presentation:'',
            Projectname:'',
            date: '',
            endtime: '',
            starttime: '',
            dateTime: '',
            datesRange: '',
            timeslots: [],
            timeslotlength: null,
            already:false,
            intervallength: null,
            numberofgroups: 0,
            numberofplaces: null,
            venue: "",
            evaluvators: "",
            disabled: false,
            evaluvateCount: null,
            checked: false,
            Evaluators: [],
            SelectedEvaluvators: [],
            alreadycreated:false,
            open:false,
            Days:[]
           


        }

        this.props.getprojectnames()
        this.onchangeDropdown = this.onchangeDropdown.bind(this)
        this.change = this.change.bind(this)
        this.onchangeDropdown1=this.onchangeDropdown1.bind(this)
    }


   

   


    submitEvaluvators = (time, venue) => {
        var arr = []
        this.state.timeslots.map(st => {
            if (st.start == time && st.venue == venue) {
                var slot = {
                    groupno:st.groupno,
                    starttime: st.starttime,
                    start: st.start,
                    end: st.end,
                    endtime: st.endtime,
                    venue: st.venue,
                    evaluvators: selectedEvaluvators
                }
                arr.push(slot)
                submitted.push(slot)
            }
            else {
                arr.push(st)
            }
        })
        this.setState({ timeslots: arr })
        selectedEvaluvators = []
        var biginnig = []
        this.state.Evaluators.map(ss => {
            var ww = {
                name: ss.name,
                checked: false,
                already: false
            }
            biginnig.push(ww)
        })
        this.setState({ Evaluators: biginnig })
        this.setState({ SelectedEvaluvators: [] })

    }





generateTimeslots1=(e)=>{
    e.preventDefault();
    submitted=[]
    Evaluators=[]
    var uniq =[...new Set(this.state.evaluvators.split(','))] 
    uniq.forEach(evaluvaters => {
        var evaluvator = {
            name: evaluvaters,
            checked: false,
            already: false
        }
        Evaluators.push(evaluvator)
    })
    this.setState({ Evaluators: Evaluators })

    var timeslots=[]
    var num = 0
    const timeslot = this.state.timeslotlength * 60000

    this.state.Days.forEach(element => {
        var getyear = moment(element.date, "DD-MM-YYYY").year()
        var getmonth = moment(element.date, "DD-MM-YYYY").month() + 1
        var date = moment(element.date, "DD-MM-YYYY").date()
        var withouttime = `${getyear}-${getmonth}-${date}`
        var start = moment(withouttime + " " + element.starttime, "YYYY-MM-DD HH:mm").toDate().getTime()
        var getdayend = moment(withouttime + " " + element.endtime, "YYYY-MM-DD HH:mm").toDate().getTime()
        const arrvenue =[...new Set(element.locations.split(','))] 

console.log(start)
if (num < this.state.numberofgroups) {
while(start<getdayend){
var i=0
    for (i; i < arrvenue.length; i++) {
        if (num < this.state.numberofgroups && start<getdayend) {

            var slot = {
                groupno:num+1,
                start: moment(start).format("DD-MM-YYYY HH:mm"),
                starttime: moment(start).format("DD-MM-YYYY HH:mm").toString(),
                end: moment(start + timeslot).format("DD-MM-YYYY HH:mm"),
                endtime:moment(start + timeslot).format("DD-MM-YYYY HH:mm").toString(),
                venue: arrvenue[i],
                evaluvators: []
            }
console.log(i)
            timeslots.push(slot)
            num++

        }


    }
    start=start+timeslot
}
}
    });

console.log(timeslots)
this.setState({ timeslots: timeslots })

}

















    generateTimeslots = (e) => {
        e.preventDefault();
        submitted=[]
        Evaluators=[]
        const arrvenue =[new Set(this.state.venue.split(','))] 
        var uniq =[...new Set(this.state.evaluvators.split(','))] 

        uniq.forEach(evaluvaters => {
            var evaluvator = {
                name: evaluvaters,
                checked: false,
                already: false
            }
            Evaluators.push(evaluvator)
        })

        this.setState({ Evaluators: Evaluators })
        var timeslots = []

        const timeslot = this.state.timeslotlength * 60000
        const interval = this.state.intervallength * 60000




        var getyear = moment(this.state.dateTime, "DD-MM-YYYY").year()
        var getmonth = moment(this.state.dateTime, "DD-MM-YYYY").month() + 1
        var date = moment(this.state.dateTime, "DD-MM-YYYY").date()
        var withouttime = `${getyear}-${getmonth}-${date}`
        var start = moment(withouttime + " " + this.state.starttime, "YYYY-MM-DD HH:mm").toDate().getTime()
        var getintervalstart = moment(withouttime + " 12:00", "YYYY-MM-DD HH:mm").toDate().getTime()
        var getintervalend = moment(withouttime + " 13:00", "YYYY-MM-DD HH:mm").toDate().getTime()
        var getdayend = moment(withouttime + " " + this.state.endtime, "YYYY-MM-DD HH:mm").toDate().getTime()

        // while()

        //generate while interval start
        var num = 0

        while (num < this.state.numberofgroups) {

            var i = 0;
            if (getintervalstart > start) {
                for (i; i < arrvenue.length; i++) {
                    if (getintervalstart > start && num < this.state.numberofgroups) {

                        var slot = {
                            groupno:num+1,
                            start: moment(start).format("DD-MM-YYYY HH:mm"),
                            starttime: moment(start).format("DD-MM-YYYY HH:mm").toString(),
                            end: moment(start + timeslot).format("DD-MM-YYYY HH:mm"),
                            endtime:moment(start + timeslot).format("DD-MM-YYYY HH:mm").toString(),
                            venue: arrvenue[i],
                            evaluvators: []
                        }

                        timeslots.push(slot)
                        num++

                    }

                }
                start = start + timeslot

            }

            else if (start < getintervalend) {
                var rest = {
                    interval:moment(start + interval).format("DD-MM-YYYY HH:mm").toString()
                }
                timeslots.push(rest)
                start = getintervalend

            }
            else if (start < getdayend) {
                for (i; i < arrvenue.length; i++) {
                    if (start < getdayend && num < this.state.numberofgroups) {

                        var slot = {
                            groupno:num+1,
                            start: moment(start).format("DD-MM-YYYY HH:mm"),
                            starttime: moment(start).format("DD-MM-YYYY HH:mm").toString(),
                            end: moment(start + timeslot).format("DD-MM-YYYY HH:mm"),
                            endtime:moment(start + timeslot).format("DD-MM-YYYY HH:mm").toString(),
                            venue: arrvenue[i],
                            evaluvators: []

                        }

                        timeslots.push(slot)
                        num++
                    }


                }
                start = start + timeslot


            }
            else {
                date++;
                withouttime = `${getyear}-${getmonth}-${date}`
                start = moment(withouttime + " " + this.state.starttime, "YYYY-MM-DD HH:mm").toDate().getTime()
                getintervalstart = moment(withouttime + " 12:00", "YYYY-MM-DD HH:mm").toDate().getTime()
                getintervalend = moment(withouttime + " 13:00", "YYYY-MM-DD HH:mm").toDate().getTime()
                getdayend = moment(withouttime + " " + this.state.endtime, "YYYY-MM-DD HH:mm").toDate().getTime()



            }




        }

        this.setState({ timeslots: timeslots })

        console.log(timeslots)
    }
    onchangeDropdown(e) {
        this.setState({ Projectname: e.target.textContent })
        this.props.getproject(e.target.textContent)
        this.props.getpresentations(e.target.textContent)
    }
    onchangeDropdown1(e){
       
        this.setState({presentation:e.target.textContent})
        axios.get("http://localhost:4000/api/gettimeslots",{ params: {
          Milestone:e.target.textContent,
          Projectname:this.state.Projectname
        }
})
        
        .then(res=>{
            if(res.data.Timeslosts.length>0){
         this.setState({alreadycreated:true})
         swal({
            title: "You have already created timeslots!",
            
            icon: "info",
            dangerMode:true
          });
            }
         
        })
        .catch(err=>{

        })

    }

    componentDidMount() {
        this.setState({ projects: this.props.projects })

    }
    componentWillReceiveProps(nextprops) {
        if(nextprops.projects.Currentproject.length>0 && this.state.Projectname.length>0){
        this.setState({numberofgroups:nextprops.projects.Currentproject[0].groups.length})
        }
       
        this.setState({ presentations: nextprops.presentations.presentation })
    }

    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
        if(this.state.numberofgroups==0){
            alert("You havent create groups for this project")

        }

    }

    addDay=(e)=>{
        e.preventDefault();

        var day ={
            date:this.state.dateTime,
            starttime:this.state.starttime,
            endtime:this.state.endtime,
            locations:this.state.venue
        }
        this.setState(prevstate=>({Days:[...prevstate.Days,day]}))
    }

    
    verify(start, venue) {

        var newarr = []
        var found = false

        this.state.Evaluators.map(e => {
            submitted.map(s => {
                if ((s.start == start) && !(s.venue == venue)) {

                    s.evaluvators.forEach(element => {
                        if (element == e.name) {
                            var newslor = {
                                name: element,
                                checked: e.checked,
                                already: true
                            }
                            newarr.push(newslor)
                            found = true
                            alert("hari")

                        }
                        else {

                        }
                    });
                }
            })
            if (!found) {
                newarr.push(e)
            }
            found = false
        })




    }
    onclick = (start, venue) => {
        var i = 0
        var index = []



        var newarr = []
        var found = false

        this.state.Evaluators.map(e => {
            submitted.map(s => {
                if ((s.start == start) && !(s.venue == venue)) {

                    s.evaluvators.forEach(element => {
                        if (element == e.name) {
                            var newslor = {
                                name: element,
                                checked: e.checked,
                                already: true
                            }
                            newarr.push(newslor)
                            found = true


                        }
                        else {

                        }
                    });
                }
            })
            if (!found) {
                newarr.push(e)
            }
            found = false
        })


        this.setState({ Evaluators: newarr })
    }

    remove=(name)=>{
        var arr = [...this.state.Days]

        arr.map(ar=>{
            if(ar.date == name){
                var index = arr.indexOf(ar)
                arr.splice(index,1)
            }
        })
        this.setState({Days:arr})
    }





    change = (e, { value, checked, start, venue }) => {


        var i = 0
        var index = []
        var newarr = []
        var found = false

        this.state.Evaluators.map(e => {
            submitted.map(s => {
                if ((s.start == start) && !(s.venue == venue)) {

                    s.evaluvators.forEach(element => {
                        if (element == e.name) {
                            var newslor = {
                                name: element,
                                checked: e.checked,
                                already: true
                            }
                            newarr.push(newslor)
                            found = true


                        }
                        else {

                        }
                    });
                }
            })
            if (!found) {
                newarr.push(e)
            }
            found = false
        })





        newarr.map(eva => {


            if (value == eva.name) {

                var newele = {
                    name: value,
                    checked: !eva.checked,
                    already: eva.already

                }
                index.push(newele)

            } else {
                index.push(eva)
            }

        })
        this.setState({ Evaluators: index })

        if (checked) {
            selectedEvaluvators.push(value)
        }
        else {
            var index = selectedEvaluvators.indexOf(value);

            if (index > -1) {
                selectedEvaluvators.splice(index, 1);
            }

        }
        this.setState({ SelectedEvaluvators: selectedEvaluvators })





    }
    handleClose = (e) => {
        e.preventDefault();

        this.setState({ open: false });
      };
      handleOpen = () => {
        this.setState({ open: true });
      };
    submittodb=()=>{
        const post ={
            Projectname:this.state.Projectname,
            Milestone:this.state.presentation,
            Timeslots:this.state.timeslots,
            evaluvatorsList:this.state.Evaluators
        }
        console.log(post)
        axios.post('http://localhost:4000/api/posttimeslots',post)
        .then(res=>{
            swal(
                'Uploded Success fully!',
                '',
                'success'
              )

        })
        .catch({

        })
    }

    render() {
    

        const Projectnames = this.props.projects.project.map(project =>
            ({
                key: project._id,
                text: project.Projectname,
                value: project.Projectname

            })
        )
        var i = 1
        
        if (this.state.presentations.length > 0) {
        var  presentation = this.state.presentations.map(presentation =>
                ({
                    key: i++,
                    text: presentation.name,
                    value: presentation.name

                }

                )

            )
        }
        var i = 0
        return (

            <div className="container" >
                     <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth={true}
          maxWidth="sm"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        ><DialogTitle id="alert-dialog-title">{"Add a day"}</DialogTitle>
                 <Form onSubmit={this.addDay}>

        <DialogContent>
         
         <Form.Field >
                   <label>Select the start day</label> 
                <DateInput required

                    name="dateTime"
                    placeholder="Date Time"
                    value={this.state.dateTime}
                    iconPosition="left"
                    onChange={this.handleChange}
                />
                </Form.Field>
                <Form.Field >
                <div>
                    Enter the start of time in day
                     <TimeInput required
                        name="starttime"
                        placeholder="Time"
                        value={this.state.starttime}
                        iconPosition="left"
                        onChange={this.handleChange}
                    />
                </div>
                </Form.Field>
                <Form.Field>
                <div>
                    Enter the end of time in day
        <TimeInput required
                        name="endtime"
                        placeholder="Time"
                        value={this.state.endtime}
                        iconPosition="left"
                        onChange={this.handleChange}
                    />
                </div>
                </Form.Field>
                <Form.Field required control={Input} onChange={this.handleChange} name="venue" value={this.state.venue} label='Enter the Locations' placeholder='Enter places seperated by comma' />

        </DialogContent>
        <DialogActions>
          <Button type="cansel" onClick={this.handleClose} color="primary">
            Cansel
          </Button>
          <Button type ='submit' color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
        </Form>

      </Dialog>
      <Form onSubmit={this.generateTimeslots1}>

                 <div class="col-md-12" style={{marginBottom:'50px',marginTop:'50px'}}>
                    <div class="card" style={cardStyle}>
                        <div class="card-header card-header-danger">
                            
                        </div>
                <h3 style={{backgroundColor:'#F9A602',color:'black',padding:'12px',borderRadius:'5px',marginBottom:'30px'}} >Set Time Slots for Presentation</h3>

                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-2 text-left" >Select the project</div>
                    <div className="col-md-4">
                    
                        <Dropdown required placeholder='State' search selection options={Projectnames} onChange={this.onchangeDropdown} />
                    </div>
                    <div className="col-md-4"></div>
                </div>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-2 text-left" >Select the Presentation</div>
                    <div className="col-md-4">
                        <Dropdown required placeholder='State' search selection options={presentation} onChange={this.onchangeDropdown1}/>

                    </div>
                    <div className="col-md-4"></div>
               
                    
                </div>
                
               
                

               
                   
                    <Form.Group widths='equal'>        
                    
                
              
                </Form.Group>

                        <Form.Group widths='equal' required>
                            <Form.Field required control={Input} onChange={this.handleChange} name="timeslotlength" value={this.state.timeslotlength} label='Enter the Time Slot Length(minuths)' placeholder='Time slot length' />
                            <Form.Field  control={Input} onChange={this.handleChange} name="numberofgroups" value={this.state.numberofgroups} label='Number of Groups' placeholder='Number of groups' />
                            <Form.Field required control={Input} onChange={this.handleChange} name="evaluvateCount" value={this.state.evaluvateCount} label='Maximum evaluvators count' placeholder='Maximum evaluvators count for presentation' />
                            </Form.Group>
                            <Form.Group widths='equal'>

                        <Form.Field required control={Input} onChange={this.handleChange} name="evaluvators" value={this.state.evaluvators} label='Enter the Evaluvators' placeholder='Enter the Evaluvators seperated by comma' />
                        </Form.Group>

                    </div>



                </div>
                <div class="col-md-12" style={{marginBottom:'50px',marginTop:'50px'}}>
                    <div class="card" style={cardStyle}>
                    <h3 style={{backgroundColor:'#F9A602',color:'black',padding:'12px',borderRadius:'5px',marginBottom:'30px'}} >Add presentation Days</h3>
                   <div>
                    <Button primary onClick={this.handleOpen} >Add a Day</Button>
                    </div>
                    <MDBTable hidden={!this.state.Days.length>0}>
      <MDBTableHead color="primary-color" textWhite>
        <tr>
          <th>#</th>
          <th>Day</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Locations</th>
          <th>remove</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
          {this.state.Days.map(day=>
<tr>
    <td></td>
    <td>{day.date}</td>
    <td>{day.starttime}</td>
    <td>{day.endtime}</td>
    <td>{day.locations}</td>
    <td><Button secondary onClick={()=>this.remove(day.date)}>remove</Button></td>
</tr>
          )}
       
      </MDBTableBody>
    </MDBTable>
    

                    </div>
                    </div>
                    <div>
    <Button secondary type="submit" >Generate Time Slots</Button>
    </div>
    </Form>
                {(this.state.timeslots.length>0) && (!this.state.alreadycreated) ?


                <div class="tableclass">

                    <Table striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Group No</Table.HeaderCell>
                                <Table.HeaderCell>Timeslot</Table.HeaderCell>
                                <Table.HeaderCell>Venue</Table.HeaderCell>
                                <Table.HeaderCell>Evaluators</Table.HeaderCell>

                            </Table.Row>
                            {console.log(this.state)}
                        </Table.Header>


                        <Table.Body>

                            {this.state.timeslots.map(timeslots =>

                                !timeslots.interval ?
                                    <Table.Row verticalAlign='top'>
                                        <Table.Cell>{i++}</Table.Cell>
                                        <Table.Cell>
                                            <div>
                                                Start time :{timeslots.start}
                                            </div>
                                            <div>
                                                End time :{timeslots.end}
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>{timeslots.venue}</Table.Cell>
                                        {timeslots.evaluvators.length > 0 ?
                                            <Table.Cell>{timeslots.evaluvators.toString()}</Table.Cell>
                                            :
                                            <Table.Cell><Popup
                                                trigger={<Button onClick={() => this.onclick(timeslots.start, timeslots.venue)} icon='add' />}
                                                content={
                                                    <List>
                                                        {this.state.Evaluators.map(evaluvator =>

                                                            <List.Item><Checkbox checked={evaluvator.checked} value={evaluvator.name} start={timeslots.start} venue={timeslots.venue} onChange={this.change} disabled={(this.state.SelectedEvaluvators.length >= this.state.evaluvateCount && !evaluvator.checked) || (evaluvator.already)}></Checkbox>{evaluvator.name}</List.Item>

                                                        )}
                                                        <Button onClick={() => this.submitEvaluvators(timeslots.start, timeslots.venue)}> Submit</Button>
                                                    </List>

                                                }
                                                on='click'
                                                hideOnScroll
                                            /></Table.Cell>
                                        }
                                    </Table.Row>
                                    :
                                    <Table.Row verticalAlign='top'>interval</Table.Row>



                            )}
                        </Table.Body>
                    </Table>
                    <Button secondary onClick={this.submittodb} > Submit to Database</Button>



                </div>
                
                : this.state.alreadycreated ? <div> 
                <Card fluid color='red' header='You have already created timeslots ...... click here for update groups' /><Button secondary onClick={this.updateGroup}><Link to="/pg/updatetimeslots"> Update</Link></Button></div> 
            
            :<div></div>
            }
                

            </div>

        );
    }

}
const mapStateToProps = state => {

    return {
        projects: state.project,
        presentations: state.milestone

    }
}

export default connect(mapStateToProps, { getprojectnames, getproject, getpresentations })(Timeslot);