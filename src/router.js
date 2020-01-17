import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import App from './App';
import Register from './Register';
import {LoginPage} from './loginPage';

export const DootRouter = () => (
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

function Home() {
  return <h2>Home</h2>;
}
