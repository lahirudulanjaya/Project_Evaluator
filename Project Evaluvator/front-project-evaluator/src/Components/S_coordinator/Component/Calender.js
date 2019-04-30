import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Calendar from "react-calendar";
import SessionTable from './SessionListTable';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
const localizer = BigCalendar.momentLocalizer(moment)


const Calender = props => (
  <div>
    <BigCalendar
      localizer={localizer}
      
      startAccessor="start"
      endAccessor="end"
    />
  </div>
)

export default Calender;