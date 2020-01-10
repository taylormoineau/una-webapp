import React, {useEffect, useState} from 'react';
// import './App.css';

const base = 'http://localhost:3001/';

const loadPeople = async onLoad => {
  const response = await fetch(base + 'people');
  onLoad(await response.json());
};

const App = () => {
  const [people, setPeople] = useState([]);

  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const submitNewUser = async e => {
    e.preventDefault();
    await fetch(base + 'addPerson', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
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
          </tr>
        </thead>
        <tbody>
          {people.map(({id, email, password}) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{email}</td>
              <td>{password}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={submitNewUser}>
        New email: <input type="text" ref={emailRef} />
        <br />
        Password: <input type="password" ref={passwordRef} />
        <br />
        <button>Add User</button>
      </form>
    </div>
  );
};

export default App;
