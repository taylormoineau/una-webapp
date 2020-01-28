import React from 'react';

import {LoginPage} from './loginPage';
import {Register} from './Register';
import {CreateBookPage} from './CreateBookPage';

export const Home = ({currentUser, checkAuth}) =>
  !currentUser ? (
    <>
      <LoginPage checkAuth={checkAuth} />
      <Register checkAuth={checkAuth} />
    </>
  ) : (
    <div className="container">
      <CreateBookPage />
    </div>
  );
