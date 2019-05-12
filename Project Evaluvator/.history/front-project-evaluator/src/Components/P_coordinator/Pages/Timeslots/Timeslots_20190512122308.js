
import React from 'react'
import { getprojectnames, getproject } from '../../../../actions/ProjectActions'
import { getpresentations } from '../../../../actions/milestoneActions'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import { Form, Input, Button, Table, Popup, Checkbox, List } from 'semantic-ui-react'
import {
    DateInput,
    TimeInput,
    DateTimeInput,
    DatesRangeInput
} from 'semantic-ui-calendar-react';
import './Timeslots.css'
import axios from 'axios'
import moment from 'moment'
import swal from 'sweetalert'
var Evaluators = []
var checkedevaluvators = []
var selectedEvaluvators = []
var submitted = []
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
            intervallength: null,
            numberofgroups: null,
            numberofplaces: null,
            venue: "",
            evaluvators: "",
            disabled: false,
            evaluvateCount: null,
            checked: false,
            Evaluators: [],
            SelectedEvaluvators: [],

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
                    start: st.start,
                    end: st.end,
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


    generateTimeslots = () => {
        submitted=[]
        Evaluators=[]
        const arrvenue = this.state.venue.split(',')
        this.state.evaluvators.split(',').forEach(evaluvaters => {
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
                            start: moment(start).format("DD-MM-YYYY HH:mm"),
                            end: moment(start + timeslot).format("DD-MM-YYYY HH:mm"),
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
                    interval: moment(start + interval).format("DD-MM-YYYY HH:mm")
                }
                timeslots.push(rest)
                start = getintervalend

            }
            else if (start < getdayend) {
                for (i; i < arrvenue.length; i++) {
                    if (start < getdayend && num < this.state.numberofgroups) {

                        var slot = {
                            start: moment(start).format("DD-MM-YYYY HH:mm"),
                            end: moment(start + timeslot).format("DD-MM-YYYY HH:mm"),
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


    }
    onchangeDropdown(e) {
        this.setState({ Projectname: e.target.textContent })
        this.props.getproject(e.target.textContent)
        this.props.getpresentations(e.target.textContent)
    }
    onchangeDropdown1(e){
       
        this.setState({presentation:e.target.textContent})

    }

    componentDidMount() {
        this.setState({ projects: this.props.projects })

    }
    componentWillReceiveProps(nextprops) {
        this.setState({ presentations: nextprops.presentations.presentation })
    }

    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }



    }

    // verify(start,venue){
    //     var arr1=[]

    //    var changed =false
    //    console.log(start)
    //     this.state.Evaluators.map(ee=>{
    //     this.state.timeslots.map(timeslot=>{
    //         console.log(timeslot)
    //         if((timeslot.start ==start) && (!timeslot.venue==venue)){

    //             console.log(timeslot.evaluvators)
    //             timeslot.evaluvators.forEach(eee=>{
    //                 alert(eee)

    //             })
    //             timeslot.evaluvators.map(eva=>{
    //                 console.log(eva)
    //                 if(eva==ee.name){
    //                     var newslot={
    //                         name:eva,
    //                         checked:ee.checked,
    //                         already:true
    //                     }
    //                     arr1.push(newslot)
    //                     changed=true

    //                 }

    //             })
    //         }


    //     })
    //     if(changed==false){
    //         arr1.push(ee)
    //         changed=false
    //     }

    // })
    // console.log(arr1)
    // this.setState({Evaluators:arr1})
    // console.log(this.state)


    // }
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





        //  newarr.map(eva=>{


        // if(value==eva.name){

        //     var newele ={
        //         name:value,
        //         checked:!eva.checked,
        //         already:eva.already

        //     }
        //     index.push(newele)

        // }else{
        //     index.push(eva)
        // }

        // })
        this.setState({ Evaluators: newarr })
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

            <div>
                Select the projectt
                <div>
                    <Dropdown placeholder='State' search selection options={Projectnames} onChange={this.onchangeDropdown} />
                </div>
                Select the Presentation
            <div>
                    <Dropdown placeholder='State' search selection options={presentation} onChange={this.onchangeDropdown1}/>
                </div>
                

                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header card-header-danger">
                        <h4 class="card-title ">Fill the Form </h4>
                            
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

                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field control={Input} onChange={this.handleChange} name="timeslotlength" value={this.state.timeslotlength} label='enter the time slot length(minuths)' placeholder='Time slot length' />
                            <Form.Field control={Input} onChange={this.handleChange} name="intervallength" value={this.state.intervallength} label='enter the interval length(minuths)' placeholder='Interval length' />
                            <Form.Field control={Input} onChange={this.handleChange} name="numberofgroups" value={this.state.numberofgroups} label='Number of Groups' placeholder='Number of groups' />
                            <Form.Field control={Input} onChange={this.handleChange} name="evaluvateCount" value={this.state.evaluvateCount} label='Enter the evaluvater Count for one presentation' placeholder='Enter the evaluvater Count for one presentation' />
                            </Form.Group>
                            <Form.Group widths='equal'>

                            <Form.Field control={Input} onChange={this.handleChange} name="venue" value={this.state.venue} label='Enter the Places' placeholder='Enter places seperated by comma' />

                        <Form.Field control={Input} onChange={this.handleChange} name="evaluvators" value={this.state.evaluvators} label='Enter the Evaluvators' placeholder='Enter the Evaluvators seperated by comma' />
                        </Form.Group>
                        <Button secondary onClick={this.generateTimeslots}>Generate Time Slots</Button>

                    </Form>
                    </div>



                </div>


                

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
                    <Button onClick={this.submittodb} primary> Submit to Database</Button>


                </div>

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