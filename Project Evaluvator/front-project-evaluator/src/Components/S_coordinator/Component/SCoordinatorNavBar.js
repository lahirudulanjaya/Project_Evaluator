import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse} from "mdbreact";

class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
    <MDBNavbar color="light" dark expand="md">
      <MDBNavbarBrand>
        {/* <img src={Ucsc} alt="" class="logo"/> */}
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={this.toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
        <MDBNavbarNav right>
          <MDBNavItem active>
            <MDBNavLink to="/login"><b style={{ color: '#000000' }}>Login</b></MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/register"><b style={{ color: '#000000' }}>Sign Up</b></MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
    
    );
  }
}

export default NavbarPage;
