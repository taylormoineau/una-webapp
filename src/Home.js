import React from 'react';

import {LoginPage} from './loginPage';
import {Register} from './Register';

export const Home = ({currentUser, checkAuth}) =>
  !currentUser ? (
    <>
      <LoginPage checkAuth={checkAuth} />
      <Register checkAuth={checkAuth} />
    </>
  ) : (
    `Welcome, ${currentUser.email}`
  );
