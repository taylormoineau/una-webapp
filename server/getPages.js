import {query} from './query.js';

export const getOnePage = async (req, res) => {
  res.json(
    await query('SELECT * FROM "pages_data" WHERE id=$1', [req.params.id])
  );
};
