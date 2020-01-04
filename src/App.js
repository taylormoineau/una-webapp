import React from 'react';
import logo from './logo.svg';
import './App.css';

const data = [{name: 'Whatever', age: 5}, {name: 'Johnny', age: 345}];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>Hello PuddinGlove</h1>

        <table>
          <thead>
            <th>Name:</th>
            <th>Age:</th>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
