import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {loadJson} from './utils';
import {AdminPage} from './AdminPage';
import {CreateBookPage} from './CreateBookPage';
import {LoginPage} from './loginPage';
import {Home} from './Home.js';
import {Book} from './Book';
import {Register} from './Register';
import {InfoRegister} from './InfoRegister';
import {UserProfile} from './userProfile';
import {NavBar} from './NavBar';
import {makeStyles} from '@material-ui/core/styles';
import {InfoUpdateBar} from './InfoUpdateBar';
import {About} from './About';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  navBar: {
    backgroundColor: theme.palette.warning.light
  },
  yellowButtons: {
    backgroundColor: theme.palette.warning.light
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
        {currentUser.initial_info && (
          <InfoUpdateBar name={currentUser.first_name} />
        )}
        <Switch>
          <Route path="/adminpage">
            <AdminPage />
          </Route>
          <Route path="/about">
            <About currentUser={currentUser} />
          </Route>
          <Route path="/createBooks/:filterId">
            <CreateBookPage isAdmin={currentUser.admin} />
          </Route>
          <Route path="/book/:bookId">
            <Book checkAuth={checkAuth} currentUser={currentUser} />
          </Route>

          <Route path="/register">
            <Register checkAuth={checkAuth} currentUser={currentUser} />
          </Route>
          <Route path="/infoRegister">
            <InfoRegister checkAuth={checkAuth} currentUser={currentUser} />
          </Route>
          <Route path="/userInfo/:author_id">
            <UserProfile checkAuth={checkAuth} currentUser={currentUser} />
          </Route>
          <Route path="/login">
            <LoginPage checkAuth={checkAuth} currentUser={currentUser} />
          </Route>

          <Route path="/">
            <Home
              checkAuth={checkAuth}
              currentUser={currentUser}
              logout={logout}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
