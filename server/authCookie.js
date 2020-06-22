import bcrypt from 'bcryptjs';
import {query} from './query.js';

export const authCookie = async (req, res, next) => {
  if (req.cookies.authCookie) {
    const [id, hash] = req.cookies.authCookie.split('|');
    if (
      /^\d+$/.test(id) &&
      hash &&
      (await bcrypt.compare(process.env.SECRET + id, hash))
    ) {
      const [user] = await query(`SELECT * FROM "users" WHERE id=$1`, [id]);
      if (user) {
        console.log(`${id} is authenticated.. yay!`);
        req.user = user;
      } else res.clearCookie('authCookie');
    } else res.clearCookie('authCookie');
  }
  next();
};

export const loggedInOnly = (req, res, next) => {
  if (req.user) next();
  else res.status(401).send('Unauthorized');
};

export const adminsOnly = (req, res, next) => {
  if (req.user && req.user.admin) next();
  else res.status(401).send('Admins only');
};

export const masterOnly = (req, res, next) => {
  if (req.user && req.user.master_admin) next();
  else res.status(401).send('Admins only');
};
