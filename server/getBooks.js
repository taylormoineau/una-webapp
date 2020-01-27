//NOTE: Maybe I should rename this to bookQueries or something in the future. Holds all book queries.

import {query} from './query.js';

export const getAllBooks = async (req, res) => {
  res.json(await query('SELECT * FROM "books_data" ORDER BY title ASC', []));
};

export const getOneBook = async (req, res) => {
  res.json(
    await query('SELECT * FROM "books_data" WHERE id=$1', [req.body.id])
  );
};
