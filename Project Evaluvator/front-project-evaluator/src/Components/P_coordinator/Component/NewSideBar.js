import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import{BrowserRouter as Router , Route} from 'react-router-dom'
import React,{Component} from 'react';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import RouteFile from '../../../RouteFile';
import NavBar from '../../Navbar/Navbar';

const sideBar={
    backgroundColor : '#302F2F' 
}

class NewSideBar extends Component{
    render(){
        return (
            <div>
            <NavBar className="pb-3"/>
            <Router>
    <Route render={({ location, history }) => (
        <React.Fragment>
            <SideNav
                style={sideBar}
                onSelect={(selected) => {
                    const to = '/' + selected;
                    if (location.pathname !== to) {
                        history.push(to);
                    }
                }}
                onToggle={(expanded)=>{
                    if(expanded==true){
                        console.log("Ture");
                    }
                    else{
                        console.log("False");
                    }
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="project">
                    <NavItem eventKey="project">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            DashBoard
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="users">
                        <NavIcon>
                            <i className="fa fa-fw fa-users" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Users
                        </NavText>
                        <NavItem eventKey="student">
                            <NavText>
                                Students
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="devices">
                            <NavText>
                                Evaluator
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="devices">
                            <NavText>
                                Session Coordinator
                            </NavText>
                        </NavItem>
                    </NavItem>
                    <NavItem eventKey="projects">
                        <NavIcon>
                            <i className="fa fa-fw fa-file" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Projects
                        </NavText>
                        <NavItem eventKey="pg/project">
                            <NavText>
                                Projects
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="pg/milestone">
                            <NavText>
                                Milestones
                            </NavText>
                        </NavItem>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
            <main>
                <RouteFile/>
            </main>
        </React.Fragment>
    )}
    />
</Router>
</div>
        );
    }
}
export default NewSideBar;