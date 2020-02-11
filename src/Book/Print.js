import React, {useState, useEffect} from 'react';
import {loadData} from '../utils';
import {Link, useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import templatePage from './templatePage.png';
import './print.css';

export const Print = () => {
  const [pages, setPages] = useState([]);
  const [bookState, setBookState] = useState([]);
  const [printFail, setPrintFail] = useState(false);
  const [error, setError] = useState('');
  const {bookId} = useParams();

  useEffect(() => {
    loadData('getOneBook/' + bookId, setBookState, setError);
    loadData('getPagesForBook/' + bookId, setPages, setError);
  }, [bookId]);

  return (
    <div className="container">
      <h2>Print Preview of Book:</h2>
      <h3 style={{color: 'red'}}>{error}</h3>
      {pages.map(({id, page_number, page_description, page_image}) => (
        <div key={id}>
          {page_number < 4 ? (
            <div className="printDiv">
              <img src={templatePage} alt="template" className="template" />

              <p className="leftPageNumber">{page_number + 1}</p>

              <p className="leftText">{page_description}</p>

              <img
                src={page_image}
                className="leftImage"
                alt={'Page number: ' + page_number}
              />
            </div>
          ) : (
            <div>
              <p className="rightPageNumber">{page_number + 1}</p>

              <p className="rightText">{page_description}</p>

              <img
                src={page_image}
                className="rightImage"
                alt={'Page number: ' + page_number}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
