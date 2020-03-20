//A simple loading page which will show while awaiting the API call.
//Loads a header and a spinning GIF

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import loadingGif from './loadingGif.gif';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(() => ({
  paperForLoading: {
    padding: 30,
    margin: 40
  }
}));

export const LoadingPage = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} className={classes.paperForLoading}>
        <Typography component="h5" variant="h5">
          {'LOADING.....'}
        </Typography>
        <img src={loadingGif} alt="loading" />
      </Paper>
    </Container>
  );
};
