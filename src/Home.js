import React from 'react';
import Grid from '@material-ui/core/Grid';
import {loadJson} from './utils';

import {LoginPage} from './loginPage';
import {CreateBookPage} from './CreateBookPage';
import {Container, Paper} from '@material-ui/core';

export const Home = ({currentUser, checkAuth, logout}) => (
  <Container className="menuPaper">
    <Grid container spacing={3} justify="center">
      <Grid item>
        <a className="books" href="/createBooks"></a>
      </Grid>
      <Grid item>
        <a className="about" href="#"></a>
        <a
          className="profile"
          href={currentUser ? '/userInfo/' + currentUser.id : '/login'}
        ></a>
      </Grid>
      {!currentUser ? (
        <Grid item>
          <a className="login" href="/login"></a>
        </Grid>
      ) : (
        <Grid item>
          <div className="logout" onClick={logout} />
        </Grid>
      )}
    </Grid>
  </Container>
);
