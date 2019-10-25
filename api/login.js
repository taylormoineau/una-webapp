export default async (req, res) => {
  if (!req.body) {
    res.send('hahahaha');
    return;
  }
  if (req.body.password !== 'DOOTMAN RULZ') res.json({access: 'denied'});
  else res.json({access: 'granted'});
};
