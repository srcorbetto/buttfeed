$(document).ready(function(){

	console.log("script.js connected");

	// Save article
	$("body").on("click", ".card-body", function(){
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
	
});