import React, {useState, useEffect} from 'react';
import {loadData} from '../utils';
import {Link, useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import templatePageRight from './templatePageRight.png';
import templatePageLeft from './templatePageLeft.png';
import './print.css';

export const PrintFinal = () => {
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
    <div className="printDivPRINT">
      <h2>Print Preview of Book:</h2>
      <h3 style={{color: 'red'}}>{error}</h3>
      <div className="templateDivLeftPRINT">
        {pages.map(({id, page_number, page_description, page_image}) => (
          <div key={id}>
            {page_number < 4 && (
              <div className="printDivPRINT">
                <img
                  src={templatePageLeft}
                  alt="template"
                  className="backgroundPRINT"
                />

                <p className="leftPageNumberPRINT">{page_number + 1}</p>

                <p className="leftTextPRINT">{page_description}</p>

                <img
                  src={page_image}
                  className="leftImagePRINT"
                  alt={'Page number: ' + page_number}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="templateDivRightPRINT">
        {pages.map(({id, page_number, page_description, page_image}) => (
          <div key={id}>
            {page_number < 4 && (
              <div className="printDivPRINT">
                <img
                  src={templatePageRight}
                  alt="template"
                  className="backgroundPRINT"
                />

                <p className="rightPageNumberPRINT">{page_number + 1}</p>

                <p className="rightTextPRINT">{page_description}</p>

                <img
                  src={page_image}
                  className="rightImagePRINT"
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

// : (
//   <div>
//     <p className="rightPageNumber">{page_number + 1}</p>

//     <p className="rightText">{page_description}</p>

//     <img
//       src={page_image}
//       className="rightImage"
//       alt={'Page number: ' + page_number}
//     />
//   </div>
// )
