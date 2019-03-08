import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'
const SideNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed">
            {/* <a href="#!" className="logo-wrapper waves-effect">
                <img alt="MDB React Logo" className="img-fluid" src={logo}/>
            </a> */}
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/pg" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="chart-pie" className="mr-3"/>
                        Dashboard
                    </MDBListGroupItem>
                </NavLink>
               
                <NavLink to="/Users" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="users" className="mr-3"/>
                        Users
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/pg/project" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="file" className="mr-3"/>
                        Projects
                    </MDBListGroupItem>
                </NavLink>
                
                <NavLink to="/404" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="exclamation" className="mr-3"/>
                        404
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
}

export default SideNavigation;
