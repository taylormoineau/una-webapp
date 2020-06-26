import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import {sendJson, loadData} from './utils';
import {Link as RRLink, useHistory, useParams} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Collapse from '@material-ui/core/Collapse';

//Flag imports
import HU from './flags/HU.png';
import ENG from './flags/ENG.png';
import SRB from './flags/SRB.png';
import HR from './flags/HR.png';

const flagSelect = language => {
  switch (language) {
    case 'HU':
      return HU;
    case 'HR':
      return HR;
    case 'ENG':
      return ENG;
    case 'SRB':
      return SRB;
  }
};

const scrollUp = () => {
  var element = document.createElement('a');
  element.setAttribute('href', '#');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650
  },

  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
    marginBottom: 20
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  error: {
    color: theme.palette.secondary.main
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  errorPaper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
    marginBottom: 20
  },
  userPaper: {
    backgroundColor: theme.palette.primary.light,
    borderRadius: 50,
    padding: 10,
    width: 180
  },
  authorLink: {
    color: 'white'
  },
  flag: {
    height: 30
  },
  marginTop: {
    marginTop: 20
  }
}));

export const CreateBookPage = ({isAdmin}) => {
  const [titleState, setTitleState] = useState('');
  const [enableCopy, setEnableCopy] = useState(true);
  const [copyTitle, setCopyTitle] = useState('');
  const [copyPages, setCopyPages] = useState(0);
  const [copyLang, setCopyLang] = useState('ENG');
  const [idToCopy, setIdToCopy] = useState(0);
  const [booksState, setBooksState] = useState([]);
  const [error, setError] = useState('');
  const [pgNum, setPgNum] = useState(8);
  const [lang, setLang] = useState('ENG');
  const {filterId} = useParams();

  const history = useHistory();
  const classes = useStyles();
  const copyRef = useRef();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const submitNewBook = async e => {
    e.preventDefault();
    const result = await sendJson('createBook', {
      title: titleState,
      pageCount: pgNum,
      language: lang
    });
    if (result.error) {
      setError(result.error);
    } else {
      history.push('/book/' + result.id);
    }
  };

  const submitNewCopy = async e => {
    e.preventDefault();
    const result = await sendJson('createCopy', {
      title: copyTitle,
      pageCount: copyPages,
      language: copyLang,
      idToCopy
    });
    if (result.error) {
      setError(result.error);
    } else {
      history.push('/book/' + result.id);
    }
  };

  const deleteBook = id => async () => {
    await sendJson('deleteBook', {id});
    //This can only be changed by administrators, so only server errors should be a problem here.
    await loadData('getAllBooks/' + filterId, setBooksState, setError);
  };

  useEffect(() => {
    loadData('getAllBooks/' + filterId, setBooksState, setError);
    console.log(filterId);
  }, []);

  return (
    <>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Collapse in={isAdmin}>
          {/* CREATE NEW BOOK BLOCK */}
          <Grid container justify="space-between">
            <Grid item>
              <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                  {'Create New Book'}
                </Typography>
                <MenuBookIcon />
                <form className={classes.form} onSubmit={submitNewBook}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="bookTitle"
                    label="Book Title"
                    onChange={e => setTitleState(e.target.value)}
                  />
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel
                      ref={inputLabel}
                      id="demo-simple-select-outlined-label"
                    >
                      Pages
                    </InputLabel>
                    <Select
                      value={pgNum}
                      onChange={e => setPgNum(e.target.value)}
                      labelWidth={labelWidth}
                      disabled={true}
                    >
                      <MenuItem value={8}>8</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel ref={inputLabel}>Language</InputLabel>
                    <Select
                      value={lang}
                      onChange={e => setLang(e.target.value)}
                      labelWidth={labelWidth}
                    >
                      <MenuItem value={'ENG'}>English</MenuItem>
                      <MenuItem value={'SRB'}>Serbian</MenuItem>
                      <MenuItem value={'HR'}>Croatian</MenuItem>
                      <MenuItem value={'HU'}>Hungarian</MenuItem>
                    </Select>
                  </FormControl>

                  <Typography
                    component="h3"
                    variant="h5"
                    className={classes.error}
                  ></Typography>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    {'CREATE'}
                  </Button>
                </form>
              </Paper>
            </Grid>

            {/* COPY BOOK BLOCK */}

            <Grid item>
              <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                  {'Make a Copy'}
                </Typography>
                <FileCopyIcon />
                <form className={classes.form} onSubmit={submitNewCopy}>
                  <TextField
                    variant="outlined"
                    value={copyTitle}
                    disabled={enableCopy}
                    margin="normal"
                    fullWidth
                    ref={copyRef}
                    id="bookTitle"
                    label="Book Title"
                    onChange={e => setCopyTitle(e.target.value)}
                  />
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel ref={inputLabel}>Pages</InputLabel>
                    <Select
                      value={pgNum}
                      onChange={e => setPgNum(e.target.value)}
                      labelWidth={labelWidth}
                      disabled={true}
                    >
                      <MenuItem value={8}>8</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel ref={inputLabel}>Language</InputLabel>
                    <Select
                      disabled={enableCopy}
                      value={copyLang}
                      onChange={e => setCopyLang(e.target.value)}
                      labelWidth={labelWidth}
                    >
                      <MenuItem value={'ENG'}>English</MenuItem>
                      <MenuItem value={'SRB'}>Serbian</MenuItem>
                      <MenuItem value={'HR'}>Croatian</MenuItem>
                      <MenuItem value={'HU'}>Hungarian</MenuItem>
                    </Select>
                  </FormControl>

                  <Typography
                    component="h3"
                    variant="h5"
                    className={classes.error}
                  ></Typography>

                  <Button
                    disabled={enableCopy}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                  >
                    {'CREATE COPY'}
                  </Button>
                </form>
              </Paper>
            </Grid>
          </Grid>
          {/* THIS IS A SMALL PAPER ELEMENT TO HOLD USER ERROR MESSAGES */}
        </Collapse>
        {error && (
          <Paper className={classes.errorPaper}>
            <Typography component="h3" variant="h5" className={classes.error}>
              {error}
            </Typography>
          </Paper>
        )}
        {/* BELOW IS THE BOOK LIST */}
        <div className={classes.marginTop}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {/* <TableCell>Book id:</TableCell> */}
                  <TableCell>Title:</TableCell>
                  <TableCell align="left">Author:</TableCell>
                  <TableCell align="right">Date Created:</TableCell>
                  {isAdmin && <TableCell align="right">Create Copy?</TableCell>}
                  {isAdmin && <TableCell align="right">Delete?</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {booksState.map(
                  ({id, title, author, created_date, author_id, language}) => (
                    <TableRow key={id}>
                      {/* <TableCell component="th" scope="row">
                    {id}
                  </TableCell> */}
                      <TableCell align="right">
                        <Link>
                          <RRLink to={'/book/' + id} id={id}>
                            {title}
                          </RRLink>
                        </Link>
                        {'   '}
                        <img
                          src={flagSelect(language)}
                          alt={language}
                          className={classes.flag}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Paper color="primary" className={classes.userPaper}>
                          <RRLink
                            className={classes.authorLink}
                            to={'/UserInfo/' + author_id}
                            author_id={author_id}
                          >
                            <Link variant="body2">{author}</Link>
                          </RRLink>
                        </Paper>
                      </TableCell>
                      <TableCell align="right">
                        {new Date(created_date).toDateString()}
                      </TableCell>

                      <TableCell align="right">
                        {isAdmin ? (
                          <form
                            onSubmit={e => {
                              e.preventDefault();
                              setEnableCopy(false);
                              setCopyTitle(title);
                              setCopyPages(8);
                              setIdToCopy(id);
                              scrollUp();
                            }}
                          >
                            <Button color="secondary" type="submit">
                              COPY
                            </Button>
                          </form>
                        ) : (
                          ''
                        )}
                      </TableCell>

                      <TableCell align="right">
                        {isAdmin ? (
                          <Button color="secondary" onClick={deleteBook(id)}>
                            Delete
                          </Button>
                        ) : (
                          ''
                        )}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </>
  );
};
