import {query} from './query.js';

export const getBook = async (req, res) => {
  res.json(await query('SELECT * FROM "book_data" ORDER BY title DESC', []));
};
