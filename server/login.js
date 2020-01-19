const {wrapper} = require('./helpers/wrapper');
const {getPersonByEmail} = require('./people');
const bcrypt = require('bcryptjs');

const passwordCorrect = async (user, pw) =>
  await bcrypt.compare(pw, user.password);

module.exports = wrapper(async (req, client) => {
  if (!req.body)
    return {status: 406, data: 'What are you even trying to do here?'};

  const userEmail = req.body.email;
  const userPassword = req.body.password;

  if (!userEmail || !userPassword)
    return {status: 406, data: 'Please enter information!'};

  const user = await getPersonByEmail(client, userEmail);
  if (!user) return {status: 401, data: 'User does not exist'};

  if (await passwordCorrect(user, userPassword)) {
    return {
      data: 'successful login',
      cookie: {
        name: 'authCookie',
        value:
          user.id + '|' + (await bcrypt.hash(process.env.SECRET + user.id, 10)),
        maxAge: 365 * 24 * 3600 * 1000
      }
    };
  }

  return {status: 403, data: 'Wrong password'};
});
