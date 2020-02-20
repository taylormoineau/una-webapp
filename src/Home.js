import React from 'react';

import {LoginPage} from './loginPage';
import {CreateBookPage} from './CreateBookPage';

export const Home = ({currentUser, checkAuth}) =>
  !currentUser ? (
    <>
      <LoginPage checkAuth={checkAuth} />
    </>
  ) : (
    <div className="container">
      <CreateBookPage isAdmin={currentUser.admin} />
    </div>
  );
