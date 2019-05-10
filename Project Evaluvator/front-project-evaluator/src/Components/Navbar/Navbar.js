import React, { Component } from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon
} from "mdbreact";
import Ucsc from "../../Ucsc.jpg";
import "./Navbar.css";
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import { Icon, Popup, Button, List } from 'semantic-ui-react'
import  {deletetoken} from '../../actions/authActions'
class NavbarPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      username: props.username,
      requestcount: props.requestcount,
      requests: []
    };
    console.log(props)
  }
  logout(){
    deletetoken()
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }
  componentWillReceiveProps(nextprops) {
    this.setState({ requestcount: nextprops.requestcount })
    this.setState({ requests: nextprops.requests })
  }

  render() {
    const { username, requestcount, requests } = this.props
    return (
      <MDBNavbar color="light" dark expand="md">
        <MDBNavbarBrand>
          <strong className='title' style={{ color: '#000000'}}>Welcome {this.state.username}</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavItem active>
                <NotificationBadge count={this.state.requestcount} effect={Effect.SCALE} />

                <Popup
                  trigger={<Icon size='big' name='user' />}
                  content={<List>
                    {this.state.requests.map(requests =>
                      <List.Item>{requests.sender} wants to make a group with {requests.reciver.map(reciver =>
                        <div inlist>
                          {reciver.Registrationnumber}
                        </div>
                      )}
                        <div className='ui two buttons'>
                          <Button basic color='green' onClick={this.props.accept}>
                            Approve
          </Button>
                          <Button basic color='red'>
                            Decline
          </Button>
                        </div>

                      </List.Item>

                    )}

                    {console.log(this.state.requests)}
                  </List>}
                  on='click'
                />
              </MDBNavItem>
            </MDBNavItem>
            <MDBNavItem active>
              <Icon size='big' name='bell' >  <NotificationBadge count={3} effect={Effect.SCALE} /></Icon>
            </MDBNavItem>
            <MDBNavItem active>
              <MDBNavLink to="/login"><b onClick={this.logout} style={{ color: '#000000' }}>log out </b></MDBNavLink>
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
