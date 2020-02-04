import React, {useState, useEffect} from 'react';
import './App.css';
import {loadData, sendJson} from './utils';
import {useParams} from 'react-router-dom';

export const Book = () => {
  const [bookState, setBookState] = useState();
  const [pages, setPages] = useState([]);
  const [error, setError] = useState('');
  const [titleState, setTitleState] = useState('');
  const [newPageDes, setNewPageDes] = useState('');
  const {id} = useParams();

  const changeTitle = async e => {
    e.preventDefault();
    const result = await sendJson('editBook/' + id, {
      newTitle: titleState
    });
    if (result.error) {
      setError(result.error);
    }
    await loadData('getOneBook/' + id, setBookState, setError);
    setTitleState('');
  };

  const createNewPage = async e => {
    e.preventDefault();
    const result = await sendJson('createPageInBook/' + id, {
      pageDes: newPageDes
    });
    if (result.error) {
      setError(result.error);
    }
    await loadData('getPagesForBook/' + id, setPages, setError);
  };

  const deletePage = id => async () => {
    await sendJson('deletePage', {id});
    //This can only be changed by administrators, so only server errors should be a problem here.
    await loadData('getPagesForBook/' + id, setPages, setError);
  };

  useEffect(() => {
    loadData('getOneBook/' + id, setBookState, setError);
    loadData('getPagesForBook/' + id, setPages, setError);
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
        {pages.map(({id, page_image, page_description, page_number}) => (
          <div key={id}>
            <img
              src={page_image}
              height="300px"
              alt={'Page number: ' + page_number}
            />
            <p>{page_description}</p>
            <button className="btn btn-danger btn-sm" onClick={deletePage(id)}>
              Delete Page
            </button>
          </div>
        ))}
      </div>
      <div>
        <h2>Create new Page below:</h2>
        <form onSubmit={createNewPage}>
          <label>Title:</label>
          <input
            type="text"
            value={newPageDes}
            onChange={e => setNewPageDes(e.target.value)}
          ></input>
          <button className="btn btn-success btn-lg">Create new page</button>
        </form>
      </div>
    </div>
  );
};
