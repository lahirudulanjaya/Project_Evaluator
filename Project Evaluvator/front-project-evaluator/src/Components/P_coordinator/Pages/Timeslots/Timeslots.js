
import React from 'react'
import { getprojectnames, getproject } from '../../../../actions/ProjectActions'
import { getpresentations } from '../../../../actions/milestoneActions'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import { Form, Input, Button ,Table} from 'semantic-ui-react'
import {
    DateInput,
    TimeInput,
    DateTimeInput,
    DatesRangeInput
} from 'semantic-ui-calendar-react';

import moment from 'moment'

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
            numberofplaces: null
        }
        this.props.getprojectnames()
        this.onchangeDropdown = this.onchangeDropdown.bind(this)
    }



    generateTimeslots = () => {
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
                for (i; i < this.state.numberofplaces; i++) {
                    if (getintervalstart > start && num < this.state.numberofgroups) {

                        var slot = {
                            start: moment(start).format("DD-MM-YYYY HH:mm"),
                            end: moment(start + timeslot).format("DD-MM-YYYY HH:mm")
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
                for (i; i < this.state.numberofplaces; i++) {
                    if (start < getdayend && num < this.state.numberofgroups) {

                        var slot = {
                            start: moment(start).format("DD-MM-YYYY HH:mm"),
                            end: moment(start + timeslot).format("DD-MM-YYYY HH:mm")
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
        const start = moment(value, "DD-MM-YYYY").year()
        console.log(start)


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
                Slect the project
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
                            <Form.Field control={Input} onChange={this.handleChange} name="numberofplaces" value={this.state.numberofplaces} label='Number of Places' placeholder='Number of places' />

                        </Form.Group>
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
                          <Table.HeaderCell>Evaluvators</Table.HeaderCell>
                          <Table.HeaderCell>Venue</Table.HeaderCell>
                          
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