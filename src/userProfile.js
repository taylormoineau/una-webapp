import React, {useState, useEffect} from 'react';
import {loadData, sendJson, assocPath, swap} from './utils';
import {useParams} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import userIcon from './userIcon.png';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

//icons

const styles = {
  overlay: {
    position: 'relative',
    top: '30px',
    left: '30px',
    width: 30,
    height: 45
  }
};

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20)
  },
  userText: {
    color: theme.palette.primary.main
  },
  userName: {
    fontWeight: 'bold',
    color: '#FFF'
  }
}));

export const UserProfile = () => {
  const [error, setError] = useState('');
  const [userData, setUserData] = useState('');
  const {author_id} = useParams();
  const classes = useStyles();

  useEffect(() => loadData('getUser/' + author_id, setUserData, setError), [
    userData
  ]);

  return (
    <React.Fragment>
      {!userData ? (
        <div>
          <h1>PAGE LOADING!</h1>
        </div>
      ) : (
        <div>
          <main>
            <div className={classes.heroContent}>
              <Container maxWidth="sm">
                <Grid
                  container
                  spacing={3}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Avatar
                      src={userData.user_photo ? userData.user_photo : userIcon}
                      className={classes.large}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h5"
                      align="center"
                      color="textSecondary"
                      className={classes.userName}
                      paragraph
                    >
                      {userData.firstName + ' ' + userData.lastName}
                    </Typography>
                  </Grid>
                </Grid>
                <div className={classes.heroButtons}>
                  <Grid container spacing={3} justify="center">
                    <Grid item>
                      <Typography
                        variant="h5"
                        align="center"
                        color="textInverted"
                        paragraph
                      >
                        St. Louis, MO
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </div>
          </main>
          <CssBaseline />

          <Grid container spacing={3} justify="center">
            <Grid item>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              ></Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                {"first_name + ' ' + last_name"}
              </Typography>
            </Grid>
          </Grid>
        </div>
      )}
    </React.Fragment>
  );
};
