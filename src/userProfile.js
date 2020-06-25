import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import {loadData} from './utils';
import {useParams} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import userIcon from './userIcon.png';
import CreateIcon from '@material-ui/icons/Create';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import {LoadingPage} from './LoadingPage';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
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
    width: theme.spacing(17),
    height: theme.spacing(17)
  },
  userText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.palette.primary.light
  },
  userHeaders: {
    fontWeight: 'bold',
    fontSize: 22,
    color: theme.palette.primary.main
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 35,
    color: theme.palette.primary.main
  },
  idPaper: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40
  }
}));

export const UserProfile = ({currentUser}) => {
  const [error, setError] = useState('');
  const [userData, setUserData] = useState('');
  const {author_id} = useParams();
  const classes = useStyles();

  console.log(author_id, currentUser);

  useEffect(() => {
    loadData('getUser/' + author_id, setUserData, setError);
  }, []);

  return (
    <React.Fragment>
      {!userData ? (
        <LoadingPage />
      ) : (
        <div>
          <main>
            <div className={classes.heroContent}>
              <Container maxWidth="sm">
                <Paper className={classes.idPaper}>
                  <Grid
                    container
                    spacing={3}
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Avatar
                        src={
                          userData.user_photo ? userData.user_photo : userIcon
                        }
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
                        {userData.first_name + ' ' + userData.last_name}
                      </Typography>
                      <Typography
                        variant="h5"
                        align="center"
                        color="textSecondary"
                        className={classes.userText}
                        paragraph
                      >
                        {userData.city + ', ' + userData.country}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={6}
                    justify="space-between"
                    alignItems="left"
                  >
                    <Grid item>
                      <Typography
                        variant="h5"
                        color="textSecondary"
                        className={classes.userHeaders}
                        paragraph
                      >
                        Languages:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="h5"
                        color="textSecondary"
                        className={classes.userText}
                        paragraph
                      >
                        {userData.first_name}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={6}
                    justify="space-between"
                    alignItems="left"
                  >
                    <Grid item>
                      <Typography
                        variant="h5"
                        color="textSecondary"
                        className={classes.userHeaders}
                        paragraph
                      >
                        Email Address:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="h5"
                        color="textSecondary"
                        className={classes.userText}
                        paragraph
                      >
                        {userData.email}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={6}
                    justify="space-between"
                    direction="row"
                    alignItems="baseline"
                  >
                    <Grid item>
                      <Button size="large" color="primary" variant="contained">
                        <MenuBookIcon />
                      </Button>
                    </Grid>
                    {currentUser.id == author_id && (
                      <Grid item>
                        <Button
                          size="large"
                          color="primary"
                          variant="contained"
                          href="/InfoRegister"
                        >
                          <CreateIcon />
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Paper>
              </Container>
            </div>
          </main>
          <CssBaseline />
        </div>
      )}
    </React.Fragment>
  );
};
