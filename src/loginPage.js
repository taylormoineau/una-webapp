import React, {useState} from 'react';
import {sendJson} from './sendJson';

export const LoginPage = ({checkAuth}) => {
  const [emailLoginState, setEmailLoginState] = useState('');
  const [passwordLoginState, setPasswordLoginState] = useState('');

  //function to submit request to create new user.
  const loginUser = async e => {
    e.preventDefault();
    await sendJson('login', {
      email: emailLoginState,
      password: passwordLoginState
    });
    // TODO: need to show errors if they happen
    await checkAuth();
  };

  return (
    <div className="container">
      <h2>Login here</h2>
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
