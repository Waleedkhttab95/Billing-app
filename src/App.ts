const express = require("express");
const { swaggerUi, specs } = require('./swagger');
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// inital express
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("trust proxy", 1);
// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// init logger
const logger = morgan((tokens: any, req: any, res: any) => {
  req.body.token = undefined;
  req.body.password = undefined;
  req.body.confirmPassword = undefined;

  return [
    "\nRequest:",
    "   Timestamp: " +
      new Date().toLocaleString("en-US", { timeZone: "ASIA/RIYADH" }),
    "   Method: " + tokens.method(req, res),
    "   URL: " + tokens.url(req, res),
    "   Body: " + JSON.stringify(req.body, null, "\t"),
    "Response:",
    "   Status Code: " + tokens.status(req, res),
    "   Response Time: " + tokens["response-time"](req, res) + " ms\n",
  ].join("\n");
});

app.use(logger);

// Export app express
export default app;
