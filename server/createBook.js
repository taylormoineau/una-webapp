import {query} from './query.js';

//Book creator endpoint

export const createBook = async (req, res) => {
  if (!req.body)
    return res.status(406).send('What are you even trying to do here?');

  const {title, pageCount, language, idToCopy} = req.body;
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

export const createCopy = async (req, res) => {
  if (!req.body)
    return res.status(406).send('What are you even trying to do here?');

  const {title, pageCount, language, idToCopy} = req.body;
  const {first_name, last_name, id} = req.user;

  const name = first_name + ' ' + last_name;

  if (!title) return res.status(406).send('Please enter a book title!');

  const titleOfCopy = title + ' ' + language;

  // make sure they don't exist first
  const [bookCheck] = await query(`SELECT * FROM "books_data" WHERE title=$1`, [
    titleOfCopy
  ]);
  if (bookCheck)
    return res
      .status(401)
      .send(
        'A copy of this book already exists in the selected language. Either edit that one, or alter the name of this project.'
      );
  const currentDate = new Date();

  const [
    result
  ] = await query(
    'INSERT INTO "books_data"(title, author, created_date, language, author_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [title, name, currentDate, language, id]
  );

  const oldBook = await query(`SELECT * FROM "books_data" WHERE title=$1`, [
    idToCopy
  ]);

//I need to figure out how to select the pictures, text out of one column and put it in a different column of a new row.

  for (let i = 0; i < pageCount; i++) {
    await query(
      'INSERT INTO "pages_data"(page_description, page_number, book_id, original_text) VALUES ($1, $2, $3)',
      ['Add translation here.', i, result.id]
    );

    for (let i = 0; i < pageCount; i++) {
      await query(
        'INSERT INTO "pages_data"(page_image, origin_text) WHERE id=$1 SELECT(page_image, page_description) FROM "pages_data" ($1, $2) FROM "pages_data" WHERE id=$2 RETURNING *',
        [id, idToCopy, i, result.id]
      );
  }

  res.json(result);
};
