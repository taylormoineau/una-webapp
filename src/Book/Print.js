import React, {useState, useEffect} from 'react';
import {loadData} from '../utils';
import {Link, useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import borderTemplate from './borderTemplate.png';
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
    <div className="printDiv">
      <h2>Print Preview of Book:</h2>
      <h3 style={{color: 'red'}}>{error}</h3>
      <div>
        {pages.map(({id, page_number, page_description, page_image}) => (
          <div key={id}>
            {page_number < 4 && (
              <div className="printDiv">
                <img src={borderTemplate} alt="template" className="template" />

                <p className="leftPageNumber">{page_number + 1}</p>

                <p className="leftText">{page_description}</p>

                <img
                  src={page_image}
                  className="leftImage"
                  alt={'Page number: ' + page_number}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
