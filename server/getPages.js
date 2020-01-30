import {query} from './query.js';

export const getOnePage = async (req, res) => {
  const [result] = await query('SELECT * FROM "pages_data" WHERE id=$1', [
    req.params.id
  ]);
  if (!result) res.status(404).send('Page(s) not found');
  else res.json(result);
};
