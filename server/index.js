import '../creds.js';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

import {login} from './login.js';
import {getPeople} from './getPeople.js';
import {addPerson} from './addPerson.js';
import {deletePerson} from './deletePerson.js';
import {editPerson} from './editPerson.js';
import {authCookie, adminsOnly} from './auth.js';

const app = express();

app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), 'build')));
app.use(express.json());

// not protected

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html')); // serve the UI
});
app.use('/login', login);
app.use('/addPerson', addPerson);

app.use(authCookie); // user must be logged in to access endpoints below

app.use(adminsOnly); // user must be admin to access endpoints below
app.use('/people', getPeople);
app.use('/deletePerson', deletePerson);
app.use('/editPerson', editPerson);

app.listen(process.env.PORT || 8080);
