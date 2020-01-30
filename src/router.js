import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {loadJson} from './utils';
import {AdminPage} from './AdminPage';
import {Home} from './Home.js';
import {Book} from './Book';
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

  useEffect(() => {
    checkAuth();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <NavBar classes={classes} />
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
