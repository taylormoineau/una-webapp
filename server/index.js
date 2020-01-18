const creds = require('../creds.json');
const express = require('express');
const path = require('path');
const loginHandler = require('./login.js');
const peopleHandler = require('./people.js');
const addPersonHandler = require('./addPerson.js');
const deletePersonHandler = require('./deletePerson.js');
const editPersonHandler = require('./editPerson.js');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');

const app = express();

Object.assign(process.env, creds); // for local only

app.use(cookieParser());

app.use(async (req, res, next) => {
  if (req.cookies.authCookie) {
    const [id, hash] = req.cookies.authCookie.split('|');
    if (hash && (await bcrypt.compare(process.env.SECRET + id, hash))) {
      // req.user = await peopleHandler.getPersonById(id);
      console.log(`${id} is authenticated.. yay!`);
      next();
    } else {
      res
        .clearCookie('authCookie')
        .status(401)
        .send(`gtfo ${id}`);
      console.log(`gtfo ${id}`);
    }
  } else next();
});
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// not protected
app.use('/login', loginHandler);
app.use('/addPerson', addPersonHandler);

// authenticated users only
// app.use((req, res, next) => {
//   if (req.user) next();
//   else {
//     res.status(401).send('Authenticated users only');
//   }
// });
// endpoints for non-admins go here

// admin only endpoints
// app.use((req, res, next) => {
//   if (req.user && req.user.admin) next();
//   else {
//     res.status(401).send('Admins only');
//   }
// });
app.use('/people', peopleHandler);
app.use('/deletePerson', deletePersonHandler);
app.use('/editPerson', editPersonHandler);

app.listen(process.env.PORT || 8080);
