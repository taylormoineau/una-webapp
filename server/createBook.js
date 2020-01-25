import {query} from './query.js';

//Book creator endpoint

export const createBook = async (req, res) => {
  if (!req.body)
    return res.status(406).send('What are you even trying to do here?');

  const {title, createdByUser} = req.body;

  if (!title) return res.status(406).send('Please enter a book title!');

  // make sure they don't exist first
  const [book] = await query(`SELECT * FROM "books_data" WHERE title=$1`, [
    title
  ]);
  if (book)
    return res
      .status(401)
      .send('This book title is already used! Please be more creative!');
  const currentDate = new Date();
  await query(
    'INSERT INTO "books_data"(title, created_by_user, created_date) VALUES ($1, $2, $3) RETURNING *',
    [title, createdByUser, currentDate]
  );

  res.json('Book created!');
};
