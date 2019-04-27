import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import{BrowserRouter as Router , Route} from 'react-router-dom'
import React,{Component} from 'react';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import RouteFile from './RouteFile';
import SCoordinatorNavBar from './SCoordinatorNavBar';

const sideBar={
    backgroundColor : '#302F2F' 
}

class SCoordinatorSideBar extends Component{
    render(){
        return (
            <div>
             <SCoordinatorNavBar className="pb-5"/>
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
                <SideNav.Nav defaultSelected="sc">
                    <NavItem eventKey="sc">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            DashBoard
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="stu/group">
                        <NavIcon>
                            <i className="fa fa-fw fa-users" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Group
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="stu/settings">
                        <NavIcon>
                            <i className="fa fa-fw fa-cog" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Settings
                        </NavText>
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
export default SCoordinatorSideBar;