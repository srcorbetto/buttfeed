var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var router = require("./routes/front-page.js");

// Set Handlebars
var exphbs = require("express-handlebars");

var PORT = 3000;

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// parse application/json
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them
app.use(router);

// Start the server
app.listen(PORT, function() {
	console.log("App running on port " + PORT);
});