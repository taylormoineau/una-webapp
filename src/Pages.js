import React, {useState, useEffect} from 'react';
import './App.css';
import {loadData, sendJson} from './utils';
import {useParams} from 'react-router-dom';

export const Pages = () => {
  const [page, setPage] = useState();
  const [description, setDescription] = useState();
  let [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState('');
  const {id} = useParams();

  const changeDescription = async e => {
    e.preventDefault();
    const result = await sendJson('editPage', {
      description,
      id
    });
    if (result.error) {
      setError(result.error);
    }
    await loadData('getOneBook/' + id, setPage, setError);
    setDescription('');
  };

  useEffect(() => {
    loadData('loadOnePage/' + id + '/' + pageNumber, setPage, setError);
  }, []);

  return (
    <div className="container">
      <h2>Info of page</h2>

      <h3 style={{color: 'red'}}>{error}</h3>
      <div className="container">
        {page ? (
          <div key={id}>
            <h1>Unique id:</h1>
            <h2>{id}</h2>
            <h1>Page Description:</h1>
            <h2>{page.page_description}</h2>
            <form onSubmit={changeDescription}>
              Edit Description:{' '}
              <input
                value={description}
                type="text"
                onChange={e => setDescription(e.target.value)}
              />
              <button>Update title</button>
            </form>

            <h1>Page Number:</h1>
            <h2>{page.page_number}</h2>
            <button onClick={setPageNumber(pageNumber + 1)}>Next Page</button>
            <button onClick={setPageNumber(pageNumber - 1)}>Prev Page</button>
            <h1>Image:</h1>
            <h2>{page.page_image}</h2>
          </div>
        ) : (
          <h1>LOADING PAGE</h1>
        )}
      </div>
    </div>
  );
};
