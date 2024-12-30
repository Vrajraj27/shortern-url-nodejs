const redis = require("redis");

const client = redis.createClient({
  password: "AsCvOgQu2CVU9NotR0IQiKZBMz6MAM82",
  socket: {
    host: "redis-14067.c301.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 14067,
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();
client.on("connect", () => console.log("Redis Connect"));

module.exports = client;
