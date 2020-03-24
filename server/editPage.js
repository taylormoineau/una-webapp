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

export const editPageDescription = async (req, res) => {
  if (!req.body)
    return res.status(406).json('What are you even trying to do here?');

  const {des, id} = req.body;

  await query(`UPDATE pages_data SET page_description = $1 WHERE id= $2`, [
    des,
    id
  ]);

  res.json('Description successfully updated');
};

export const editApproval = async (req, res) => {
  if (!req.body)
    return res.status(406).json('What are you even trying to do here?');

  await query(
    'UPDATE "books_data" SET "approved" = NOT "approved" WHERE id = $1',
    [req.body.id]
  );
  return res.json('Page status updated!');
};
