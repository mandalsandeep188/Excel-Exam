if (process.env.NODE_ENV === "production") {
  module.exports = require("./prodenv");
} else {
  module.exports = require("./devenv");
}
