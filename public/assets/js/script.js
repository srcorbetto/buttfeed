$(document).ready(function(){

	console.log("script.js connected");

	// Click events
	// ============================================

	// Save article
	$("body").on("click", ".fa-heart", function(){
		$.ajax({
		type: "POST",
		dataType: "json",
		url: "/save",
		data: {
			_id: $(this).attr("data-id"),
			saved: true
		}
		})
		.then(function(data){
			console.log(data);
		});
	});

	// Unsave article
	$("body").on("click", ".delete-article", function(){
		$.ajax({
		type: "POST",
		dataType: "json",
		url: "/remove",
		data: {
			_id: $(this).attr("data-id"),
			saved: false
		}
		})
		.then(function(data){
			console.log(data);
		});
	});

	// Add a note
	$("body").on("click", ".add-note", function(e){
		e.preventDefault();
		$.ajax({
		type: "POST",
		dataType: "json",
		url: "/addnote",
		data: {
			_id: $(this).attr("data-id"),
			note: {
				copy: $(".note-input").val(),
				dateAdded: Date.now()
			}
		}
		})
		.then(function(data){
			console.log(data.length);
			for (i=0; i<data.length; i++) {
				console.log(data[i]);
				// $(".card-body").append("Message: "+data[i].copy);
			}
		});
	});

	// Click events
	// ============================================

	// New Scrape & Reload
	$("body").on("click", ".scrape", function(){
		$.get("/rescrape", function(data, status){
			console.log(status);
			if (status === "success") {
				location.reload();
			}
		});
	});


	
});