const {wrapper} = require('./helpers/wrapper');
const {changeAdmin} = require('./people');

module.exports = wrapper(async (req, client) => {
  if (!req.body)
    return {status: 406, data: 'What are you even trying to do here?'};

  const userId = req.body.id;

  // edit the admin status of the user
  await changeAdmin(client, userId);

  return 'Yay!';
});