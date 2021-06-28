const express = require("express");
const app = express();
require("dotenv").config();
const connection = require("./config-db");

const port = process.env.PORT;

connection.connect((err) => {
  err
    ? console.log(err)
    : console.log(`Connected to database on thread ${connection.threadId}.`);
});

app.listen(port, (err) => {
  err ? console.log(err) : console.log(`App is running at port ${port}.`);
});
