const {wrapper} = require('./helpers/wrapper');
const {getPersonByEmail, addPerson} = require('./people');
const bcrypt = require('bcryptjs');
const validator = require('email-validator');


module.exports = wrapper(async (req, client) => {
  if (!req.body)
    return {status: 406, data: 'What are you even trying to do here?'};

  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const isAdmin = req.body.admin;

  if (!userEmail || !userPassword)
    return {status: 406, data: 'Please enter information!'};

  if (!validator.validate(userEmail))
    return {status: 406, data: 'This is not a valid email!'};

  // make sure they don't exist first
  const user = await getPersonByEmail(client, userEmail);
  if (user) return {status: 401, data: 'User already exists!'};

  //This method of hashing is sync and it's safer to use async, though for this
  //tiny project I don't think it's ever going to be a problem.

  const hash = bcrypt.hashSync(userPassword, 10);

  // create the user
  await addPerson(client, userEmail, hash, isAdmin);

  return 'Yay!';
});

// bcrypt.hash('dootman', 10).then(console.log);
