import React, {useState, useEffect} from 'react';
import './App.css';
import {sendJson} from './sendJson';

export const Book = ({id}) => {
  const [bookState, setBookState] = useState([]);
  const [error, setError] = useState('');

  const loadOneBook = async (id, onLoad, setError) => {
    const result = await sendJson('getOneBook', {
      id
    });
    if (result.error) {
      setError(result.error);
    } else {
      onLoad(result);
    }
  };

  useEffect(() => {
    loadOneBook(setBookState, setError);
  }, []);

  return (
    <div className="container">
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
            </div>
          )
        )}
      </div>
    </div>
  );
};
