import React, {useState, useEffect} from 'react';
import {loadData, sendJson, assocPath, swap} from '../utils';
import {useParams} from 'react-router-dom';
import {FileInput} from '../FileInput';
import {CreatePage} from './CreatePage';
import {EditTitle} from './EditTitle';

export const Book = () => {
  const [bookState, setBookState] = useState();
  const [pages, setPages] = useState([]);
  const [error, setError] = useState('');
  const [desTrigger, setDesTrigger] = useState(0);
  const {bookId} = useParams();

  const changeTitle = async newTitle => {
    const result = await sendJson('editBook/' + bookId, {newTitle});
    if (result.error) setError(result.error);
    await loadData('getOneBook/' + bookId, setBookState, setError);
  };

  const editPageOrder = async (index, dir) => {
    const ids = pages.map(p => p.id);
    swap(ids, index, dir);
    const result = await sendJson('editPageNumber', ids);
    if (result.error) setError(result.error);
    await loadData('getPagesForBook/' + bookId, setPages, setError);
  };

  const editPageDescription = async (des, id) => {
    const result = await sendJson('editPageDescription', {des, id});
    if (result.error) setError(result.error);
  };

  const createNewPage = async pageDes => {
    const result = await sendJson('createPageInBook/' + bookId, {pageDes});
    if (result.error) setError(result.error);
    await loadData('getPagesForBook/' + bookId, setPages, setError);
  };

  const deletePage = async id => {
    if (!window.confirm('Are you sure??????/?')) return;

    await sendJson('deletePage', {id});
    //This can only be changed by administrators, so only server errors should be a problem here.
    await loadData('getPagesForBook/' + bookId, setPages, setError);
  };

  const updateImage = async (data, id) => {
    const result = await sendJson('updateImage', {img: data, id});
    if (result.error) setError(result.error);
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
            <EditTitle onChangeTitle={changeTitle} />
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
            {desTrigger === id ? (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  page_description && editPageDescription(page_description, id);
                  setDesTrigger(0);
                }}
              >
                <input
                  value={page_description}
                  onChange={e =>
                    setPages(
                      assocPath([i, 'page_description'], e.target.value, pages)
                    )
                  }
                />
                <button type="submit">Update</button>
              </form>
            ) : (
              <p>{'Page ' + (page_number + 1) + ' : ' + page_description}</p>
            )}
            <button
              className="btn btn-warning btn-sm"
              onClick={() => setDesTrigger(id)}
            >
              Edit Description
            </button>
            <FileInput
              className="btn btn-info btn-sm"
              onChange={data =>
                setPages(
                  assocPath([i, 'page_image'], data, pages),
                  updateImage(data, id)
                )
              }
            />
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
                Move Up
              </button>
            )}
            {i < pages.length - 1 && (
              <button
                className="btn btn-info btn-sm"
                onClick={() => editPageOrder(i, 'down')}
              >
                Move Down
              </button>
            )}
          </div>
        ))}
      </div>
      <CreatePage onCreateNewPage={createNewPage} />
    </div>
  );
};
