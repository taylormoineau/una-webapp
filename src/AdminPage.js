import React, {useEffect, useState} from 'react';
import './App.css';
import {Link as RRLink} from 'react-router-dom';
import {sendJson, loadData} from './utils';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  tableMargins: {
    margin: 20
  },
  table: {
    minWidth: 650,
    margin: 10
  },
  errorPaper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
    marginBottom: 20
  },
  error: {
    color: theme.palette.secondary.main
  }
}));

export const AdminPage = () => {
  //The hooks. We might be able to slim the register/login hooks down to one single hook holding an object.
  const [people, setPeople] = useState([]);
  const [error, setError] = useState('');

  const classes = useStyles();

  //function to change admin status of user
  const changeAdmin = id => async setError => {
    setPeople(people.map(p => (p.id === id ? {...p, admin: !p.admin} : p)));
    await sendJson('editPerson', {id});
    //This can only be changed by administrators, so only server errors should be a problem here.
    await loadData('people', setPeople, setError);
  };

  //function to delete a user
  const deletePerson = id => async () => {
    await sendJson('deletePerson', {id});
    //This can only be changed by administrators, so only server errors should be a problem here.
    await loadData('people', setPeople, setError);
  };

  useEffect(() => {
    // second argument is [], so only do once
    loadData('people', setPeople, setError);
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      {/* THIS IS A SMALL PAPER ELEMENT TO HOLD USER ERROR MESSAGES */}
      {error && (
        <Paper className={classes.errorPaper}>
          <Typography component="h3" variant="h5" className={classes.error}>
            {error}
          </Typography>
        </Paper>
      )}

      <TableContainer component={Paper} className={classes.tableMargins}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User Id:</TableCell>
              <TableCell align="right">Name:</TableCell>
              <TableCell align="right">Email Address:</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Make an Editor?</TableCell>
              <TableCell align="right">Delete User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map(
              ({id, email, first_name, last_name, admin, master_admin}) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {id}
                  </TableCell>
                  <TableCell align="right">
                    <RRLink
                      className={classes.authorLink}
                      to={'/UserInfo/' + id}
                      author_id={id}
                    >
                      {first_name + ' ' + last_name}
                    </RRLink>
                  </TableCell>
                  <TableCell align="right">{email}</TableCell>
                  <TableCell align="right">
                    {admin ? 'EDITOR' : 'USER'}
                  </TableCell>

                  <TableCell align="right">
                    {!master_admin && (
                      <Checkbox
                        checked={admin}
                        onChange={changeAdmin(id)}
                        value="primary"
                        inputProps={{'aria-label': 'primary checkbox'}}
                      />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {!master_admin ? (
                      <Button color="secondary" onClick={deletePerson(id)}>
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
