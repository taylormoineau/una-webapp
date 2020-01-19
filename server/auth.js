const {wrapper} = require('./helpers/wrapper');
const {getPersonById} = require('./people');
const bcrypt = require('bcryptjs');

module.exports = wrapper(async (req, client) => {
  if (!req.cookies.authCookie) {
    return {status: 401, data: 'Not authorized'};
  }
  const [id, hash] = req.cookies.authCookie.split('|');
  if (hash && (await bcrypt.compare(process.env.SECRET + id, hash))) {
    req.user = await getPersonById(client, id);
    console.log(`${id} is authenticated.. yay!`);
    return {next: true};
  }
  return {clearCookie: 'authCookie', status: 401, data: `gtfo ${id}`};
});
