const bcrypt = require('bcrypt');

export default async (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  if (!userEmail || !userPassword) {
    res.status(406).send('Please enter information!');
    return;
  } else {
    const hashedPass = await bcrypt.hash(userPassword, 10);
    const user = await getUser(userEmail);
    if (user) {
      if (await passwordCorrect(user, userPassword)) {
        res.send('success (user, userPassword)');
      } else res.status(403).send('Wrong password');
    } else res.status(401).send('User does not exist');
  }

  //if (req.body.password !== 'DOOTMAN RULZ') res.json({access: 'denied'});
  //else res.json({access: 'granted'});
};
