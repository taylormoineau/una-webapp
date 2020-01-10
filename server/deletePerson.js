const {wrapper} = require('./helpers/wrapper');
const {deletePerson} = require('./people');

module.exports = wrapper(async (req, client) => {
  if (!req.body)
    return {status: 406, data: 'What are you even trying to do here?'};

  const userEmail = req.body.email;

  // delete the user
  await deletePerson(client, userEmail);

  return 'Yay!';
});

// bcrypt.hash('dootman', 10).then(console.log);