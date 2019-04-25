import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import Ucsc from "../../Ucsc.jpg";
import "./Navbar.css";
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import {Icon }from 'semantic-ui-react'
class NavbarPage extends Component {
  constructor(props){
    super(props)
  
this.state = {
  isOpen: false,
  username:props.username
};

}

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  const username =this.props
  return (
    <MDBNavbar color="light" dark expand="md">
      <MDBNavbarBrand>
                    <strong style={{ color: '#000000' }}>Welcome {this.state.username}</strong>
        </MDBNavbarBrand>
      <MDBNavbarToggler onClick={this.toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
        <MDBNavbarNav right>
        <MDBNavItem>
          <MDBNavItem active>
        <Icon size='big' name='user' >  <NotificationBadge count={3} effect={Effect.SCALE} /></Icon>
          </MDBNavItem>
          </MDBNavItem>
        <MDBNavItem active>
        <Icon size='big' name='bell' >  <NotificationBadge count={3} effect={Effect.SCALE} /></Icon>
          </MDBNavItem>
          <MDBNavItem active>
            <MDBNavLink to="/login"><b style={{ color: '#000000' }}>log out </b></MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/register"><b style={{ color: '#000000' }}>Sign Up</b></MDBNavLink>
          </MDBNavItem>
          {/* <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <div className="d-none d-md-inline"><b>Dropdown</b></div>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default" right>
                <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem> */}
        </MDBNavbarNav>
       
      {/*    <MDBNavItem>
            <MDBNavLink className="waves-effect waves-light" to="#!">
              <MDBIcon fab icon="google-plus-g" />
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <MDBIcon icon="user" />
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default" right>
                <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav> */}
      </MDBCollapse>
    </MDBNavbar>
    
    );
  }
}

export default NavbarPage;
