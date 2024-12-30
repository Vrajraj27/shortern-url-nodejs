const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const config = require("./config/config");

const router = require("./router");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(express.json());
app.use(cors());

require("./config/db.config");
require("./config/redis.config");

app.use("/", router);

app.get("/", async (req, res) => {
  res.send("API is running");
});

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
