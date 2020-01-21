import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {sendJson} from './sendJson';

export const DootRouter = () => {
  const [emailLoginState, setEmailLoginState] = useState('');
  const [passwordLoginState, setPasswordLoginState] = useState('');
  const [currentUser, setCurrentUser] = useState('nobody');

  const loginUser = async e => {
    e.preventDefault();
    await sendJson('login', {
      email: emailLoginState,
      password: passwordLoginState
    });
  };

  useEffect(() => {
    const fetchResult = async () => {
      const result = await fetch('checkAuth', {
        method: 'POST',
        credentials: 'include'
      });
      setCurrentUser(result.data);
    };

    fetchResult();
  }, []);

  return (
    <div className="container">
      <h2>Hello, {currentUser}</h2>
      <form onSubmit={loginUser}>
        New email:{' '}
        <input
          name="emailLogin"
          value={emailLoginState}
          type="text"
          onChange={e => setEmailLoginState(e.target.value)}
        />
        <br />
        Password:{' '}
        <input
          name="passwordLogin"
          type="password"
          value={passwordLoginState}
          onChange={e => setPasswordLoginState(e.target.value)}
        />
        <br />
        <button>Log in</button>
      </form>
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
// export const DootRouter = () => (
//   <Router>
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <Link to="/" className="navbar-brand">
//           Home
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <Link to="/register" className="nav-link">
//                 Register Page
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/loginPage" className="nav-link">
//                 Login Page
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/adminpage" className="nav-link">
//                 Admin Page
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </nav>
//       <br />
//       <br name="very professional line breaks" />
//       {/* A <Switch> looks through its children <Route>s and
//             renders the first one that matches the current URL. */}
//       <Switch>
//         <Route path="/loginPage">
//           <LoginPage />
//         </Route>
//         <Route path="/register">
//           <Register />
//         </Route>
//         <Route path="/adminpage">
//           <App />
//         </Route>
//         <Route path="/">
//           <Home />
//         </Route>
//       </Switch>
//     </div>
//   </Router>
// );

// function Home() {
//   return <h2>Home</h2>;
// }
