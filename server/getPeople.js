import {query} from './query.js';

export const getPeople = async (req, res) => {
  res.json(await query('SELECT * FROM "users" ORDER BY id ASC', []));
};

export const getUser = async (req, res) => {
  const [result] = await query('SELECT * FROM "users" WHERE id=$1', [
    req.params.id
  ]);

  if (!result) res.status(404).send('User does not exist!');
  else res.json(result);
};
