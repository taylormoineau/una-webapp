import '../creds.js';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

//Notice: strictly requires suffix .js or it can't find these files

import {login} from './login.js';
import {logout} from './logout.js';
import {getPeople} from './getPeople.js';
import {getAllBooks, getOneBook} from './getBooks.js';
import {addPerson} from './addPerson.js';
import {deletePerson} from './deletePerson.js';
import {editPerson} from './editPerson.js';
import {authCookie, adminsOnly, loggedInOnly} from './authCookie.js';
import {createBook} from './createBook.js';
import {deleteBook} from './deleteBook.js';
import {editBook} from './editBook.js';
import {getAllPages} from './getPages.js';
import {createPage} from './createPage.js';
import {deletePage} from './deletePage.js';

const app = express();

app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), 'build')));
app.use(express.json());
app.use(authCookie);

// not protected

app.use('/checkAuth', (req, res) => res.json(req.user || ''));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html')); // serve the UI
});
app.post('/login', login);
app.post('/addPerson', addPerson);

app.use(loggedInOnly); // user must be logged in to access endpoints below
app.get('/logout', logout);
app.get('/getAllBooks', getAllBooks);
app.get('/getOneBook/:id', getOneBook);
app.get('/getPagesForBook/:id', getAllPages);
app.post('/createBook', createBook);
app.use('/createPageInBook/:id', createPage);
app.post('/editBook/:id', editBook);

app.use(adminsOnly); // user must be admin to access endpoints below
app.get('/people', getPeople);
app.post('/deletePage', deletePage);
app.post('/deletePerson', deletePerson);
app.post('/deleteBook', deleteBook);
app.post('/editPerson', editPerson);

app.listen(process.env.PORT || 8080);
