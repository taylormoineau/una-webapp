import React, {useState, useEffect} from 'react';
import './App.css';
import {sendJson, loadJson} from './sendJson';
import {Link} from 'react-router-dom';

const loadAllBooks = async (onLoad, setError) => {
  const result = await loadJson('getAllBooks');
  if (result.error) {
    setError(result.error);
  } else {
    onLoad(result);
  }
};

export const CreateBookPage = () => {
  const [titleState, setTitleState] = useState('');
  const [booksState, setBooksState] = useState([]);
  const [error, setError] = useState('');

  //function to submit request to create new user.
  const submitNewBook = async e => {
    e.preventDefault();
    const result = await sendJson('createBook', {
      title: titleState
    });
    if (result.error) {
      setError(result.error);
    }
    await loadAllBooks(setBooksState, setError);
  };

  const deleteBook = id => async () => {
    await sendJson('deleteBook', {id});
    //This can only be changed by administrators, so only server errors should be a problem here.
    await loadAllBooks(setBooksState, setError);
  };

  useEffect(() => {
    loadAllBooks(setBooksState, setError);
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
              <th>Edit?</th>
              <th>Delete?</th>
            </tr>
          </thead>
          <tbody>
            {booksState.map(
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
                  {/* Note for later: Make book ID something random and interesting, not just 1, 2, 3 etc. */}
                  <td>
                    <Link to={'/book/' + id} id={id}>
                      {title}
                    </Link>
                  </td>
                  <td>{created_by_user}</td>
                  <td>{created_date}</td>
                  <td>{edited_by_user}</td>
                  <td>{edited_date}</td>
                  <td>
                    <button className="btn btn-success btn-sm">Edit</button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={deleteBook(id)}
                    >
                      Delete
                    </button>
                  </td>
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
