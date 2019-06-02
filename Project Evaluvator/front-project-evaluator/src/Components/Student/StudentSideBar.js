import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import {whologgedin} from '../../actions/authActions'
import { getstudentProject, getstudentbyYear } from '../../actions/P_coodinator-Student'
import { getsendrequest, getrequest, cheackallaccepted } from '../../actions/requestActions'
import {getuserprofile} from '../../actions/authActions'
import{BrowserRouter as Router , Route} from 'react-router-dom'
import React,{Component} from 'react';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { connect } from 'react-redux'

import RouteFile from './RouteFile';
import Header from './Component/Header'
const sideBar={
    backgroundColor : '#302F2F' 
}



class StudentSideBar extends Component{
    constructor(props) {
        super(props)
        this.state = {
          user: [],
          academicyear: null,
          studentProject: null,
          student: null,
          groups: [],
          students: [],
          request: null,
          requests: [],
          isaccepted: false,
          clicked:false
    
    
    
        }
        
        this.props.getuserprofile()
        
    
      }
      componentDidMount() {
        if(!(whologgedin()=="student")){
          this.props.history.push('/login')
      }
    
      this.props.getuserprofile()
    
      this.props.getstudentProject(this.props.user.Registrationnumber)
        this.props.getstudentbyYear(this.props.user.Registrationnumber)
        this.props.getsendrequest(this.props.user.Registrationnumber)
        this.props.getrequest(this.props.user.Registrationnumber)
    
      }

      componentWillReceiveProps(nextprops) {

        if(!(this.props.user===nextprops.user)){
          this.props.getstudentProject(nextprops.user.Registrationnumber)
        this.props.getstudentbyYear(nextprops.user.Registrationnumber)
        this.props.getsendrequest(nextprops.user.Registrationnumber)
        this.props.getrequest(nextprops.user.Registrationnumber)
    
        }
        console.log(nextprops.student.studentbyYear.length)
        this.setState({user:nextprops.user})
        console.log(this.state)
        if(nextprops.student.studentbyYear.length>0){
        this.setState(
          {
            
            student: nextprops.student.studentbyYear[0],
            groups: nextprops.student.studentProject[0],
            students: nextprops.student.studentbyYear,
            request: nextprops.request.request.reciver,
            requests: nextprops.request.requests,
            isaccepted: nextprops.request.isaccepted,
            recive: true
          }
        
    
        )
        }
    
    
        this.setState({ request: nextprops.request.request.reciver })
        console.log(this.state.groups)
    
      }
    render(){
        return (
            <div>
        <Header username={this.state.user.UserName} requestcount={this.state.requests.length} requests={this.state.requests} accept={() => this.confirmRequest(this.state.user.Registrationnumber)}></Header>
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
                <SideNav.Nav defaultSelected="stu/home">
                    <NavItem eventKey="stu/home">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            My Project
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="stu/creategroups">
                        <NavIcon>
                            <i className="fa fa-fw fa-users" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Create Groups
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="stu/profile">
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
const mapStateToProps = state => {
    return (
  
  
  
      
        {
          user: state.auth.user,
          student: state.studentDetail,
          request: state.requests
        } 
        
    )
  
  
  }
export default connect(mapStateToProps,{ getstudentProject, getstudentbyYear, getsendrequest, getrequest, cheackallaccepted,getuserprofile })(StudentSideBar);


