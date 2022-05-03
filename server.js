const { createServer } = require("http");
const process = require("process");
const { parse } = require("url");
const next = require("next");
const mongoose = require("mongoose");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

(async function () {
  await app.prepare();

  const dbUri = process.env.MONGODB_URI;
  console.log(`Connecting to MongoDB.`);
  await mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end({
        success: false,
        error: "Internal server error",
      });
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
})();
