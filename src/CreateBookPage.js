import React, {useState, useEffect} from 'react';
import './App.css';
import {sendJson, loadData} from './utils';
import {Link as RRLink, useHistory} from 'react-router-dom';
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

//Rename this page. It's confusing.

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
  userPaper: {
    backgroundColor: theme.palette.primary.light,
    borderRadius: 50,
    padding: 10
  },
  authorLink: {
    color: 'white'
  }
}));

export const CreateBookPage = ({isAdmin}, {currentUser}) => {
  const [titleState, setTitleState] = useState('');
  const [booksState, setBooksState] = useState([]);
  const [error, setError] = useState('');
  const [pgNum, setPgNum] = useState(8);
  const [lang, setLang] = useState('ENG');

  const history = useHistory();
  const classes = useStyles();

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
    }
    history.push('/book/' + result.id);
  };

  const deleteBook = id => async () => {
    await sendJson('deleteBook', {id});
    //This can only be changed by administrators, so only server errors should be a problem here.
    await loadData('getAllBooks', setBooksState, setError);
  };

  useEffect(() => {
    loadData('getAllBooks', setBooksState, setError);
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
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
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
              Pages
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={pgNum}
              onChange={e => setPgNum(e.target.value)}
              labelWidth={labelWidth}
            >
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={12}>12</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
              Language
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
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

          <Typography component="h3" variant="h5" className={classes.error}>
            {error}
          </Typography>

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
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Book id:</TableCell>
              <TableCell align="right">Title:</TableCell>
              <TableCell align="right">Author:</TableCell>
              <TableCell align="right">Date Created:</TableCell>
              <TableCell align="right">Last Edited By:</TableCell>
              <TableCell align="right">Date of Last Edit:</TableCell>
              {isAdmin && <TableCell align="right">Delete?</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {booksState.map(
              ({
                id,
                title,
                author,
                created_date,
                edited_by_user,
                edited_date,
                author_id
              }) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {id}
                  </TableCell>
                  <TableCell align="right">
                    <Link>
                      <RRLink to={'/book/' + id} id={id}>
                        {title}
                      </RRLink>
                    </Link>
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
                  <TableCell align="right">{edited_by_user}</TableCell>
                  <TableCell align="right">{edited_date}</TableCell>

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
    </Container>
  );
};
