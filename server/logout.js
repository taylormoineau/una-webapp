export const logout = (req, res) => {
  res.clearCookie('authCookie').json('Logged out');
};
