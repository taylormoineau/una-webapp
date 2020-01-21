import bcrypt from 'bcryptjs';
import {query} from './query.js';

export const login = async (req, res) => {
  if (!req.body)
    return res.status(406).json('What are you even trying to do here?');

  const {email, password} = req.body;

  if (!email || !password)
    return res.status(406).json('Please enter information!');

  const [user] = await query(`SELECT * FROM "users" WHERE email=$1`, [email]);
  if (!user) return res.status(401).json('User does not exist');

  if (await bcrypt.compare(password, user.password))
    return res
      .cookie(
        'authCookie',
        user.id + '|' + (await bcrypt.hash(process.env.SECRET + user.id, 10)),
        {maxAge: 365 * 24 * 3600 * 1000}
      )
      .json('successful login');

  return res.status(403).json('Wrong password');
};
