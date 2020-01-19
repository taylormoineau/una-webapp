const query = require('./query.js');

module.exports = async (req, res) => {
  if (!req.body) {
    return res.status(406).json('What are you even trying to do here?');
  }
  await query('DELETE FROM "users" WHERE id = $1', [req.body.id]);
  res.json('Yay!');
};
