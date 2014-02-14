Mustache.tags = ["[[", "]]"];

$(document).ready(function() {

	$("#iframe-width").on("keyup change", function() {
		$("#iframe-width-property").html(parseInt(this.value));
	});
	$("#iframe-height").on("keyup change", function() {
		$("#iframe-height-property").html(parseInt(this.value));
	});

	$("#rename-btn").on("click", function() {
		name = document.getElementById("id_name").value;
		url = "/rename";
		$.post(url, {
			"key" : presentation_key,
			"name" : name
		}, function(result) {
			if (result == "true") {
				document.getElementById("title").innerHTML = name;
				$("#rename-modal-box").foundation("reveal", "close");
			}
		});
	});

	$("#modify-description-btn").on("click", function() {
		description = document.getElementById("id_description").value;
		url = "/modify-description";
		$.post(url, {
			"key" : presentation_key,
			"description" : description
		}, function(result) {
			if (result == "true")
				document.getElementById("description").innerHTML = description;
			$("#modify-description-modal-box").foundation("reveal", "close");
		});
	});
});
