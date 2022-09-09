const express = require("express");
const cors = require("cors");
const app = express();
const connectDb = require("./db/connect");

//require dotenv
require("dotenv").config();

//req router
const router = require("./routes/todo");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//Route
app.use("/api/v1/todo", router);

//connection
const start = async () => {
  const url = process.env.MONGO_CONNECT;
  const port = 5000;

  try {
    await connectDb(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    app.listen(port, (req, res) => {
      console.log("You are listening on port :", port);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
