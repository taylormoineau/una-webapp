import React, {useState, useEffect} from 'react';
import './App.css';
import {loadData, sendJson} from './utils';
import {useParams} from 'react-router-dom';

export const Book = () => {
  const [bookState, setBookState] = useState();
  const [error, setError] = useState('');
  const [titleState, setTitleState] = useState('');
  const {id} = useParams();

  const changeTitle = async e => {
    e.preventDefault();
    const result = await sendJson('editBook', {
      newTitle: titleState,
      id
    });
    if (result.error) {
      setError(result.error);
    }
    await loadData('getOneBook/' + id, setBookState, setError);
    setTitleState('');
  };

  useEffect(() => {
    loadData('getOneBook/' + id, setBookState, setError);
  }, [id]);

  return (
    <div className="container">
      <h2>Edit Book Details:</h2>

      <h3 style={{color: 'red'}}>{error}</h3>
      <div className="container">
        {bookState ? (
          <div key={id}>
            <h1>Unique id:</h1>
            <h2>{id}</h2>
            <h1>Title:</h1>
            <h2>{bookState.title}</h2>
            <form onSubmit={changeTitle}>
              Edit title:{' '}
              <input
                value={titleState}
                type="text"
                onChange={e => setTitleState(e.target.value)}
              />
              <button>Update title</button>
            </form>

            <h1>Author:</h1>
            <h2>{bookState.created_by_user}</h2>
            <h1>Created_date:</h1>
            <h2>{bookState.created_date}</h2>
            <h1>Last Edited by:</h1>
            <h2>{bookState.edited_by_user}</h2>
            <h1>Last Edited_date:</h1>
            <h2>{bookState.edited_date}</h2>
          </div>
        ) : (
          <h1>LOADING BOOK</h1>
        )}
      </div>
    </div>
  );
};
