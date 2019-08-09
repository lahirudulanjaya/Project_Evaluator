import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from './node_modules/@trendmicro/react-sidenav';
import{BrowserRouter as Router , Route} from './node_modules/react-router-dom'
import React,{Component} from './node_modules/react';
import './node_modules/@trendmicro/react-sidenav/dist/react-sidenav.css';

import RouteFile from './RouteFile';
// import StudentNavBar from './StudentNavBar';

const sideBar={
    backgroundColor : '#302F2F' 
}

class SideBar extends Component{
    render(){
        return (
            <div>
             {/* <StudentNavBar className="pb-3"/> */}
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
                <SideNav.Nav defaultSelected="evaluator">
                    <NavItem eventKey="evaluator">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            DashBoard
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="examGroup">
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
export default SideBar;