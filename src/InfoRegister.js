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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useHistory} from 'react-router-dom';
import userIcon from './userIcon.png';
import CardMedia from '@material-ui/core/CardMedia';

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
    backgroundColor: theme.palette.secondary.main,
    height: 120,
    width: 120
  },
  media: {
    height: 110,
    paddingTop: '56.25%' // 16:9
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
  icon: {
    height: 90
  }
}));

export const InfoRegister = ({checkAuth}) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const classes = useStyles();
  const [error, setError] = useState('');
  let history = useHistory();

  const updateUser = async e => {
    e.preventDefault();
    const result = await sendJson('updatePerson', {
      email,
      firstName,
      lastName,
      city,
      country
    });
    if (result.error) {
      setError(result.error);
    }
    await checkAuth();
    history.push('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <CardMedia
          className={classes.media}
          image={userIcon}
          title="Paella dish"
        />
        <Typography component="h1" variant="h5">
          Please add add your photo! (600x600px max)
        </Typography>
        <form className={classes.form} onSubmit={updateUser}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            id="name"
            label="First Name"
            type="email"
            name="email"
            defaultValue={email}
            onChange={e => setFirstName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="lastName"
            label="Last Name"
            type="text"
            name="lastName"
            defaultValue={email}
            onChange={e => setLastName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="city"
            label="City/Town"
            type="text"
            name="city"
            defaultValue={email}
            onChange={e => setCity(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="country"
            label="Country"
            type="text"
            name="country"
            defaultValue={email}
            onChange={e => setCountry(e.target.value)}
          />
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
            defaultValue={email}
            onChange={e => setEmail(e.target.value)}
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
            DONE
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <RRLink to="/">
                <Link variant="body2">Skip this step!</Link>
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
