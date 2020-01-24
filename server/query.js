import pg from 'pg';

const pool = new pg.Pool();

pool.on('error', err => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export const query = async (sqlString, params) => {
  try {
    const result = await pool.query(sqlString, params);
    return result.rows;
  } catch (e) {
    console.error(e.stack);
  }
};
