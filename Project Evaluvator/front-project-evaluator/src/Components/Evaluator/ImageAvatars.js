import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import AvaImage from '../../avatar.jpg';
import {MDBContainer,MDBFooter} from 'mdbreact';


const styles = {
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
};

function ImageAvatars(props) {
  const { classes } = props;
  return (
    <div>
    <Grid container justify="center" alignItems="center">
      <Avatar alt="Remy Sharp" src={AvaImage} className={classes.bigAvatar} />
    </Grid>
    <div style={{position: "fixed", left: "0px", width: "100%", bottom: "0px", backgroundColor: "", color: "white",
                    textAlign: "center"}}>
                        <MDBFooter color="blue" className="font-small pt-4 mt-4" >
                        
                        <div className="footer-copyright text-center py-3">
                            <MDBContainer fluid>
                            &copy; {new Date().getFullYear()} Copyright: <a href="https://www.teamExxo.com"> teamExxo.com </a>
                            </MDBContainer>
                        </div>
                        </MDBFooter>
                </div>
    </div>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);