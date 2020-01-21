import pg from 'pg';

const pool = new pg.Pool();

pool.on('error', err => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export const query = async (sqlString, params) => {
  try {
    return (await pool.query(sqlString, params)).rows;
  } catch (e) {
    console.error(e.stack);
  }
};
