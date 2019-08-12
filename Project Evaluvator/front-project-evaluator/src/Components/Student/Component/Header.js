import React, { Component } from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
} from "mdbreact";
import "./Header.css";
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import { Icon, Popup, Button, List } from 'semantic-ui-react'
import  {deletetoken} from '../../../actions/authActions'
import swal from 'sweetalert';
import {getuserprofile} from '../../../actions/authActions'
import { connect } from 'react-redux'
import Axios from 'axios';

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      username: props.username,
      requestcount: props.requestcount,
      requests: []
    };
    console.log(props)
    this.props.getuserprofile()

  }
  logout(){
    deletetoken()
  }
  componentDidMount(){
    this.props.getuserprofile()

  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }
  componentWillReceiveProps(nextprops) {
    this.setState({ requestcount: nextprops.requestcount })
    this.setState({ requests: nextprops.requests })
    console.log(nextprops)
  }
  accept=()=>{
    Axios.get("http://localhost:4000/api/checkaccepted/"+this.props.user.Registrationnumber)
    .then(res => {
      swal({
        title: "Good job!",
        text: "You have succesfully Submit Groups!",
        icon: "success",
      });
    })
    .catch(err => {
      swal("Oops", "Something went wrong!!!", "error")
      console.log(err)
    })
  }
  reject(){
    
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
                          <Button basic color='green' onClick={this.accept}>
                            Approve
          </Button>
                          <Button basic color='red' onClick={this.reject}>
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
           
            
          </MDBNavbarNav>

         
        </MDBCollapse>
      </MDBNavbar>

    );
  }
}
const mapStateToProps = state => {
  console.log(state)
  return (    
      {
        user: state.auth.user,
       
      } 
      
  )


}
export default connect(mapStateToProps, { getuserprofile })(Header);

