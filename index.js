const express = require("express");
const app = express();
require("dotenv").config();
const connection = require("./config-db");

const port = process.env.PORT;

const authRouter = require("./routes/auth.route");
const usersRouter = require("./routes/users.route");
const communityRouter = require("./routes/community.route");
const eventsRouter = require("./routes/events.route");
const commentsRouter = require("./routes/comments.route");

connection.connect((err) => {
  err
    ? console.log(err)
    : console.log(`Connected to database on thread ${connection.threadId}.`);
});

app.use(express.json());

app.use("/auth", authRouter);
app.use("/communities", communityRouter);
app.use("/users", usersRouter);
app.use("/events", eventsRouter);
app.use("/comments", commentsRouter);

app.listen(port, (err) => {
  err ? console.log(err) : console.log(`App is running at port ${port}.`);
});
