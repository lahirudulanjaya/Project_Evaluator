import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { NavLink } from 'react-router-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

const myEventsList=["first event","second event","third event"];

const MyCalendar = props => (
    <div style={{height:500}}>
      <BigCalendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  )

class Calender extends React.Component{
    render() {
        const { classes } = this.props;

        return (
          <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div style={{height:500}}>
              <BigCalendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                />
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
          </div>
        );
    }

}


export default Calender;

