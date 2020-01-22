import bcrypt from 'bcryptjs';
import {query} from './query.js';

export const checkAuth = async (req, res) => {
  //   if (!req.cookies.authCookie) return res.status(401).json('Not authorized!');
  const [id, hash] = req.cookies.authCookie.split('|');
  if (hash && (await bcrypt.compare(process.env.SECRET + id, hash))) {
    const user = (await query(`SELECT * FROM "users" WHERE id=$1`, [id]))[0];
    if (user) {
      req.user = user;
      console.log(`${id} checkAuth authenticated... so wheres the data?`);
      return res.json(user);
    }
  }
  res
    .clearCookie('authCookie')
    .status(401)
    .json(`gtfo ${id}`);
};
