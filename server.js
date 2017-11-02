var express = require("express");
var _ = require("lodash");
var fs = require("fs");
var traverse = require("traverse");
var app = express();

app.get("/timestamp", function(req, res) {
  var files = ["App.jsx", "Lens.jsx", "boxplot.jsx", "index.html", "itemDataDisplay.jsx"];
  var timestamp = _.foldr(files, function (memo, file) {
    return memo + fs.statSync(file).ctime.toString()
  }, "");
  res.end(timestamp);
})

app.use(express.static("."));
app.set("port", 9517);
app.listen(app.get("port"));

console.log("listening on port " + app.get("port"));