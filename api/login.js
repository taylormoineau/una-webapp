const bcrypt = require('bcrypt');
const {wrapper} = require('./helpers/wrapper');
const {getPerson} = require('./people');

const passwordCorrect = async (user, pw) => {
  const hash = await bcrypt.hash(pw, 10);
  return user.password === hash;
};

module.exports = wrapper(async (req, client) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  if (!userEmail || !userPassword) {
    return {status: 406, data: 'Please enter information!'};
  } else {
    const user = await getPerson(client, userEmail);
    // TODO: this isn't working right, need to console.log out user and see what's going on
    if (user) {
      if (await passwordCorrect(user, userPassword)) {
        return 'success (user, userPassword)';
      } else return {status: 403, data: 'Wrong password'};
    } else return {status: 401, data: 'User does not exist'};
  }
});

// bcrypt.hash('dootman', 10).then(console.log);
