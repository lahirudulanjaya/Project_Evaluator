import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import{BrowserRouter as Router , Route} from 'react-router-dom'
import React,{Component} from 'react';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {whologgedin} from '../../../actions/authActions'
import {connect} from 'react-redux'
import RouteFile from '../../../RouteFile';
import NavBar from '../../Navbar/Navbar';
import './NewSideBar.css';

const sideBar={
    backgroundColor : '#302F2F' 
}

class NewSideBar extends Component{
    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            navbarPadding :''
        }
    }

    componentDidMount(){
        
        if(!(whologgedin()=="pcoordinator")){
            this.props.history.push('/login')
        }
    }

    render(){
        return (
            <div>
                
                <div className='navbarFalse'>
                      <NavBar className="pb-3"/>   
                </div>       
            
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
                        this.state.navbarPadding=1;
                        console.log(this.state.navbarPadding);
                    }
                    else{
                        this.state.navbarPadding=2;
                        console.log(this.state.navbarPadding);
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
                   
                    <NavItem eventKey="projects">
                        <NavIcon>
                            <i className="fa fa-fw fa-file" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Projects
                        </NavText>
                        <NavItem eventKey="pg/project">
                            <NavText>
                              Create New Project
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="pg/creategroups">
                            <NavText>
                                Create Groups
                            </NavText>
                        </NavItem>
                        
                        <NavItem eventKey="pg/timeslot">
                        <NavText>
                            Set Time Slots for Presentations
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="pg/setgooglesheet">
                        <NavText>
                            Set Google Sheet
                        </NavText>
                    </NavItem>
                    </NavItem>
                    <NavItem eventKey="projects">
                        <NavIcon>
                        
                            <i className="fa fa-cog" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                           Manage Projects
                        </NavText>
                        <NavItem eventKey="pg/milestone">
                            <NavText>
                              Update  Milestones
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="pg/updateprojects">
                            <NavText>
                              Update  Projects
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="pg/updatetimeslots">
                            <NavText>
                              Update timeslots
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="pg/milestone">
                            <NavText>
                              Update groups
                            </NavText>
                        </NavItem>

                        </NavItem>
                    <NavItem eventKey="users">
                        <NavIcon>
                            <i className="fa fa-fw fa-users" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Manage Users
                        </NavText>
                        <NavItem eventKey="student">
                            <NavText>
                                Students
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="pg/evaluvator">
                            <NavText>
                                Evaluator
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="pg/sessioncoordinator">
                            <NavText>
                                Session Coordinator
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
