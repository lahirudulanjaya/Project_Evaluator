import React from 'react';

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer} from 'mdbreact';
import './Student.css';
import Chart from './BarChart/BarChat';

const StudentPage = () => {
  return (
    
    <MDBContainer className="page">
        <h1>Group Number : ##</h1>
        <MDBRow>
            <MDBCol sm="9">
                <MDBCard>
                    <MDBCardBody>
                        <MDBContainer>
                            <MDBCardText>
                                <h5>Overview of marks</h5>
                            </MDBCardText>
                            <MDBRow>
                                <MDBCol md="3">
                                    <MDBCardTitle>Overall Marks</MDBCardTitle>
                                    <MDBCardText>
                                        <h1>##</h1>
                                    </MDBCardText>
                                </MDBCol>
                                <MDBCol md="3">
                                    <MDBCardTitle>Current Rank</MDBCardTitle>
                                    <MDBCardText>
                                        <h1>##</h1>
                                    </MDBCardText>
                                </MDBCol>
                                <MDBCol md="6">
                                    <MDBCardTitle>Presentage from overall marks</MDBCardTitle>
                                    <MDBCardText>
                                        <h1>###%</h1>
                                    </MDBCardText>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
            <MDBCol sm="3">
                <MDBCard>
                    <MDBCardBody>
                        <MDBCardTitle>Project Information</MDBCardTitle>
                            <MDBCardText>
                                *********************************************
                                *********************************************
                            </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>
        <br/>
        <MDBRow>
            <MDBCol md="6">
                <MDBCard>
                    <MDBCardBody>
                        <MDBCardTitle className="title">Project Marks</MDBCardTitle>
                        <MDBContainer style={{height:"92mm" }}>
                            <MDBCardText >
                                <MDBRow>
                                    <MDBCol md="8">
                                        <h5>Propasal</h5>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        ##
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardText>
                            <MDBCardText >
                                <MDBRow>
                                    <MDBCol md="8">
                                        <h5>Interim Report</h5>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        ##
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardText>
                            <MDBCardText >
                                <MDBRow>
                                    <MDBCol md="8">
                                        <h5>SRS Report</h5>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        ##
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardText>
                        </MDBContainer>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
            <MDBCol md="6">
                <MDBCard>
                    <MDBCardBody>
                        <MDBCardText style={{height:"10cm" }}>
                            <Chart></Chart>
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>
        <br/>
    </MDBContainer>
  )
}

export default StudentPage;

