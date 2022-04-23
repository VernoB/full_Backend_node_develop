const redis = require("redis"); //for server-side caching

// Implement caching method
// check the record send via the api
// if exists, sending it to the client from the cache
// else fetching the data from the api, saving data in
// the cache, and sending the data to the client
const client = redis.createClient({
  port: 6379,
});

client.on("error", (err) => {
  // handling error
  throw new Error("Error " + err);
});

module.exports = client;
