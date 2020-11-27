const express = require("express");
const mongoose = require("mongoose");
const { MONGOURL } = require("./config/key");
const PORT = 5000;

const app = express();

//Connect to mongodb
mongoose.connect(MONGOURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});
mongoose.connection.on("connected", () => {
  console.log("conneted to mongo");
});
mongoose.connection.on("error", (err) => {
  console.log("err in connecting", err);
});

require("./models/question");

app.use(express.json());

app.use(require("./routes/question"));

app.listen(PORT, () => {
  console.log("Server is running at port: " + PORT);
});
