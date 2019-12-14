const {Client} = require('pg');

/*

This wrapper takes care of the busy work of connecting to the database, disconnecting,
and catching errors. It also allows you to write simpler functions in your other files
because they no longer need to think about how to get the PG client or how to send
their results back to the browser. 

*/
module.exports.wrapper = func => async (req, res) => {
  try {
    const client = new Client();
    await client.connect();

    const result = await func(req, client); // result can be {status: ###, data: '...'} or just data

    if (result.status) {
      res.status(result.status).send(result.data);
    } else res.send(result);

    await client.end();
  } catch (e) {
    res.status(500).send(`Error: ${e}`); // not the best security
  }
};
