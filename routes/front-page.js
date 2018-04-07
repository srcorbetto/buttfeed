var express = require("express");
var router = express.Router();
var db = require("../models");
var mongoose = require("mongoose");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/buttfeed_db", {
  useMongoClient: true
});

router.get("/", function(req, res){
	
	// db.Article.insert({
	// 	title: "test",
	// 	summary: "this is a test post",
	// 	image: "img link"
	// });

	db.Article.find({}, function(err, data){
		res.json(data);
	});

	// res.render("index");
});

module.exports = router;