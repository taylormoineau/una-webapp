import {query} from './query.js';

//Book creator endpoint

export const createBook = async (req, res) => {
  if (!req.body)
    return res.status(406).send('What are you even trying to do here?');

  const {title, pageCount, language} = req.body;
  const {first_name, last_name, id} = req.user;

  const name = first_name + ' ' + last_name;

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

  const [
    result
  ] = await query(
    'INSERT INTO "books_data"(title, author, created_date, language, author_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [title, name, currentDate, language, id]
  );

  for (let i = 0; i < pageCount; i++) {
    await query(
      'INSERT INTO "pages_data"(page_description, page_number, book_id) VALUES ($1, $2, $3) RETURNING *',
      ['Add description here.', i, result.id]
    );
  }

  res.json(result);
};
