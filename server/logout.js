export const logout = (req, res) => {
  res.clearCookie('authCookie');
  return res.status(200).redirect('/loginPage');

  //for some reason I can't get it to work without the redirect
};
