import {query} from './query.js';

export const editPageNumber = async (req, res) => {
  if (!Array.isArray(req.body) || req.body.some(i => typeof i != 'number'))
    return res.status(406).json('What are you even trying to do here?');

  const ids = req.body;

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    await query(`UPDATE pages_data SET page_number = $1 WHERE id= $2`, [i, id]);
  }

  res.json('Successful swap');
};