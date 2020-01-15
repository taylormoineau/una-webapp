import React, { useEffect, useState } from 'react';
import './App.css';
import sendJson from './sendJson'


//Delete these
const base = 'http://localhost:3001/';
const appJson = 'application/json'

const loadPeople = async onLoad => {
  const response = await fetch(base + 'people');
  onLoad(await response.json());
};

const App = () => {
  const [people, setPeople] = useState([]);
  const [adminState, setAdminState] = useState(true)

  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const submitNewUser = async e => {
    e.preventDefault();

    //I know this is messy, will change soon.
    await sendJson('addPerson', {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      admin: adminState
    })

    await loadPeople(setPeople);
  };

  const changeAdmin = id => async e => {
    setPeople(people.map(p => p.id === id ? { ...p, admin: !p.admin } : p))

    await sendJson('editPerson', { id })
    // TODO: need to show errors if they happen
    await loadPeople(setPeople);
  };



  //Function for button to delete a user

  const deletePerson = id => async e => {

    await sendJson('deletePerson', { id })
    // TODO: need to show errors if they happen
    await loadPeople(setPeople);
  };


  useEffect(() => {
    // second argument is [], so only do once
    loadPeople(setPeople);
  }, []);

  return (
    <div className="container">
      <table className="table table-condensed">
        <thead>
          <tr>
            <th>Id:</th>
            <th>Email:</th>
            <th>Password Hash</th>
            <th>Type</th>
            <th>Is Admin?</th>
            <th>Delete User</th>
          </tr>
        </thead>
        <tbody>
          {people.map(({ id, email, password, admin }) => (
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

      <form onSubmit={submitNewUser}>
        New email: <input type="text" ref={emailRef} />
        <br />
        Password: <input type="password" ref={passwordRef} />
        <br />
        Make admin on register?{' '}
        <input
          type="checkbox"
          checked={adminState}
          onChange={e => setAdminState(e.target.checked)}
        />
        <br />
        <button>Add User</button>
      </form>
    </div>
  );
};

export default App;
