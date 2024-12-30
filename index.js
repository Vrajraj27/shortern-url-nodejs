const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { exec } = require("child_process");

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

app.get("/test", async (req, res) => {
  exec(
    "npm run test",
    {
      env: process.env,
      maxBuffer: 1024 * 1024,
      cwd: process.cwd(),
    },
    (error, stdout, stderr) => {
      if (error) {
        console.log("👨🏻‍💻 ~ file: index.js:34 ~ exec ~ error:", error);
        console.log("👨🏻‍💻 ~ file: index.js:35 ~ exec ~ stderr:", stderr);
        return res.status(500).send("Test execution failed.");
      }

      console.log("Test execution output:", stdout);
      res.send("Tests executed successfully.");
    }
  );
});

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});

module.exports = app;
