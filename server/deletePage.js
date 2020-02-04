import {query} from './query.js';

export const deletePage = async (req, res) => {
  if (!req.body)
    return res.status(406).send('What are you even trying to do here?');

  if (!req.user.admin)
    return res.status(403).send('u are not admin. u cannot delete pagez.');

  await query(
    'DELETE FROM "pages_data" WHERE book_id = $1 AND page_number = $2',
    [req.body.id, req.body.pageNum]
  );
  res.json('Page deleted!');
};
