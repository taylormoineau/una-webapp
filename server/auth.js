const query = require('./query.js');
const bcrypt = require('bcryptjs');

module.exports = async (req, res, next) => {
  if (!req.cookies.authCookie) {
    res.status(401).json('Not authorized!');
    return;
  }

  const [id, hash] = req.cookies.authCookie.split('|');
  if (hash && (await bcrypt.compare(process.env.SECRET + id, hash))) {
    const user = (await query(`SELECT * FROM "users" WHERE id=$1`, [id]))[0];
    if (user) {
      req.user = user;
      console.log(`${id} is authenticated.. yay!`);
      return next();
    }
  }
  res
    .clearCookie('authCookie')
    .status(401)
    .json(`gtfo ${id}`);
};

module.exports.adminsOnly = (req, res, next) => {
  if (req.user && req.user.admin) next();
  else res.status(401).send('Admins only');
};
