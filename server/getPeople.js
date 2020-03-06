import {query} from './query.js';

export const getPeople = async (req, res) => {
  res.json(await query('SELECT * FROM "users" ORDER BY id ASC', []));
};

export const getUser = async (req, res) => {
  res.json(await query('SELECT * FROM "users" WHERE id = $1', [req.params.id]));
};
