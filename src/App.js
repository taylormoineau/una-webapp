import React, {useEffect, useState} from 'react';
import './App.css';
import sendJson from './sendJson';

//Delete this once we don't need it.
const base = 'http://localhost:3001/';

const loadPeople = async onLoad => {
  const response = await fetch(base + 'people');
  onLoad(await response.json());
};

const App = () => {
  //The hooks. We might be able to slim the register/login hooks down to one single hook holding an object.
  const [people, setPeople] = useState([]);
  const [adminState, setAdminState] = useState(true);
  const [emailRegisterState, setEmailRegisterState] = useState('');
  const [passwordRegisterState, setPasswordRegisterState] = useState('');
  const [emailLoginState, setEmailLoginState] = useState('');
  const [passwordLoginState, setPasswordLoginState] = useState('');

  //function to submit request to create new user.
  const submitNewUser = async e => {
    e.preventDefault();
    await sendJson('addPerson', {
      email: emailRegisterState,
      password: passwordRegisterState,
      admin: adminState
    });
    // TODO: need to show errors if they happen
    await loadPeople(setPeople);
  };

  //function to submit request to create new user.
  const loginUser = async e => {
    e.preventDefault();
    await sendJson('login', {
      email: emailLoginState,
      password: passwordLoginState
    });
    // TODO: need to show errors if they happen
    await loadPeople(setPeople);
  };

  //function to change admin status of user
  const changeAdmin = id => async () => {
    setPeople(people.map(p => (p.id === id ? {...p, admin: !p.admin} : p)));
    await sendJson('editPerson', {id});
    // TODO: need to show errors if they happen
    await loadPeople(setPeople);
  };

  //function to delete a user
  const deletePerson = id => async () => {
    await sendJson('deletePerson', {id});
    // TODO: need to show errors if they happen
    await loadPeople(setPeople);
  };

  useEffect(() => {
    // second argument is [], so only do once
    loadPeople(setPeople);
  }, []);

  return (
    <div className="container">
      <h1>Administration Table</h1>
      <table className="table table-condensed">
        <thead>
          <tr>
            <th>Unique id:</th>
            <th>Email:</th>
            <th>Password Hash</th>
            <th>Type</th>
            <th>Is Admin?</th>
            <th>Delete User</th>
          </tr>
        </thead>
        <tbody>
          {people.map(({id, email, password, admin}) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{email}</td>
              <td>{password}</td>
              <td>{admin ? 'ADMIN' : 'PLEB'}</td>
              <td>
                <input
                  type="checkbox"
                  checked={admin}
                  onChange={changeAdmin(id)}
                />
              </td>
              <td>
                <button onClick={deletePerson(id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
        <br />
        Make admin on register?{' '}
        <input
          name="checkBoxRegister"
          type="checkbox"
          checked={adminState}
          onChange={e => setAdminState(e.target.checked)}
        />
        <br />
        <button>Add User</button>
      </form>
      <br />
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

export default App;
