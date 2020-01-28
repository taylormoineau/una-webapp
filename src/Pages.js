import React, {useState, useEffect} from 'react';
import './App.css';
import {loadJson, sendJson} from './sendJson';
import {useParams} from 'react-router-dom';

const loadOnePage = async (id, onLoad, setError) => {
  const result = await loadJson('/getOnePage/' + id);
  if (result.error) {
    setError(result.error);
  } else {
    onLoad(result);
  }
};

export const Pages = () => {
  const [pageNumber, setPageNumber] = useState('');
  const [error, setError] = useState('');
  const {id} = useParams();

  // This is breaking the server. Need to figure out why.
  // const changeTitle = async () => {
  //   const result = await sendJson('editBook', {
  //     newTitle: titleState,
  //     id
  //   });
  //   if (result.error) {
  //     setError(result.error);
  //   }
  //   await loadOneBook(id, setBookState, setError);
  //   setTitleState('');
  // };

  useEffect(() => {
    loadOnePage(id, setBookState, setError);
  }, []);

  return (
    <div className="container">
      <h2>Info of page</h2>

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
              <form>
                Edit title:{' '}
                <input
                  value={titleState}
                  type="text"
                  onChange={e => setTitleState(e.target.value)}
                />
                <button>Update title</button>
              </form>

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
