import React from 'react';

import {LoginPage} from './loginPage';

export const Home = ({currentUser, checkAuth}) =>
  !currentUser ? (
    <LoginPage checkAuth={checkAuth} />
  ) : (
    `Welcome, ${currentUser.email}`
  );
