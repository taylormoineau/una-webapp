import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';

export const NavBar = ({classes, currentUser, logout}) => {
  let history = useHistory();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Button
            color="inherit"
            size="large"
            onClick={() => history.push('/')}
          >
            Home
          </Button>
        </Typography>
        <Typography variant="h6" className={classes.title}>
          {currentUser && `Logged in as ${currentUser.email}`}
        </Typography>
        {currentUser && currentUser.admin && (
          <Button
            size="large"
            color="inherit"
            onClick={() => history.push('/adminpage')}
          >
            Admin
          </Button>
        )}
        {currentUser && (
          <Button color="inherit" size="large" onClick={logout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
