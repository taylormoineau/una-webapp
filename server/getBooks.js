//NOTE: Maybe I should rename this to bookQueries or something in the future. Holds all book queries.

import {query} from './query.js';

export const getAllBooks = async (req, res) => {
  if (req.params.id === 'all') {
    res.json(await query('SELECT * FROM "books_data" ORDER BY title ASC', []));
  } else {
    res.json(
      await query(
        'SELECT * FROM "books_data" WHERE author_id=$1 ORDER BY title ASC',
        [req.params.id]
      )
    );
  }
};

export const getOneBook = async (req, res) => {
  const [result] = await query('SELECT * FROM "books_data" WHERE id=$1', [
    req.params.id
  ]);
  if (!result) res.status(404).send('Book not found.');
  else res.json(result);
};
