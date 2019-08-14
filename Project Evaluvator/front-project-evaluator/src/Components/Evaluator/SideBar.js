import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import{BrowserRouter as Router , Route} from 'react-router-dom'
import React,{Component} from 'react';
import {whologgedin} from '../../actions/authActions'
import {Link } from 'react-router-dom'

import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import {whologgedin} from '../../actions/authActions'/*../../../actions/authActions'*/
import Navbar from '../Navbar/Navbar'

import RouteFile from './RouteFile';
// import StudentNavBar from './StudentNavBar';

const sideBar={
    backgroundColor : '#302F2F' 
}

class SideBar extends Component{

    constructor(props){
        super(props)
    }

    componentDidMount(){
        
        if(!(whologgedin()=="evaluator")){
            
            this.props.history.push('/login')
            
        }
    }

    render(){
        return (
            <div>
                <Navbar/>
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
                            <i className="fa fa-fw fa-users" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Group
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