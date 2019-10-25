import creds from '../creds.json';
import {Client} from 'pg';

Object.assign(process.env, creds);

// req.query is like $_GET
// req.body is like $_POST
// req.cookies is like $_COOKIES

const getAllPeople = async client => {
  const {rows} = await client.query('SELECT * FROM "Dootman"', []);
  return rows;
};

const getPerson = async (client, id) => {
  const {rows} = await client.query('SELECT * FROM "Dootman" WHERE id=$1', [
    id
  ]);
  return rows[0];
};

export default async (req, res) => {
  try {
    const client = new Client();
    await client.connect();

    if (req.query.id) {
      res.json(await getPerson(client, req.query.id));
    } else {
      res.json(await getAllPeople(client));
    }

    await client.end();
  } catch (e) {
    res.send(`Error: ${e}`);
  }
};
