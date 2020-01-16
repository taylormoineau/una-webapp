const creds = require('../creds.json');
const express = require('express');
const cors = require('cors');

const loginHandler = require('./login.js');
const peopleHandler = require('./people.js');
const addPersonHandler = require('./addPerson.js');
const deletePersonHandler = require('./deletePerson.js');
const editPersonHandler = require('./editPerson.js');

const app = express();
const port = 3001;

Object.assign(process.env, creds); // for local only

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/login', loginHandler);
app.use('/people', peopleHandler);
app.use('/addPerson', addPersonHandler);
app.use('/deletePerson', deletePersonHandler);
app.use('/editPerson', editPersonHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
