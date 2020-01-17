import React, {useEffect, useState} from 'react';
import './App.css';
import {sendJson, loadJson} from './sendJson';

const loadPeople = async (onLoad, setError) => {
  const data = await loadJson('people');
  if (data.error) {
    setError(data.error);
  } else {
    onLoad(data);
  }
};

const App = () => {
  //The hooks. We might be able to slim the register/login hooks down to one single hook holding an object.
  const [people, setPeople] = useState([]);
  const [adminState, setAdminState] = useState(true);
  const [emailRegisterState, setEmailRegisterState] = useState('');
  const [passwordRegisterState, setPasswordRegisterState] = useState('');
  const [error, setError] = useState('');

  //function to submit request to create new user.
  const submitNewUser = async e => {
    e.preventDefault();
    await sendJson('addPerson', {
      email: emailRegisterState,
      password: passwordRegisterState,
      admin: adminState
    });
    // TODO: need to show errors if they happen
    await loadPeople(setPeople, setError);
  };

  //function to change admin status of user
  const changeAdmin = id => async () => {
    setPeople(people.map(p => (p.id === id ? {...p, admin: !p.admin} : p)));
    await sendJson('editPerson', {id});
    // TODO: need to show errors if they happen
    await loadPeople(setPeople, setError);
  };

  //function to delete a user
  const deletePerson = id => async () => {
    await sendJson('deletePerson', {id});
    // TODO: need to show errors if they happen
    await loadPeople(setPeople, setError);
  };

  useEffect(() => {
    // second argument is [], so only do once
    loadPeople(setPeople, setError);
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
        <br name="my most favorite line break" />
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
      <h3 style={{color: 'red'}}>{error}</h3>
    </div>
  );
};

export default App;
