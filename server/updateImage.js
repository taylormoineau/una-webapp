import {query} from './query.js';

export const updateImage = async (req, res) => {
  const {img, id} = req.body;

  if (!req.body || img.indexOf('data:image/') === -1)
    return res.status(406).json('What are you even trying to do here?');

  await query(`UPDATE pages_data SET page_image = $1 WHERE id= $2`, [img, id]);

  res.json('Image updated');
};
