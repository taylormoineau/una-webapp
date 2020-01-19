const {Client} = require('pg');

/*

This wrapper takes care of the busy work of connecting to the database, disconnecting,
and catching errors. It also allows you to write simpler functions in your other files
because they no longer need to think about how to get the PG client or how to send
their results back to the browser. 

*/
module.exports.wrapper = func => async (req, res, next) => {
  try {
    const pgClient = new Client();
    await pgClient.connect();

    const result = await func(req, pgClient); // result can be {status: ###, data: '...'} or just data

    if (result.status) {
      res.status(result.status);
    }
    if (result.cookie) {
      const {name, value, maxAge} = result.cookie;
      res.cookie(name, value, {maxAge});
    }
    if (result.clearCookie) {
      res.clearCookie(result.clearCookie);
    }
    if (result.next) {
      next();
    } else {
      console.log('TEST!');
      res.json(result.data || result);
    }

    await pgClient.end();
  } catch (e) {
    console.error(e);
    res.status(500).json(`Error: ${e}`); // not the best security
  }
};
