const bcrypt = require('bcrypt');
const {wrapper} = require('./helpers/wrapper');
const {getPersonByEmail} = require('./people');

const passwordCorrect = async (user, pw) => {
  const hash = await bcrypt.hash(pw, 10);
  return user.password === hash;
};

module.exports = wrapper(async (req, client) => {
  if (!req.body)
    return {status: 406, data: 'What are you even trying to do here?'};

  const userEmail = req.body.email;
  const userPassword = req.body.password;

  if (!userEmail || !userPassword)
    return {status: 406, data: 'Please enter information!'};

  const user = await getPersonByEmail(client, userEmail);
  if (!user) return {status: 401, data: 'User does not exist'};

  if (await passwordCorrect(user, userPassword))
    return 'success (user, userPassword)';

  return {status: 403, data: 'Wrong password'};
});

bcrypt.hash('dootman', 10).then(console.log);
