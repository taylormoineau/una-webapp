import React, {useState} from 'react';
import {sendJson} from './sendJson';

export const LoginPage = ({checkAuth}) => {
  const [emailLoginState, setEmailLoginState] = useState('');
  const [passwordLoginState, setPasswordLoginState] = useState('');
  const [errorState, setErrorState] = useState('');

  //function to submit request to create new user.
  const loginUser = async e => {
    e.preventDefault();
    const result = await sendJson('login', {
      email: emailLoginState,
      password: passwordLoginState
    });
    if (result.error) {
      setErrorState(result.error);
    }
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
      <h3 style={{color: 'red'}}>{errorState}</h3>
    </div>
  );
};
