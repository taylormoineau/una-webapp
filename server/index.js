const creds = require('../creds.json');
const express = require('express');

const loginHandler = require('./login.js');
const peopleHandler = require('./people.js');

const app = express();
const port = 3001;

Object.assign(process.env, creds); // for local only

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/login', loginHandler);
app.use('/people', peopleHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
