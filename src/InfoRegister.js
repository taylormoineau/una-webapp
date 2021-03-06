import {sendJson} from './utils';
import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';
import userIcon from './userIcon.png';
import {FileInput} from './FileInput.js';
import Checkbox from '@material-ui/core/Checkbox';
import {LoadingPage} from './LoadingPage';

const fieldArr = [
  {fieldName: 'first_name', label: 'First Name'},
  {fieldName: 'last_name', label: 'Last Name'},
  {fieldName: 'city', label: 'City'},
  {fieldName: 'country', label: 'Country'},
  {fieldName: 'email', type: 'email', label: 'Email Address'}
];

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link
      color="inherit"
      href="https://www.linkedin.com/in/taylor-moineau/"
      target="_blank"
    >
      Taylor Moineau
    </Link>
    {' ' + new Date().getFullYear() + '.'}
  </Typography>
);

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15)
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
  },
  titleMargin: {
    margin: 24
  }
}));

export const InfoRegister = ({currentUser}) => {
  const [formData, setFormData] = useState('');
  const classes = useStyles();
  // const [languagesKnown, setLanguagesKnown] = useState({})
  const [error, setError] = useState('');
  let history = useHistory();
  const languageArr = ['English', 'Serbian', 'Croatian', 'Hungarian'];

  const updateUser = async e => {
    e.preventDefault();
    const result = await sendJson('updateInfo', formData);
    if (result.error) {
      setError(result.error);
    } else {
      history.push('/');
    }
  };

  useEffect(() => setFormData(currentUser), [currentUser]);

  return (
    // TODO: Put the <Container>, <CSSBaseline />, and <Copyright /> all in Routes.js so that it's not repeated in each route
    <div>
      {!formData ? (
        <LoadingPage />
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <form className={classes.form} onSubmit={updateUser}>
            <div className={classes.paper}>
              <Avatar
                alt={
                  formData.user_photo ? formData.name : 'Add User Photo here'
                }
                src={formData.user_photo ? formData.user_photo : userIcon}
                className={classes.large}
              />
              <FileInput
                onChange={user_photo => setFormData({...formData, user_photo})}
              />
              {!formData.user_photo && (
                <Typography component="subtitle1">
                  Please add your photo! (600x600px max)
                </Typography>
              )}
            </div>

            {/* TODO: Instead of FileInput having an icon hardcoded inside of it, pass in contents as children
          Example:
          <FileInput onChange={...}>
            <AddPhotoAlternateIcon />
          </FileInput>

          In this case, the avatar itself and info text below would be children of FileInput.
          Be sure to update every place <FileInput> is used.
        */}

            {fieldArr.map(({fieldName, type = 'text', label}) => (
              <TextField
                key={fieldName}
                variant="outlined"
                margin="normal"
                fullWidth
                label={label}
                type={type}
                defaultValue={formData[fieldName]}
                onChange={e =>
                  setFormData({...formData, [fieldName]: e.target.value})
                }
              />
            ))}

            <Typography component="h3" variant="h5" className={classes.error}>
              {error}
            </Typography>
            <Typography
              component="h3"
              variant="h5"
              className={classes.titleMargin}
            >
              Spoken Languages:
            </Typography>
            <Grid container justify="space-between" spacing={3}>
              {languageArr.map(l => (
                <div key={l}>
                  <Grid item xs={3}>
                    <Checkbox
                      value="secondary"
                      color="primary"
                      inputProps={{'aria-label': 'secondary checkbox'}}
                    />
                    {l}
                  </Grid>
                </div>
              ))}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              DONE
            </Button>
          </form>

          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      )}
    </div>
  );
};
