const express = require("express");
const mongoose = require("mongoose");
const { MONGOURL } = require("./config/key");
const PORT = process.env.PORT || 5000;

const app = express();

//Connect to mongodb
mongoose.connect(MONGOURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
  console.log("conneted to mongo");
});
mongoose.connection.on("error", (err) => {
  console.log("err in connecting", err);
});

require("./models/question");
require("./models/users");
require("./models/socialUser");
require("./models/test");
require("./models/result");

app.use(express.json());

app.use(require("./routes/question"));
app.use(require("./routes/auth"));
app.use(require("./routes/practice"));
app.use(require("./routes/test"));
app.use(require("./routes/result"));
app.use(require("./routes/root"));

//Production setup
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running at port: " + PORT);
});
