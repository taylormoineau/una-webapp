import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {sendJson, loadJson} from './sendJson';
import {LoginPage} from './loginPage';
import {Register} from './Register';
import {App} from './App';

export const DootRouter = () => {
  const [currentUser, setCurrentUser] = useState('nobody');

  const logout = async e => {
    e.preventDefault();
    sendJson('logout', {
      currentUser
    });
  };

  useEffect(() => {
    loadJson('checkAuth').then(setCurrentUser);
  }, []);
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register Page
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/loginPage" className="nav-link">
                  Login Page
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/adminpage" className="nav-link">
                  Admin Page
                </Link>
              </li>
              <li className="nav-item">
                <span className="navbar-text">
                  {currentUser && `Logged in as ${currentUser.email}`}
                </span>
              </li>
              <li className="nav-item">
                <form className="form-inline">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    type="button"
                    onClick={logout}
                  >
                    Log out
                  </button>
                </form>
              </li>
            </ul>
          </div>
        </nav>
        <br />
        <br name="very professional line breaks" />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/loginPage">
            <LoginPage />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/adminpage">
            <App />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

function Home() {
  return <h2>Home</h2>;
}

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
