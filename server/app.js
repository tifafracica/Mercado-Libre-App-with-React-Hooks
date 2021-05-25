const express = require("express");
// body-parser helps to parse the request and create the req.body object
const bodyParser = require("body-parser");
// cors provides Express middleware to enable CORS with various options.
const cors = require("cors");
const apiRouter = require('./routes/apiRoutes');

const app = express();

app.use(cors());

app.options('*', cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// simple test route
app.use("/api", apiRouter);

module.exports = app;