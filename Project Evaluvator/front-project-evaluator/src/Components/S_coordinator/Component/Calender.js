import React from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import { MDBContainer } from "mdbreact";
import Calendar from "react-calendar";

 
class Calender extends React.Component {
    state = {
    date: new Date(),
    
  }
 
  onChange = date => this.setState({ date });
  
  callDay = (clikedDay) => { console.log(clikedDay);
    
  };//moment(day.dateString).format(_format)

  render() {
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
          onClickDay={this.callDay}
        />
      </div>
    );
  }
}


export default Calender;
