const {Pool} = require('pg');
const pool = new Pool();

pool.on('error', err => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = async (sqlString, params) => {
  try {
    return (await pool.query(sqlString, params)).rows;
  } catch (e) {
    console.error(e.stack);
  }
};
