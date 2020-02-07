import React, {useState, useEffect} from 'react';
import './App.css';
import {loadData, sendJson, assocPath} from './utils';
import {useParams} from 'react-router-dom';
import {FileInput} from './FileInput';

const swap = (arr, index, dir) => {
  const otherIndex = dir === 'down' ? index + 1 : index - 1;
  [arr[index], arr[otherIndex]] = [arr[otherIndex], arr[index]];
};

export const Book = () => {
  const [bookState, setBookState] = useState();
  const [pages, setPages] = useState([]);
  const [error, setError] = useState('');
  const [titleState, setTitleState] = useState('');
  const [newPageDes, setNewPageDes] = useState('');
  const {bookId} = useParams();

  const changeTitle = async e => {
    e.preventDefault();
    const result = await sendJson('editBook/' + bookId, {
      newTitle: titleState
    });
    if (result.error) {
      setError(result.error);
    }
    await loadData('getOneBook/' + bookId, setBookState, setError);
    setTitleState('');
  };

  const editPageOrder = async (index, dir) => {
    const ids = pages.map(p => p.id);
    swap(ids, index, dir);

    const result = await sendJson('editPageNumber', ids);
    if (result.error) {
      setError(result.error);
    }
    await loadData('getPagesForBook/' + bookId, setPages, setError);
  };

  const createNewPage = async e => {
    e.preventDefault();
    const result = await sendJson('createPageInBook/' + bookId, {
      pageDes: newPageDes
    });
    if (result.error) {
      setError(result.error);
    }
    await loadData('getPagesForBook/' + bookId, setPages, setError);
  };

  const deletePage = async id => {
    if (!window.confirm('Are you sure??????/?')) return;

    await sendJson('deletePage', {id});
    //This can only be changed by administrators, so only server errors should be a problem here.
    await loadData('getPagesForBook/' + bookId, setPages, setError);
  };

  useEffect(() => {
    loadData('getOneBook/' + bookId, setBookState, setError);
    loadData('getPagesForBook/' + bookId, setPages, setError);
  }, [bookId]);

  return (
    <div className="container">
      <h2>Edit Book Details:</h2>

      <h3 style={{color: 'red'}}>{error}</h3>
      <div className="container">
        {bookState ? (
          <div key={bookId}>
            <h1>Unique id:</h1>
            <h2>{bookId}</h2>
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
        {pages.map(({id, page_image, page_description, page_number}, i) => (
          <div key={id}>
            {page_image ? (
              <img
                src={page_image}
                height="300px"
                alt={'Page number: ' + page_number}
              />
            ) : (
              <h3>No image</h3>
            )}
            <FileInput
              onChange={data =>
                setPages(assocPath([i, 'page_image'], data, pages))
              }
            />
            <p>{page_description}</p>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deletePage(id)}
            >
              Delete Page
            </button>
            {i > 0 && (
              <button
                className="btn btn-info btn-sm"
                onClick={() => editPageOrder(i, 'up')}
              >
                UP
              </button>
            )}

            {i < pages.length - 1 && (
              <button
                className="btn btn-info btn-sm"
                onClick={() => editPageOrder(i, 'down')}
              >
                DN
              </button>
            )}
          </div>
        ))}
      </div>
      <div>
        <h2>Create new Page below:</h2>
        <form onSubmit={createNewPage}>
          <label>
            Title:
            <input
              type="text"
              value={newPageDes}
              onChange={e => setNewPageDes(e.target.value)}
            />
          </label>
          <button className="btn btn-success btn-lg">Create new page</button>
        </form>
      </div>
    </div>
  );
};
