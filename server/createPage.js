import {query} from './query.js';
import {placeHolder} from './placeHolderPic.js';

//Book creator endpoint

export const createPage = async (req, res) => {
  if (!req.body)
    return res.status(406).send('What are you even trying to do here?');

  const {pageDes} = req.body;

  if (!pageDes) return res.status(406).send('Please enter a page description!');

  const [
    page_number
  ] = await query(
    `SELECT MAX("page_number") FROM pages_data WHERE book_id = $1`,
    [req.params.id]
  );

  const newPageNumber = page_number.max > 0 ? page_number.max + 1 : 1;

  const [
    result
  ] = await query(
    'INSERT INTO "pages_data"(page_description, page_number, book_id, page_image) VALUES ($1, $2, $3, $4) RETURNING *',
    [pageDes, newPageNumber, req.params.id, placeHolder]
  );

  res.json(result);
};
