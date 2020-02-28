import {query} from './query.js';

export const editPerson = async (req, res) => {
  if (!req.body)
    return res.status(406).json('What are you even trying to do here?');

  await query('UPDATE "users" SET admin = NOT admin WHERE id = $1', [
    req.body.id
  ]);
  return res.json('Yay!');
};

export const updateInfo = async (req, res) => {
  if (!req.body)
    return res.status(406).json('What are you even trying to do here?');

  const {email, firstName, lastName, city, country} = req.body;
  const userId = req.user.id;

  await query(
    'UPDATE users SET (email, first_name, last_name, city, country) = ($1, $2, $3, $4, $5) WHERE id = $6',
    [email, firstName, lastName, city, country, userId]
  );
  return res.json('Updated user info successfully!');
};
