import React, {useEffect, useState} from 'react';
import './App.css';

const base = 'http://localhost:3001/';
const appJson = 'application/json'

const loadPeople = async onLoad => {
  const response = await fetch(base + 'people');
  onLoad(await response.json());
};

const App = () => {
  const [people, setPeople] = useState([]);
  const [adminState, setAdminState] = useState(true)
  //const [makeAdminState, setMakeAdminState]

  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const submitNewUser = async e => {
    e.preventDefault();
    await fetch(base + 'addPerson', {
      method: 'POST',
      headers: {'Content-Type': appJson},
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        admin: adminState
      })
    });
    // TODO: need to show errors if they happen
    await loadPeople(setPeople);
  };

  const changeAdmin = id => async e => {
    e.preventDefault();
    await fetch(base + 'editPerson', {
      method: 'POST',
      headers: { 'Content-Type': appJson },
      body: JSON.stringify({id})
    });
    // TODO: need to show errors if they happen
    await loadPeople(setPeople);
  };



  //Function for button to delete a user

  const deletePerson = id => async e => {
    e.preventDefault();
    await fetch(base + 'deletePerson', {
      method: 'POST',
      headers: { 'Content-Type': appJson },
      body: JSON.stringify({id})
    });

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
          {people.map(({id, email, password, admin}) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{email}</td>
              <td>{password}</td>
              <td>{admin === true ? <p>ADMIN</p> : <p>PLEB</p>}</td>
              <td>
                {/* <input
                  type="checkbox"
                  checked={admin}
                  on={changeAdmin(id)}
                />  */}
                <button onClick={changeAdmin(id)}>Change</button>
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
