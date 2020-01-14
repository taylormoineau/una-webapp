const {wrapper} = require('./helpers/wrapper.js');

// req.query is like $_GET
// req.body is like $_POST
// req.cookies is like $_COOKIES

const getAllPeople = async client => {
  const { rows } = await client.query('SELECT * FROM "Dootman" ORDER BY id ASC', []);
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

const addPerson = async (client, email, password, admin) => {
  const result = await client.query(
    'INSERT INTO "Dootman"(id, email, password, admin) VALUES ($1, $2, $3, $4)',
    [Date.now(), email, password, admin]
  );
  console.log('insert result', result);
  return result;
};

const deletePerson = async (client, id) => {
  const result = await client.query(
    'DELETE FROM "Dootman" WHERE id = $1', 
    [id]
    );
  console.log('delete result', result);
  return result;
};

const changeAdmin = async (client, id) => {
  const result = await client.query(
    'UPDATE "Dootman" SET admin = NOT admin WHERE id = $1', 
    [id]
    );
  console.log('admin change result', result);
  return result;
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
module.exports.addPerson = addPerson;
module.exports.deletePerson = deletePerson;
module.exports.changeAdmin = changeAdmin;