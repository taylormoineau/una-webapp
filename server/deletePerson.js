import {query} from './query.js';

export const deletePerson = async (req, res) => {
  if (!req.body)
    return res.status(406).send('What are you even trying to do here?');

  await query('DELETE FROM "users" WHERE id = $1', [req.body.id]);
  res.json('Yay!');
};
