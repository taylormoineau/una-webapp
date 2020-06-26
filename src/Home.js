import React from 'react';
import Grid from '@material-ui/core/Grid';
import {loadJson} from './utils';
import {Link as RRLink} from 'react-router-dom';

import {LoginPage} from './loginPage';
import {CreateBookPage} from './CreateBookPage';
import {Container, Paper} from '@material-ui/core';

export const Home = ({currentUser, checkAuth, logout}) => (
  <Container className="menuPaper">
    <Grid container spacing={3} justify="center">
      <Grid item>
        <RRLink className="books" to="/createBooks/all" checkAuth={checkAuth} />
      </Grid>
      <Grid item>
        <RRLink className="about" to="/about" />
        <RRLink
          className="profile"
          to={currentUser ? '/userInfo/' + currentUser.id : '/login'}
        />
      </Grid>
      {!currentUser ? (
        <Grid item>
          <RRLink className="login" to="/login" checkAuth={checkAuth} />
        </Grid>
      ) : (
        <Grid item>
          <RRLink to="/" className="logout" onClick={logout} />
        </Grid>
      )}
    </Grid>
  </Container>
);
