import React, {useState, useEffect} from 'react';
import './App.css';
import {loadJson} from './sendJson';
import {useParams} from 'react-router-dom';

const loadOneBook = async ({id}, onLoad, setError) => {
  const result = await loadJson('/getOneBook/' + id);
  if (result.error) {
    setError(result.error);
  } else {
    onLoad(result);
  }
};

export const Book = () => {
  const [bookState, setBookState] = useState([]);
  const [error, setError] = useState('');
  const id = useParams();

  useEffect(() => {
    loadOneBook(id, setBookState, setError);
  }, []);

  return (
    <div className="container">
      <div className="container-fluid">
        <button type="button" className="btn btn-outline-success btn-lg">
          Save Changes
        </button>
        <button type="button" className="btn btn-outline-primary btn-lg">
          Revert Changes
        </button>
        <button type="button" className="btn btn-outline-warning btn-lg">
          Go back
        </button>
      </div>

      <h2>Edit Book Details:</h2>

      <h3 style={{color: 'red'}}>{error}</h3>
      <div className="container">
        {bookState.map(
          ({
            id,
            title,
            created_by_user,
            created_date,
            edited_by_user,
            edited_date
          }) => (
            <div key={id}>
              <form>
                <h1>Unique id:</h1>
                <h2>{id}</h2>
                <h1>Title:</h1>
                <h2>{title}</h2>
                <h1>Author:</h1>
                <h2>{created_by_user}</h2>
                <h1>Created_date:</h1>
                <h2>{created_date}</h2>
                <h1>Last Edited by:</h1>
                <h2>{edited_by_user}</h2>
                <h1>Last Edited_date:</h1>
                <h2>{edited_date}</h2>
              </form>
            </div>
          )
        )}
      </div>
    </div>
  );
};
