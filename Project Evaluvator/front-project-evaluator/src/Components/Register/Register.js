import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import './Register.css';

const FormPage = () => {
  return (
    <MDBContainer className="signup">
      <MDBRow>
        <MDBCol sm="3"></MDBCol>
        <MDBCol sm="6">
          <MDBCard>
            <div className="header pt-3 grey lighten-2">
              <MDBRow className="d-flex justify-content-start">
                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                  Sign Up
                </h3>
              </MDBRow>
            </div>
            <MDBCardBody className="mx-4 mt-4">
              <MDBInput label= "Your Name" group type="text" validate/>
              <MDBInput label= "Acadamic Year" group type="number" validate/>
              <MDBInput label= "Index number" group type="text" validate/>
              <MDBInput
                label="Your password"
                group
                type="password"
                validate
                containerClass="mb-0"
              />
              <div className="text-center mb-4 mt-5">
                <MDBBtn
                  color="primary"
                  type="button"
                  className="btn-block z-depth-2"
                >
                  Sign Up
                </MDBBtn>
              </div>
              <p className="font-small grey-text d-flex justify-content-center">
                Already have an account?
                <a
                  href="/"
                  className="dark-grey-text font-weight-bold ml-1"
                >
                  Login
                </a>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol sm="3"></MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FormPage;