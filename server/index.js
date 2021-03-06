import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import helmet from 'helmet';

//Notice: strictly requires suffix .js or it can't find these files

import {login} from './login.js';
import {logout} from './logout.js';
import {getPeople, getUser} from './getPeople.js';
import {getAllBooks, getOneBook} from './getBooks.js';
import {addPerson} from './addPerson.js';
import {deletePerson} from './deletePerson.js';
import {editPerson, updateInfo} from './editPerson.js';
import {
  authCookie,
  masterOnly,
  adminsOnly,
  loggedInOnly
} from './authCookie.js';
import {createBook, createCopy} from './createBook.js';
import {deleteBook} from './deleteBook.js';
import {editBook} from './editBook.js';
import {editPageNumber, editPageDescription, editApproval} from './editPage.js';
import {getAllPages} from './getPages.js';
import {createPage} from './createPage.js';
import {deletePage} from './deletePage.js';
import {updateImage} from './updateImage.js';
import {printPDF} from './printing/Print.js';

if (!process.env.SECRET) throw new Error('MISSING CREDS!');

const app = express();

app.use(helmet());

app.use(bodyParser.json({limit: '8mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), 'build')));
app.use(express.json());
app.use(authCookie);

// not protected

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use('/checkAuth', (req, res) => res.json(req.user || ''));
app.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'build', 'index.html')); // serve the UI
});
app.post('/login', login);
app.post('/addPerson', addPerson);
app.get('/getAllBooks/:id', getAllBooks);
app.get('/getOneBook/:id', getOneBook);
app.get('/getPagesForBook/:id', getAllPages);

app.use(loggedInOnly); // user must be logged in to access endpoints below
app.get('/logout', logout);
app.get('/getUser/:id', getUser);
app.post('/createBook', createBook);
app.post('/createCopy', createCopy);
app.use('/createPageInBook/:id', createPage);
app.post('/editBook/:id', editBook);
app.post('/updateInfo', updateInfo);
app.post('/editPageNumber', editPageNumber);
app.post('/editPageDescription', editPageDescription);
app.post('/editApproval', editApproval);
app.post('/updateImage', updateImage);
app.get('/print/:bookId', printPDF);
app.get('/people', getPeople);

app.use(adminsOnly); // user must be admin to access endpoints below
app.post('/deletePage', deletePage);
app.post('/deleteBook', deleteBook);
app.post('/editPerson', editPerson);

app.use(masterOnly);
app.post('/deletePerson', deletePerson);

const port = process.env.PORT || 8081;
console.log(`Starting on ${port}`);
app.listen(port);

// app.use('/checkAuth', (req, res) => res.json(req.user || ''));
// app.get('/', (req, res) => {
//   res.sendFile(path.join(path.resolve(), 'build', 'index.html')); // serve the UI
// });
// app.post('/login', login);
// app.post('/addPerson', addPerson);

// app.use(loggedInOnly); // user must be logged in to access endpoints below
// app.get('/getAllBooks', getAllBooks);
// app.get('/getPagesForBook/:id', getAllPages);
// app.get('/getOneBook/:id', getOneBook);
// app.get('/logout', logout);
// app.post('/updateInfo', updateInfo);
// app.get('/getUser/:id', getUser);

// app.use(adminsOnly); // user must be admin to access endpoints below
// app.post('/createBook', createBook);
// app.use('/createPageInBook/:id', createPage);
// app.post('/editPageNumber', editPageNumber);
// app.post('/editPageDescription', editPageDescription);
// app.post('/createCopy', createCopy);
// app.post('/editApproval', editApproval);
// app.post('/updateImage', updateImage);
// app.post('/editBook/:id', editBook);
// app.get('/people', getPeople);
// app.post('/deletePage', deletePage);
// app.post('/deleteBook', deleteBook);
// app.post('/editPerson', editPerson);

// // app.use(masterOnly); // user must be admin to access endpoints below
// // app.post('/deletePerson', deletePerson);

// const port = process.env.PORT || 8081;
// console.log(`Starting on ${port}`);
// app.listen(port);
