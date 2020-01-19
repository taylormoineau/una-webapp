const query = require('./query.js');

module.exports = async (req, res) => {
  res.json(await query('SELECT * FROM "users" ORDER BY id ASC', []));
};
