import React, {useState} from 'react';
import './App.css';
import {sendJson} from './utils';

export const Register = ({checkAuth}) => {
  //The hooks. We might be able to slim the register/login hooks down to one single hook holding an object.
  const [emailRegisterState, setEmailRegisterState] = useState('');
  const [passwordRegisterState, setPasswordRegisterState] = useState('');
  const [error, setError] = useState('');

  //function to submit request to create new user.
  const submitNewUser = async e => {
    e.preventDefault();
    const result = await sendJson('addPerson', {
      email: emailRegisterState,
      password: passwordRegisterState
    });
    if (result.error) {
      setError(result.error);
    }
    await checkAuth();
  };

  return (
    <div className="container">
      <h2>Register here:</h2>
      <form onSubmit={submitNewUser}>
        New email:{' '}
        <input
          name="emailRegister"
          value={emailRegisterState}
          type="text"
          onChange={e => setEmailRegisterState(e.target.value)}
        />
        <br />
        Password:{' '}
        <input
          name="passwordRegister"
          type="password"
          value={passwordRegisterState}
          onChange={e => setPasswordRegisterState(e.target.value)}
        />
        <br name="my second most favorite line break" />
        <button>Add User</button>
      </form>
      <h3 style={{color: 'red'}}>{error}</h3>
    </div>
  );
};
