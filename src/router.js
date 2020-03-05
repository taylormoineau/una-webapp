import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {loadJson} from './utils';
import {AdminPage} from './AdminPage';
import {Home} from './Home.js';
import {Book} from './Book';
import {Register} from './Register';
import {InfoRegister} from './InfoRegister';
import {UserProfile} from './UserProfile';
import {NavBar} from './NavBar';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export const DootRouter = () => {
  const [currentUser, setCurrentUser] = useState('');

  const checkAuth = async () => {
    const user = await loadJson('checkAuth');
    if (user.error) {
      console.error(user.error);
    } else {
      setCurrentUser(user);
    }
  };

  const logout = async () => {
    await loadJson('logout');
    setCurrentUser('');
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <NavBar classes={classes} currentUser={currentUser} logout={logout} />
        <Switch>
          <Route path="/adminpage">
            <AdminPage />
          </Route>
          <Route path="/book/:bookId">
            <Book />
          </Route>
          <Route path="/register">
            <Register checkAuth={checkAuth} currentUser={currentUser} />
          </Route>
          <Route path="/infoRegister">
            <InfoRegister checkAuth={checkAuth} currentUser={currentUser} />
          </Route>
          <Route path="/userInfo/:userId">
            <UserProfile checkAuth={checkAuth} currentUser={currentUser} />
          </Route>
          <Route path="/">
            <Home checkAuth={checkAuth} currentUser={currentUser} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
