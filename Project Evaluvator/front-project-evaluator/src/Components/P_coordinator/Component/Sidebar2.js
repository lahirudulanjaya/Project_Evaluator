import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { NavLink } from 'react-router-dom';
import { blue } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import { MDBRow, MDBCol, MDBIcon } from "mdbreact";

const styles = theme => ({
  root: {
    maxWidth: 400,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
    
  },
});

class NestedList extends React.Component {
  state = {
    open: false,
    open1:false
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };
  handleClick1 = () => {
    this.setState(state => ({ open1: !state.open1 }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
      <List
        component="nav"
        // subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
        className={classes.root}
      >
        <NavLink exact={true} to="/pg" activeClassName="activeClass">
            <ListItem>
            <ListItemIcon>
                    <MDBIcon className="indigo-text pr-3" icon="chart-line" />
                </ListItemIcon>
                    <ListItemText inset primary={<Typography type="body2" style={{ color: '#FFFFFF', fontSize:18  }}><b>Dashboard</b></Typography>} />
            </ListItem>
        </NavLink>
        <ListItem button onClick={this.handleClick}>
        <ListItemIcon>
                    <MDBIcon className="indigo-text pr-3" icon="users" />
                </ListItemIcon>
          <ListItemText inset primary={<Typography type="body2" style={{ color: '#FFFFFF', fontSize:18  }}><b>Users</b></Typography>} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <NavLink exact={true} to="/student" activeClassName="activeClass">
                <ListItem button className={classes.nested}>
                <ListItemIcon>
                    <MDBIcon className="indigo-text pr-3" icon="user-graduate" />
                </ListItemIcon>
                    <ListItemText inset primary={<Typography type="body2" style={{ color: '#FFFFFF', fontSize:18  }}><b>Students</b></Typography>}/>
                </ListItem>
            </NavLink>
            <NavLink exact={true} to="/evalutor" activeClassName="activeClass">
                <ListItem button className={classes.nested}>
                <ListItemIcon>
                
                    <MDBIcon className="indigo-text pr-3" icon="chalkboard-teacher" />
                    </ListItemIcon>
                    <ListItemText  inset primary={<Typography type="body2" style={{ color: '#FFFFFF', fontSize:18  }}><b>Evaluator</b></Typography>} />
                </ListItem>
            </NavLink>
            <NavLink exact={true} to="/sc" activeClassName="activeClass">
                <ListItem button className={classes.nested}>
                    <ListItemIcon>
                    <MDBIcon className="indigo-text pr-3" icon="clock" />
                    </ListItemIcon>
                    <ListItemText inset primary={<Typography type="body2" style={{ color: '#FFFFFF', fontSize:18  }}><b>Session Coordinator</b></Typography>}/>
                </ListItem>
            </NavLink>
          </List>
        </Collapse>
       


        <ListItem button onClick={this.handleClick1}>
        <ListItemIcon>
                
                <MDBIcon className="indigo-text pr-3" icon="file-contract" />
                </ListItemIcon>
          <ListItemText inset primary={<Typography type="body2" style={{ color: '#FFFFFF', fontSize:18  }}><b>Projects</b></Typography>} />
          {this.state.open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          <NavLink exact={true} to="/pg/project" activeClassName="activeClass">
                <ListItem button className={classes.nested}>
                <ListItemIcon>
                
                <MDBIcon className="indigo-text pr-3" icon="file-contract" />
                </ListItemIcon>
                    <ListItemText inset primary={<Typography type="body2" style={{ color: '#FFFFFF', fontSize:18  }}><b>Projects</b></Typography>} />
                </ListItem>
            </NavLink>
            <NavLink exact={true} to="/pg/project/milestone" activeClassName="activeClass">
                <ListItem button className={classes.nested}>
                <ListItemIcon>
                
                <MDBIcon className="indigo-text pr-3" icon="dot-circle" />
                </ListItemIcon>
                    <ListItemText inset primary={<Typography type="body2" style={{ color: '#FFFFFF', fontSize:18 }}><b>Milestones</b></Typography>} />
                </ListItem>
            </NavLink>
            
          </List>
        </Collapse>



      </List>
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);