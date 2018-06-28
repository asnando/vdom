var path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "vdom.js",
    library: 'vdom'
  },
  mode: "production",
  devtool: "source-map"
}
