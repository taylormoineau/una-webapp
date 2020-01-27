import React, {useState, useEffect} from 'react';
import './App.css';
import {sendJson, loadJson} from './sendJson';

const loadBook = async (onLoad, setError) => {
  const result = await loadJson('getBook');
  if (result.error) {
    setError(result.error);
  } else {
    onLoad(result);
  }
};

export const CreateBookPage = () => {
  const [titleState, setTitleState] = useState('');
  const [userState, setUserState] = useState('');
  const [bookState, setBookState] = useState([]);
  const [error, setError] = useState('');

  //function to submit request to create new user.
  const submitNewBook = async e => {
    e.preventDefault();
    const result = await sendJson('createBook', {
      title: titleState,
      createdByUser: userState
    });
    if (result.error) {
      setError(result.error);
    }
    await loadBook(setBookState, setError);
  };

  useEffect(() => {
    loadBook(setBookState, setError);
  }, []);

  return (
    <div className="container">
      <h2>Create New Book Here:</h2>
      <form onSubmit={submitNewBook}>
        Book Title:{' '}
        <input
          value={titleState}
          type="text"
          onChange={e => setTitleState(e.target.value)}
        />
        <br />
        Created_by_user{' '}
        <input
          type="text"
          value={userState}
          onChange={e => setUserState(e.target.value)}
        />
        <br name="my third most favorite line break" />
        <button>Create book!</button>
      </form>
      <h3 style={{color: 'red'}}>{error}</h3>
      <h1>LIST NEW BOOKS BELOW</h1>
      <div className="container">
        <h1>New Book Table (using admin table for testing)</h1>
        <table className="table table-condensed">
          <thead>
            <tr>
              <th>Unique id:</th>
              <th>Title:</th>
              <th>Author:</th>
              <th>Created_date:</th>
              <th>Last Edited by:</th>
              <th>Last Edited_date:</th>
            </tr>
          </thead>
          <tbody>
            {bookState.map(
              ({
                id,
                title,
                created_by_user,
                created_date,
                edited_by_user,
                edited_date
              }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>{created_by_user}</td>
                  <td>{created_date}</td>
                  <td>{edited_by_user}</td>
                  <td>{edited_date}</td>
                </tr>
              )
            )}
          </tbody>
        </table>

        <h3 style={{color: 'red'}}>{error}</h3>
      </div>
    </div>
  );
};
