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
require("./models/users");

app.use(express.json());

app.use(require("./routes/question"));
app.use(require("./routes/auth"));
app.use(require("./routes/practice"));

app.listen(PORT, () => {
  console.log("Server is running at port: " + PORT);
});
