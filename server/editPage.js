import {query} from './query.js';

export const editPageNumber = async (req, res) => {
  if (!req.body)
    return res.status(406).json('What are you even trying to do here?');

  const [
    maxPageNumber
  ] = await query(
    `SELECT MAX("page_number") FROM pages_data WHERE book_id = $1`,
    [req.params.id]
  );

  const movingNumber = await query(
    `SELECT page_number FROM pages_data WHERE page_id = $1`,
    [req.params.pageId]
  );
  if (req.body.dir === 'down') {
    if (newPageNumber <= 0) {
      return res.json('Error: Page Number cannot be less than 1');
    } else {
      await query(
        'UPDATE "pages_data" SET page_number=$1, WHERE id = $2',
        [movingNumber - 1, req.body.pageId],
        'UPDATE "pages_data" SET page_number=$1, WHERE id = $2',
        [movingNumber - 1, req.body.pageId]
      );
      return res.json('Book updated!');
    }
  }

  if (req.body.dir === 'up') {
    if (newPageNumber >= maxPageNumber.max)
      return res.json('Error: This is already the highest page.');
  }

  // const newPageNumber = req.body.dir === 'down' ? pageNumber - 1 : pageNumber + 1

  const [
    numberToChange
  ] = await query(`SELECT id FROM pages_data WHERE page_number = $1`, [
    req.body.pageId
  ]);
};
