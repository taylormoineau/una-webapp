import {query} from './query.js';

export const editBook = async (req, res) => {
  if (!req.body || !req.body.newTitle)
    return res.status(406).json('What are you even trying to do here?');

  //Need to destructure the update query params
  const [book] = await query(`SELECT * FROM "books_data" WHERE title=$1`, [
    req.body.newTitle
  ]);
  if (book)
    return res
      .status(401)
      .send('This book title is already used! Please be more creative!');

  await query(
    'UPDATE "books_data" SET title=$1, edited_by_user=$2, edited_date=$3 WHERE id = $4',
    [req.body.newTitle, req.user.email, new Date(), req.params.id]
  );
  return res.json('Book updated!');
};
