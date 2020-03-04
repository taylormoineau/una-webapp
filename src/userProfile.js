import React, {useState, useEffect} from 'react';
import {loadData, sendJson, assocPath, swap} from './utils';
import {useParams} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import userIcon from './userIcon.png';
// import Button from '@material-ui/core/Button';
// import CameraIcon from '@material-ui/icons/PhotoCamera';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
// import TextField from '@material-ui/core/TextField';

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
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    height: 500
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20)
  }
}));

export const UserProfile = ({currentUser}) => {
  const [error, setError] = useState('');
  const {bookId} = useParams();
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />

      <Grid container spacing={3} justify="center">
        <Grid item>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            <Avatar
              src={currentUser.user_photo ? currentUser.user_photo : userIcon}
              className={classes.large}
            />
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Language:
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
