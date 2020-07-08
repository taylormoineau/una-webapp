import {sendJson} from './utils';
import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import {Link as RRLink} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useHistory} from 'react-router-dom';
import keyIcon from './Icons/keyIcon120.png';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://www.linkedin.com/in/taylor-moineau/"
        target="_blank"
      >
        Taylor Moineau
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
  },
  error: {
    color: theme.palette.secondary.main
  }
}));

export const LoginForm = ({
  onSubmit,
  setName,
  setEmail,
  setPassword,
  error,
  icon,
  text,
  linkText,
  linkURL,
  addName
}) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={icon} alt="key icon" />
        <Typography component="h1" variant="h5">
          {text}
        </Typography>
        <Typography color="secondary">
          **Development note: Currently I do not have an HTTPS certificate.
          Theres not really any risk using this website without it. However, I
          suggest you register with a "fake" email and password, just to be
          safe. If you are wanting to test the site, just make something up.
          Thanks!
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          {addName && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              type="text"
              name="name"
              onChange={e => setName(e.target.value)}
            />
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            type="email"
            name="email"
            autoComplete="email"
            onChange={e => setEmail(e.target.value)}
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
            onChange={e => setPassword(e.target.value)}
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
            {text}
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <RRLink to={linkURL}>
                <Link variant="body2">{linkText}</Link>
              </RRLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export const LoginPage = ({checkAuth, currentUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let history = useHistory();

  const loginUser = async e => {
    e.preventDefault();
    const result = await sendJson('login', {
      email,
      password
    });
    if (result.error) {
      setError(result.error);
    }
    await checkAuth();
    history.push('/');
  };

  return (
    <LoginForm
      onSubmit={loginUser}
      setEmail={setEmail}
      setPassword={setPassword}
      error={error}
      icon={keyIcon}
      text="Log In"
      linkText="Don't have an account? Sign Up"
      linkURL="/register"
    />
  );
};
