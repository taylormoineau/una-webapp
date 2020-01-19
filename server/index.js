const creds = require('../creds.json');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const loginHandler = require('./login.js');
const peopleHandler = require('./people.js');
const addPersonHandler = require('./addPerson.js');
const deletePersonHandler = require('./deletePerson.js');
const editPersonHandler = require('./editPerson.js');
const authCookie = require('./auth.js');

Object.assign(process.env, creds); // for local only

const app = express();

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

// not protected

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use('/login', loginHandler);
app.use('/addPerson', addPersonHandler);

app.use(authCookie); // user must be logged in to access endpoints below

// admins only past here
app.use(authCookie.adminsOnly);
app.use('/people', peopleHandler);
app.use('/deletePerson', deletePersonHandler);
app.use('/editPerson', editPersonHandler);

app.listen(process.env.PORT || 8080);
