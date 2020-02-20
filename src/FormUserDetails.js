// import React, {useState} from 'react';
// import {
//   TextField,
//   AppBar,
//   Button,
//   List,
//   ListItem,
//   ListItemText
// } from '@material-ui/core';

// const FormUserDetails = ({nextStep, setFirstname, values}) => (
//   <div>
//     <TextField
//       defaultValue={values.firstname}
//       label="Enter your first name"
//       onChange={event => setFirstname(event.target.value)}
//     />
//     <br />

//     <Button onClick={nextStep} variant="primary">
//       Next
//     </Button>
//   </div>
// );

// const FormPersonalDetails = ({
//   nextStep,
//   prevStep,
//   setLastname,
//   setWorkStatus,
//   values
// }) => (
//   <div>
//     <TextField
//       defaultValue={values.lastname}
//       label="Enter your last name"
//       onChange={event => setLastname(event.target.value)}
//     />
//     <br />
//     <TextField
//       defaultValue={values.workStatus}
//       label="Enter your work status"
//       onChange={event => setWorkStatus(event.target.value)}
//     />
//     <br />
//     <Button onClick={nextStep} variant="primary">
//       Next
//     </Button>
//     <Button onClick={prevStep}>Back</Button>
//   </div>
// );

// const Confirm = ({values, nextStep, prevStep}) => {
//   const {firstname, lastname, workStatus} = values;
//   return (
//     <div>
//       <List component="nav">
//         <ListItem>
//           <ListItemText primary={firstname} />
//         </ListItem>
//         <ListItem>
//           <ListItemText primary={lastname} />
//         </ListItem>
//         <ListItem>
//           <ListItemText primary={workStatus} />
//         </ListItem>
//       </List>

//       <Button variant="primary" onClick={nextStep}>
//         Confirm
//       </Button>
//       <Button onClick={prevStep}>Back</Button>
//     </div>
//   );
// };

// export const DootForm = () => {
//   const [step, setStep] = useState(1);
//   const [firstname, setFirstname] = useState('');
//   const [lastname, setLastname] = useState('');
//   const [workStatus, setWorkStatus] = useState('');

//   // proceed to the next step
//   const nextStep = () => setStep(step + 1);

//   // previous step
//   const prevStep = () => setStep(step - 1);

//   const values = {firstname, lastname, workStatus};

//   switch (step) {
//     case 1:
//       return (
//         <FormUserDetails
//           nextStep={nextStep}
//           values={values}
//           setFirstname={setFirstname}
//           setLastname={setLastname}
//           setWorkStatus={setWorkStatus}
//         />
//       );
//     case 2:
//       return (
//         <FormPersonalDetails
//           nextStep={nextStep}
//           values={values}
//           prevStep={prevStep}
//           setLastname={setLastname}
//           setWorkStatus={setWorkStatus}
//         />
//       );
//     case 3:
//       return (
//         <Confirm nextStep={nextStep} prevStep={prevStep} values={values} />
//       );
//     case 4:
//       return <h1>Success</h1>;
//   }
// };

import {sendJson} from './utils';
import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CreateOutlined from '@material-ui/icons/CreateOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
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
  }
}));

export const LoginForm = ({checkAuth}) => {
  const [emailLoginState, setEmailLoginState] = useState('');
  const [passwordLoginState, setPasswordLoginState] = useState('');
  const [errorState, setErrorState] = useState('');
  const classes = useStyles();

  const loginUser = async e => {
    e.preventDefault();
    const result = await sendJson('login', {
      email: emailLoginState,
      password: passwordLoginState
    });
    if (result.error) {
      setErrorState(result.error);
    }
    await checkAuth();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={loginUser}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={e => setEmailLoginState(e.target.value)}
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
            onChange={e => setPasswordLoginState(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
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
