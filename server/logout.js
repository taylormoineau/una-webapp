export const logout = (req, res) => {
  res.clearCookie('authCookie');
  return res.json('Logged out');

  //for some reason I can't get it to work without the redirect
};
