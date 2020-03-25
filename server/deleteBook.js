import {query} from './query.js';

export const deleteBook = async (req, res) => {
  if (!req.body)
    return res.status(406).send('What are you even trying to do here?');

  //Right now this entire function is blocked behind admin privalages in index.js
  //Later I will make it so an admin can delete anything, but regular users can only delete books
  //with no pages. See below.
  if (!req.user.admin)
    return res
      .status(403)
      .send('u are not admin. u cannot delete bewks that hev pagez.');

  await query('DELETE FROM "books_data" WHERE id = $1', [req.body.id]);
  await query('DELETE FROM "pages_data" WHERE book_id = $1', [req.body.id]);
  res.json(`Book with id ${req.body.id} deleted!`);
};
