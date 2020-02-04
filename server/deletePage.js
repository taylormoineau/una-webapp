import {query} from './query.js';

export const deletePage = async (req, res) => {
  if (!req.body)
    return res.status(406).send('What are you even trying to do here?');

  if (!req.user.admin)
    return res.status(403).send('u are not admin. u cannot delete pagez.');

  await query('DELETE FROM "pages_data" WHERE id = $1', [req.body.id]);
  res.json('Page deleted!');
};
