const {wrapper} = require('./helpers/wrapper.js');

// req.query is like $_GET
// req.body is like $_POST
// req.cookies is like $_COOKIES

const getAllPeople = async client => {
  const {rows} = await client.query('SELECT * FROM "Dootman"', []);
  return rows;
};

// this is a higher order function that takes a field name (string) and returns
// a function for getting people based on that field name
const getPerson = field => async (client, id) => {
  const {rows} = await client.query(
    `SELECT * FROM "Dootman" WHERE ${field}=$1`,
    [id]
  );
  return rows[0];
};

const getPersonById = getPerson('id');
const getPersonByEmail = getPerson('email');

module.exports = wrapper(async (req, client) => {
  if (req.query.id) {
    return await getPersonById(client, req.query.id);
  } else if (req.query.email) {
    return await getPersonByEmail(client, req.query.email);
  } else {
    return await getAllPeople(client);
  }
});

module.exports.getPerson = getPerson;
module.exports.getPersonById = getPersonById;
module.exports.getPersonByEmail = getPersonByEmail;
