import bcrypt from 'bcryptjs';
import validator from 'email-validator';
import {query} from './query.js';
import {setAuthCookie} from './login.js';

export const addPerson = async (req, res) => {
  if (!req.body)
    return res.status(406).send('What are you even trying to do here?');

  const {email, password} = req.body;

  if (!email || !password)
    return res.status(406).send('Please enter information!');

  if (!validator.validate(email))
    return res.status(406).send('This is not a valid email!');

  // make sure they don't exist first
  const [user] = await query(`SELECT * FROM "users" WHERE email=$1`, [email]);
  if (user) return res.status(401).send('User already exists!');

  const hash = await bcrypt.hash(password, 10);

  const [
    newUser
  ] = await query(
    'INSERT INTO "users"(email, password, admin) VALUES ($1, $2, $3) RETURNING *',
    [email, hash, false]
  );
  console.log(newUser);

  await setAuthCookie(res, newUser);

  res.json('Yay!');
};
