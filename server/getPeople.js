import {query} from './query.js';

export const getPeople = async (req, res) => {
  res.json(await query('SELECT * FROM "users" ORDER BY id ASC', []));
};
