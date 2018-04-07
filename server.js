// Require Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var db = require("./models");
var bfScrape = require("./scripts/scrape");

var app = express();

// Will set this up later
// var router = require("./routes/front-page");

// Set Handlebars
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3000;
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/buttfeed_db";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

app.use(logger("dev"));

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// parse application/json
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them
// app.use(router);

bfScrape();

// Temp Routes
// ===========================================

// Get Everything
app.get("/", function(req, res){
	db.Article.find({})
	.sort({modified: -1})
	.exec(
	function(err, data){
		if (err) throw err;
		//Object for handlebars
		var obj = {
			fromDB: data
		};
		console.log(data);
		res.render("index", obj);
	});
});

// Saved an article
// app.post("/save", function(req, res){
// 	db.Article.update(
// 		{
// 			_id: req.body._id
// 		},
// 		{
//       $set: {
//         saved: req.body.saved,
//         modified: Date.now()
//       }
//     },
//     function(error, edited){
//     	if (error) {
//     		console.log(error);
//     		res.send(error);
//     	} else {
//     		console.log(edited);
//     		res.send(edited);
//     	}
//     }
// 	);
// });

// Saved an article
app.post("/addnote", function(req, res){
	console.log(req.body);
	db.Article.update(
		{
			_id: req.body._id
		},
		{
      $push: {
        notes: {
        	copy: req.body.note.copy,
        	dateAdded: req.body.note.dateAdded
        }
      }
    },
    function(error, updated){
    	if (error) {
    		console.log(error);
    		res.send(error);
    	} else {
    		console.log(updated);
    		res.send(updated);
    	}
    }
	);
});

// Render the saved articles
app.get("/saved", function(req, res){
	db.Article.find({
		saved: true
	}).sort({modified: -1})
	.exec(
	function(err, data){
		if (err) throw err;
		//Object for handlebars
		var obj = {
			fromDB: data
		};
		console.log(data);
		res.render("saved", obj);
	});
});


// Start the server
app.listen(PORT, function() {
	console.log("App running on port " + PORT);
});