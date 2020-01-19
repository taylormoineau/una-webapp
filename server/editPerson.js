import {query} from './query.js';

export const editPerson = async (req, res) => {
  if (!req.body) {
    return res.status(406).json('What are you even trying to do here?');
  }
  await query('UPDATE "users" SET admin = NOT admin WHERE id = $1', [
    req.body.id
  ]);
  return res.json('Yay!');
};
