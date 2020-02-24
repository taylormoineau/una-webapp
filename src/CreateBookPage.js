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
// import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
// import MenuBookIcon from '@material-ui/icons/MenuBook';

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
  }
}));

export const CreateBookPage = ({isAdmin}) => {
  const [titleState, setTitleState] = useState('');
  const [booksState, setBooksState] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();
  const classes = useStyles();

  const submitNewBook = async e => {
    e.preventDefault();
    const result = await sendJson('createBook', {
      title: titleState
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
        {/* <Avatar className={classes.avatar}>{MenuBookIcon}</Avatar> */}
        <Typography component="h1" variant="h5">
          {'Create New Book'}
        </Typography>
        <form className={classes.form} onSubmit={submitNewBook}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Book Title"
            autoComplete="email"
            onChange={e => setTitleState(e.target.value)}
          />

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
                created_by_user,
                created_date,
                edited_by_user,
                edited_date
              }) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {id}
                  </TableCell>
                  <TableCell align="right">
                    <RRLink to={'/book/' + id} id={id}>
                      {title}
                    </RRLink>
                  </TableCell>
                  <TableCell align="right">{created_by_user}</TableCell>
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

    // <div className="container">
    //   <h2>Create New Book Here:</h2>
    //   <form onSubmit={submitNewBook}>
    //     Book Title:{' '}
    //     <input
    //       value={titleState}
    //       type="text"
    //       onChange={e => setTitleState(e.target.value)}
    //     />
    //     <br />
    //     <button>Create book!</button>
    //   </form>
    //   <h3 style={{color: 'red'}}>{error}</h3>
    //   <h1>LIST NEW BOOKS BELOW</h1>
    //   <div className="container">
    //     <table className="table table-condensed">
    //       <thead>
    //         <tr>
    //           <th>Unique id:</th>
    //           <th>Title:</th>
    //           <th>Author:</th>
    //           <th>Created_date:</th>
    //           <th>Last Edited by:</th>
    //           <th>Last Edited_date:</th>
    //           {isAdmin && <th>Delete?</th>}
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {booksState.map(
    //           ({
    //             id,
    //             title,
    //             created_by_user,
    //             created_date,
    //             edited_by_user,
    //             edited_date
    //           }) => (
    //             <tr key={id}>
    //               <td>{id}</td>
    //               {/* Note for later: Make book ID something random and interesting, not just 1, 2, 3 etc. */}
    //               <td>
    //                 <Link to={'/book/' + id} id={id}>
    //                   {title}
    //                 </Link>
    //               </td>
    //               <td>{created_by_user}</td>
    //               <td>{created_date}</td>
    //               <td>{edited_by_user}</td>
    //               <td>{edited_date}</td>
    //               {isAdmin && (
    //                 <td>
    //                   <button
    //                     className="btn btn-danger btn-sm"
    //                     onClick={() => }
    //                   >
    //                     Delete
    //                   </button>
    //                 </td>
    //               )}
    //             </tr>
    //           )
    //         )}
    //       </tbody>
    //     </table>
    //     <h3 style={{color: 'red'}}>{error}</h3>
    //   </div>
    // </div>
  );
};
