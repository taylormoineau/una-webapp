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

  const {user_photo, email, first_name, last_name, city, country} = req.body;
  const userId = req.user.id;

  await query(
    'UPDATE users SET (user_photo, email, first_name, last_name, city, country, initial_info) = ($1, $2, $3, $4, $5, $6, $7) WHERE id = $8',
    [user_photo, email, first_name, last_name, city, country, false, userId]
  );
  return res.json('Updated user info successfully!');
};
