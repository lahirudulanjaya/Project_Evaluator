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

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
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
      <List
        component="nav"
        // subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
        className={classes.root}
      >
        <NavLink exact={true} to="/pg" activeClassName="activeClass">
            <ListItem>
                <ListItemIcon>
                <i class="fas fa-columns"></i>
                </ListItemIcon>
                    <ListItemText inset primary="Dashbroad" />
            </ListItem>
        </NavLink>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
          <i class="fas fa-users"></i>
          </ListItemIcon>
          <ListItemText inset primary="Users" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <NavLink exact={true} to="/student" activeClassName="activeClass">
                <ListItem button className={classes.nested}>
                    <ListItemIcon>
                    <i class="fas fa-user-graduate"></i>
                    </ListItemIcon>
                    <ListItemText inset primary="Student" />
                </ListItem>
            </NavLink>
            <NavLink exact={true} to="/evalutor" activeClassName="activeClass">
                <ListItem button className={classes.nested}>
                    <ListItemIcon>
                    <i class="fas fa-chalkboard-teacher"></i>
                    </ListItemIcon>
                    <ListItemText inset primary="Evalutor" />
                </ListItem>
            </NavLink>
            <NavLink exact={true} to="/sessionCoordinator" activeClassName="activeClass">
                <ListItem button className={classes.nested}>
                    <ListItemIcon>
                    <i class="fas fa-user-alt"></i>
                    </ListItemIcon>
                    <ListItemText inset primary="Session Coordinator" />
                </ListItem>
            </NavLink>
          </List>
        </Collapse>
       


        <ListItem button onClick={this.handleClick1}>
          <ListItemIcon>
          <i class="fas fa-project-diagram"></i>
          </ListItemIcon>
          <ListItemText inset primary="Projects" />
          {this.state.open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          <NavLink exact={true} to="/pg/project" activeClassName="activeClass">
                <ListItem button className={classes.nested}>
                    <ListItemIcon>
                    <i class="fas fa-project-diagram"></i>
                    </ListItemIcon>
                    <ListItemText inset primary="Projects" />
                </ListItem>
            </NavLink>
            <NavLink exact={true} to="/pg/project/milestone" activeClassName="activeClass">
                <ListItem button className={classes.nested}>
                    <ListItemIcon>
                    <i class="fas fa-chalkboard-teacher"></i>
                    </ListItemIcon>
                    <ListItemText inset primary="Evalutor" />
                </ListItem>
            </NavLink>
            
          </List>
        </Collapse>



      </List>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);