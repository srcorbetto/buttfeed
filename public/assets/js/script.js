$(document).ready(function(){

	console.log("script.js connected");

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

	// Click events
	// =============================================
	$("body").on("click", ".add-note", function(){
		$.ajax({
		type: "POST",
		dataType: "json",
		url: "/addnote",
		data: {
			_id: "5ac84e70c7f8f8963bbdffcf",
			note: {
				copy: $("textarea").val(),
				dateAdded: Date.now()
			}
		}
		})
		.then(function(data){
			console.log(data.length);
			for (i=0; i<data.length; i++) {
				console.log(data[i]);
				$(".card-body").append("Message: "+data[i].copy);
			}
		});
	});
	
});