import {query} from './query.js';

export const editBook = async (req, res) => {
  if (!req.body)
    return res.status(406).json('What are you even trying to do here?');

  //Need to destructure the update query params

  await query('UPDATE "books_data" SET title = $1 WHERE id = $2', [
    req.body.newTitle,
    req.body.id
  ]);
  return res.json('Book updated!');
};
