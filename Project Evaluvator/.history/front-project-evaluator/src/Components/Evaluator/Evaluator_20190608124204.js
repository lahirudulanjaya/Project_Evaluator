import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow, MDBContainer} from 'mdbreact';

import ImageAvatars from './ImageAvatars';
import ExamGroup from './Pages/ExamGroup/ExamGroup'

export default class Evaluator extends React.Component {

  render(){
    return(
      <ExamGroup></ExamGroup>
    )
  }
}