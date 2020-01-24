import bcrypt from 'bcryptjs';
import {query} from './query.js';

export const setAuthCookie = async (res, user) => {
  res.cookie(
    'authCookie',
    user.id + '|' + (await bcrypt.hash(process.env.SECRET + user.id, 10)),
    {maxAge: 365 * 24 * 3600 * 1000}
  );
};

export const login = async (req, res) => {
  if (!req.body)
    return res.status(406).send('What are you even trying to do here?');

  const {email, password} = req.body;

  if (!email || !password)
    return res.status(406).send('Please enter information!');

  const [user] = await query(`SELECT * FROM "users" WHERE email=$1`, [email]);
  if (!user)
    return res
      .status(401)
      .send(
        'Incorrect combination of username and/or/or password or maybe you just.. just stop. please.'
      );

  if (await bcrypt.compare(password, user.password)) {
    await setAuthCookie(res, user);
    return res.json('successful login');
  }

  return res
    .status(403)
    .send(
      'Incorrect combination of username and/or/or password or maybe you just.. just go home.'
    );
};
