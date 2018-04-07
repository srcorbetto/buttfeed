// Require dependencies
var request = require("request");
var cheerio = require("cheerio");
// var mongoose = require("mongoose");
var db = require("../models");

// mongoose.Promise = Promise;
// mongoose.connect("mongodb://localhost/buttfeed_db", {
//   // Said this can be removed...
//   // useMongoClient: true
// });

var buzzFeedScrape = function() {

	request("https://www.buzzfeed.com/", function(error, response, html){
		var $ = cheerio.load(html);

		$("div[data-buzzblock='story-card']").each(function(i, element){
			var title = $(element).find("h2").text();
			var linkToArticle = $(element).find(".link-gray").attr("href");
			var img = $(element).find(".card__image").attr("data-background-src");
			var summary = $(element).find("p").text();

			// Send to db
			var entry = {
				title: title,
				summary: summary,
				img: img,
				link: "https://www.buzzfeed.com" + linkToArticle,
				saved: false,
				modified: Date.now()
			};

			// console.log(entry);

			db.Article.create(entry)
			.then(function(entryAdded){
				console.log("Article was Added");
			}).catch(function(err){
				console.log("Article already exists");
			});

		});
	});

};

// Run the scrape
// buzzFeedScrape();
module.exports = buzzFeedScrape;
