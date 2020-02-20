import {sendJson} from './utils';
import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CreateOutlined from '@material-ui/icons/CreateOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
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
  }
}));

export const Register = ({checkAuth, currentUser}) => {
  //The hooks. We might be able to slim the register/login hooks down to one single hook holding an object.
  const [emailRegisterState, setEmailRegisterState] = useState('');
  const [passwordRegisterState, setPasswordRegisterState] = useState('');
  const [error, setError] = useState('');

  const classes = useStyles();
  let history = useHistory();

  //function to submit request to create new user.
  const submitNewUser = async e => {
    e.preventDefault();
    const result = await sendJson('addPerson', {
      email: emailRegisterState,
      password: passwordRegisterState
    });
    if (result.error) {
      setError(result.error);
    }
    await checkAuth();
  };

  return !currentUser ? (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CreateOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitNewUser}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={e => setEmailRegisterState(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPasswordRegisterState(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            REGISTER
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="/" variant="body2">
                {'Already have an account? Log in!'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  ) : (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Already logged in! Redirecting to home in 3 seconds....
      </Typography>
      {setTimeout(() => history.push('/'), 3000)}
    </Container>
  );

  // <div className="container">
  //   <h2>Register here:</h2>
  //   <form onSubmit={submitNewUser}>
  //     New email:{' '}
  //     <input
  //       name="emailRegister"
  //       value={emailRegisterState}
  //       type="text"
  //       onChange={e => setEmailRegisterState(e.target.value)}
  //     />
  //     <br />
  //     Password:{' '}
  //     <input
  //       name="passwordRegister"
  //       type="password"
  //       value={passwordRegisterState}
  //       onChange={e => setPasswordRegisterState(e.target.value)}
  //     />
  //     <br name="my second most favorite line break" />
  //     <button>Add User</button>
  //   </form>
  //   <h3 style={{color: 'red'}}>{error}</h3>
  // </div>
};
