const {wrapper} = require('./helpers/wrapper');
const {deletePerson} = require('./people');

module.exports = wrapper(async (req, client) => {
  if (!req.body)
    return {status: 406, data: 'What are you even trying to do here?'};

  const userId = req.body.id;

  // delete the user
  await deletePerson(client, userId);

  return 'Yay!';
});

// bcrypt.hash('dootman', 10).then(console.log);