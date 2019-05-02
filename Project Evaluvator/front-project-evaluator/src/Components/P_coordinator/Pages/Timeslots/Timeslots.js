
import React from 'react'
import { getprojectnames, getproject } from '../../../../actions/ProjectActions'
import { getpresentations } from '../../../../actions/milestoneActions'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import { Form, Input, Button ,Table,Popup,Checkbox,List} from 'semantic-ui-react'
import {
    DateInput,
    TimeInput,
    DateTimeInput,
    DatesRangeInput
} from 'semantic-ui-calendar-react';

import moment from 'moment'
var Evaluators=[]
var checkedevaluvators=[]
var selectedEvaluvators=[]

class Timeslot extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            presentations: [],
            date: '',
            endtime: '',
            starttime: '',
            dateTime: '',
            datesRange: '',
            timeslots:[],
            timeslotlength: null,
            intervallength: null,
            numberofgroups: null,
            numberofplaces: null,
            venue :"",
            evaluvators:"",
            disabled:false,
            evaluvateCount:null,
            checked:false,
            Evaluators:[],
            SelectedEvaluvators:[]
        }
        this.props.getprojectnames()
        this.onchangeDropdown = this.onchangeDropdown.bind(this)
        this.change=this.change.bind(this)
    }
   
    validateEvaluvators=()=>{
        alert("dfd")
    }


    generateTimeslots = () => {
        const arrvenue= this.state.venue.split(',')
       this.state.evaluvators.split(',').forEach(evaluvaters=>
       {
           var evaluvator ={
            name :evaluvaters,
            checked:false
           }
           Evaluators.push(evaluvator)
       })

       this.setState({Evaluators:Evaluators})
       console.log(Evaluators)
        var timeslots = []

        console.log(this.state)
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
        console.log(getintervalstart)
        console.log(start)
        console.log(withouttime)
        //generate while interval start
        var num = 0

        while (num < this.state.numberofgroups) {

            var i = 0;
            if (getintervalstart > start) {
                for (i; i < arrvenue.length; i++) {
                    if (getintervalstart > start && num < this.state.numberofgroups) {

                        var slot = {
                            start: moment(start).format("DD-MM-YYYY HH:mm"),
                            end: moment(start + timeslot).format("DD-MM-YYYY HH:mm"),
                            venue:arrvenue[i],
                            evaluvators:[]
                        }

                        timeslots.push(slot)
                        num++
                        console.log(num)
                    }

                }
                start = start + timeslot
                console.log(moment(getintervalstart).format("DD-MM-YYYY HH:mm"))
                console.log(moment(start).format("DD-MM-YYYY HH:mm"))
                console.log("inmorning")
            }

            else if (start < getintervalend) {
                var rest = {
                    interval: moment(start + interval).format("DD-MM-YYYY HH:mm")
                }
                timeslots.push(rest)
                start = getintervalend
                console.log("in creak")
            }
            else if (start < getdayend) {
                for (i; i < arrvenue.length; i++) {
                    if (start < getdayend && num < this.state.numberofgroups) {

                        var slot = {
                            start: moment(start).format("DD-MM-YYYY HH:mm"),
                            end: moment(start + timeslot).format("DD-MM-YYYY HH:mm"),
                            venue:arrvenue[i],
                            evaluvators:[]

                        }

                        timeslots.push(slot)
                        num++
                        console.log(num)
                    }


                }
                start = start + timeslot
                console.log(timeslots)
                console.log("inafternoon")

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

        this.setState({timeslots:timeslots})


    }
    onchangeDropdown(e) {
        this.setState({ projectName: e.target.textContent })
        this.props.getproject(e.target.textContent)
        this.props.getpresentations(e.target.textContent)
    }

    componentDidMount() {
        this.setState({ projects: this.props.projects })

    }
    componentWillReceiveProps(nextprops) {
        console.log(nextprops)
        this.setState({ presentations: nextprops.presentations.presentation })
        console.log(nextprops.presentations.presentation)
    }

    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
       


    }
    countevaluvators=(e,{value,name,checked,disabled})=>{
        
        console.log(value)
        var alreadyin =false
        
        
        checkedevaluvators.forEach(element => {
            console.log(element==value)
            if(element==value){
                alreadyin=true
            }  
        });
        if(alreadyin){
            var index = checkedevaluvators.indexOf(value);
 
            if (index > -1) {
                checkedevaluvators.splice(index, 1);
            }
        }
        else{
            if(checkedevaluvators.length>=this.state.evaluvateCount){
                this.setState({disabled:true})
            }
            else{
            checkedevaluvators.push(value)
            }
        }
        
    
        console.log(checked)
    }

    change=(e,{value,name,checked,disabled})=>{
        var i=0
        var index =[]
        
    this.state.Evaluators.map(eva=>{
        

        if(value==eva.name){
            var newele ={
                name:value,
                checked:!eva.checked

            }
            index.push(newele)
            
        }else{
            index.push(eva)
        }

    })
    this.setState({Evaluators:index})

    if(checked){
        selectedEvaluvators.push(value)
    }
    else{
        var index = selectedEvaluvators.indexOf(value);
 
            if (index > -1) {
                selectedEvaluvators.splice(index, 1);
            }

    }
    this.setState({SelectedEvaluvators:selectedEvaluvators})


        


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
        var presentation
        if (this.state.presentations.length > 0) {
            presentation = this.state.presentations.map(presentation =>
                ({
                    key: i++,
                    text: presentation.name,
                    value: presentation.name

                }

                )

            )
        }
        var i=0
        console.log(this.state)
        return (
            
            <div>
                Select the project
                <div>
                    <Dropdown placeholder='State' search selection options={Projectnames} onChange={this.onchangeDropdown} />
                </div>
                Select the Presentation
            <div>
                    <Dropdown placeholder='State' search selection options={presentation} />
                    {console.log(this.state.projects)}
                </div>
                select the start day

                <DateInput

                    name="dateTime"
                    placeholder="Date Time"
                    value={this.state.dateTime}
                    iconPosition="left"
                    onChange={this.handleChange}
                />
                <div>
                    Enter the start of time in day
        <TimeInput
                        name="starttime"
                        placeholder="Time"
                        value={this.state.starttime}
                        iconPosition="left"
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    Enter the end of time in day
        <TimeInput
                        name="endtime"
                        placeholder="Time"
                        value={this.state.endtime}
                        iconPosition="left"
                        onChange={this.handleChange}
                    />
                </div>

                <div>

                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field control={Input} onChange={this.handleChange} name="timeslotlength" value={this.state.timeslotlength} label='enter the time slot length(minuths)' placeholder='Time slot length' />
                            <Form.Field control={Input} onChange={this.handleChange} name="intervallength" value={this.state.intervallength} label='enter the interval length(minuths)' placeholder='Interval length' />

                            <Form.Field control={Input} onChange={this.handleChange} name="numberofgroups" value={this.state.numberofgroups} label='Number of Groups' placeholder='Number of groups' />
                            <Form.Field control={Input} onChange={this.handleChange} name="venue" value={this.state.venue} label='Enter the Places' placeholder='Enter places seperated by comma' />
                            <Form.Field control={Input} onChange={this.handleChange} name="evaluvateCount" value={this.state.evaluvateCount} label='Enter the evaluvater Count for one presentation' placeholder='Enter the evaluvater Count for one presentation' />

                        </Form.Group>
                        <Form.Field control={Input} onChange={this.handleChange} name="evaluvators" value={this.state.evaluvators} label='Enter the Evaluvators' placeholder='Enter the Evaluvators seperated by comma' />
                    </Form>



                </div>


                Generate Time slots for Groups
<Button secondary onClick={this.generateTimeslots}>Generate Time Slots</Button>

<div>


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
                            {timeslots.evaluvators.length>0 ?
                            <Table.Cell>{timeslots.evaluvators.toString()}</Table.Cell>
                                :
                            <Table.Cell><Popup
                            trigger={<Button icon='add' />}
                            content={
                                <List>
                            {this.state.Evaluators.map(evaluvator=>
                                
                                <List.Item><Checkbox checked={evaluvator.checked} value={evaluvator.name} onChange={this.change} disabled={this.state.SelectedEvaluvators.length>=this.state.evaluvateCount && !evaluvator.checked}></Checkbox>{evaluvator.name}</List.Item>
                                                             
                            )}
                            <Button onClick={this.validateEvaluvators}> Submit</Button>
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
                            
</div>

            </div>

        );
    }

}
const mapStateToProps = state => {
    console.log(state)
    return {
        projects: state.project,
        presentations: state.milestone

    }
}

export default connect(mapStateToProps, { getprojectnames, getproject, getpresentations })(Timeslot);