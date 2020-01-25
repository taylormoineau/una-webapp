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
      <h1>Welcome, {currentUser.email}</h1>
      <CreateBookPage />
    </div>
  );
