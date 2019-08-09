import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ExamGroup from './Pages/ExamGroup/ExamGroup'

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow, MDBContainer} from 'mdbreact';

import ImageAvatars from './ImageAvatars';

export default class Evaluator extends React.Component {
   
  render() {
    return(
      <div>
        <h1>Evaluator DashBoard</h1>
        <ExamGroup></ExamGroup>
      </div>
     
    );
  }

}