const query = require('./query.js');
const bcrypt = require('bcryptjs');
const validator = require('email-validator');

module.exports = async (req, res) => {
  if (!req.body) {
    return res.status(406).json('What are you even trying to do here?');
  }

  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(406).json('Please enter information!');
  }

  if (!validator.validate(email)) {
    return res.status(406).json('This is not a valid email!');
  }

  // make sure they don't exist first
  const [user] = await query(`SELECT * FROM "users" WHERE email=$1`, [email]);
  if (user) {
    return res.status(401).json('User already exists!');
  }

  const hash = await bcrypt.hash(password, 10);

  await query(
    'INSERT INTO "users"(email, password, admin) VALUES ($1, $2, $3)',
    [email, hash, false]
  );

  res.json('Yay!');
};
