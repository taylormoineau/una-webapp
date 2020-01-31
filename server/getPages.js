import {query} from './query.js';

export const getAllPages = async (req, res) => {
  res.json(
    await query('SELECT * FROM "pages_data" WHERE book_id=$1', [req.params.id])
  );
};
