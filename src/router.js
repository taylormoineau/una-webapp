import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {loadJson} from './utils';
import {AdminPage} from './AdminPage';
import {Home} from './Home.js';
import {Book} from './Book';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
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
  let history = useHistory();
  const [currentUser, setCurrentUser] = useState('');

  function handleClick() {
    history.push('/adminpage');
  }

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
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit" size="large" onClick={handleClick}>
              Home
            </Button>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            {currentUser && `Logged in as ${currentUser.email}`}
          </Typography>
          {currentUser && currentUser.admin && (
            // History.push
            <Button size="large" color="inherit" onClick={handleClick}>
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
      <Router>
        <Switch>
          <Route path="/adminpage">
            <AdminPage />
          </Route>
          <Route path="/book/:id">
            <Book />
          </Route>
          <Route path="/">
            <Home checkAuth={checkAuth} currentUser={currentUser} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

//   <div className="container">
//     <form id="signup">
//       <div className="header">
//         <h3>UNA App Sign In</h3>

//         <p>If you are already a user sign in here:</p>
//       </div>

//       <div className="sep"></div>

//       <div className="inputs">
//         <input type="email" placeholder="e-mail" autoFocus />

//         <input type="password" placeholder="Password" />

//         <div className="checkboxy">
//           <input name="cecky" id="checky" value="1" type="checkbox" />
//           <label className="terms">Set cookie?</label>
//         </div>

//         <a id="submit" href="#">
//           SIGN IN
//         </a>
//       </div>
//     </form>
//   </div>
// );
