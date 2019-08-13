import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow, MDBContainer,MDBFooter} from 'mdbreact';

import ImageAvatars from './ImageAvatars';
import ExamGroup from './Pages/ExamGroup/ExamGroup';


export default class Evaluator extends React.Component {

  render(){
    return(
      <div>
      <h1>Evaluator dash board</h1>
      <div style={{position: "fixed", left: "0px", width: "100%", bottom: "0px", backgroundColor: "", color: "white",
                    textAlign: "center"}}>
                        <MDBFooter color="blue" className="font-small pt-4 mt-4" >
                        
                        <div className="footer-copyright text-center py-3">
                            <MDBContainer fluid>
                            &copy; {new Date().getFullYear()} Copyright: <a href="https://www.teamExxo.com"> teamExxo.com </a>
                            </MDBContainer>
                        </div>
                        </MDBFooter>
                </div>
      </div>
    )
  }
}