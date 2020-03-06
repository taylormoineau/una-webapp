import React, {useEffect, useState} from 'react';
import './App.css';
import {sendJson, loadData} from './utils';
import {makeStyles} from '@material-ui/core/styles';
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

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export const AdminPage = () => {
  //The hooks. We might be able to slim the register/login hooks down to one single hook holding an object.
  const [people, setPeople] = useState([]);
  const [emailRegisterState, setEmailRegisterState] = useState('');
  const [passwordRegisterState, setPasswordRegisterState] = useState('');
  const [error, setError] = useState('');

  const classes = useStyles();

  //function to submit request to create new user.
  const submitNewUser = async e => {
    e.preventDefault();
    const result = await sendJson('addPerson', {
      email: emailRegisterState,
      password: passwordRegisterState
    });
    if (result.error) {
      setError(result.error);
    } else {
      await loadData('people', setPeople, setError);
    }
  };

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
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User Id:</TableCell>
              <TableCell align="right">Name:</TableCell>
              <TableCell align="right">Email Address:</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Is Admin?</TableCell>
              <TableCell align="right">Delete User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map(({id, email, password, admin, master_admin}) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {id}
                </TableCell>
                <TableCell align="right">{password}</TableCell>
                <TableCell align="right">{email}</TableCell>
                <TableCell align="right">{admin ? 'ADMIN' : 'PLEB'}</TableCell>

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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
