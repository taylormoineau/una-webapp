import {query} from './query.js';

//Book creator endpoint

export const createPage = async (req, res) => {
  if (!req.body)
    return res.status(406).send('What are you even trying to do here?');

  const {pageDes} = req.body;

  if (!pageDes) return res.status(406).send('Please enter a page description!');

  let newNumber = 1;
  // Figure out next page number
  const [pageNumber] = await query(
    `SELECT page_number FROM "pages_data" ORDER by page_number DESC LIMIT 1`
  );
  if (pageNumber) newNumber = page_number + 1;

  const [
    result
  ] = await query(
    'INSERT INTO "pages_data"(page_description, page_number, book_id) VALUES ($1, $2, $3) RETURNING *',
    [pageDes, newNumber, req.params.id]
  );

  res.json(result);
};
