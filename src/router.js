import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {loadJson} from './sendJson';
import {Register} from './Register.js';
import {App} from './App';
import {Home} from './Home.js';

export const DootRouter = () => {
  const [currentUser, setCurrentUser] = useState('');

  const checkAuth = async () => {
    const user = await loadJson('checkAuth');
    console.log(user);
    if (user.error) {
      console.error(user.error);
    } else {
      setCurrentUser(user);
    }
  };

  const logout = async e => {
    await loadJson('logout');
    setCurrentUser('');
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">
            Home
          </Link>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {currentUser && currentUser.admin && (
                <li className="nav-item">
                  <Link to="/adminpage" className="nav-link">
                    Admin Page
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <span className="navbar-text">
                  {currentUser && `Logged in as ${currentUser.email}`}
                </span>
              </li>
              <li className="nav-item">
                {currentUser && (
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    type="button"
                    onClick={logout}
                  >
                    Log out
                  </button>
                )}
              </li>
            </ul>
          </div>
        </nav>
        <br />
        <br name="very professional line breaks" />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/adminpage">
            <App />
          </Route>
          <Route path="/">
            <Home checkAuth={checkAuth} currentUser={currentUser} />
            <div className="container">
              <form id="signup">
                <div className="header">
                  <h3>UNA App Sign In</h3>

                  <p>If you are already a user sign in here:</p>
                </div>

                <div className="sep"></div>

                <div className="inputs">
                  <input type="email" placeholder="e-mail" autoFocus />

                  <input type="password" placeholder="Password" />

                  <div className="checkboxy">
                    <input name="cecky" id="checky" value="1" type="checkbox" />
                    <label className="terms">Set cookie?</label>
                  </div>

                  <a id="submit" href="#">
                    SIGN IN
                  </a>
                </div>
              </form>
            </div>
            );
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
