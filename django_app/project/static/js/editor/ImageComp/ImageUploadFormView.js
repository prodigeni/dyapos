define(["ImageCompModel"], function(ImageCompModel) {
	"use strict";
	return Backbone.View.extend({
		el : document.getElementById("form-upload-image"),
		events : {
			"click #btn-upload-image" : "upload",
			"paste #image-url" : "showPreview",
			"change #image" : "cleanImageURL",
			"change #image-url" : "cleanImageInputFile"
		},
		upload : function() {
			console.log("upload image");
			$("#add-image-box").foundation("reveal", "close");

			var inputFileImage = document.getElementById("image");
			var inputUrlImage = document.getElementById("image-url");

			var image_comp = new ImageCompModel({
				"type" : "image",
				// "pos_x" : clicked_inside_slide_point.left,
				// "pos_y" : clicked_inside_slide_point.top
				"pos_x" : 0,
				"pos_y" : 0,
				"slide" : app.slides.get(app.selected_slide)
			});
			// Component.insert({
				// "type" : "image",
				// // "pos_x" : clicked_inside_slide_point.left,
				// // "pos_y" : clicked_inside_slide_point.top
				// "pos_x" : 0,
				// "pos_y" : 0
			// });

			if (!app.is_anonymous) {
				var url;

				if (inputFileImage.value !== "") {
					console.log("Image uploaded from computer");
					url = "/image/upload";
					var file = inputFileImage.files[0];
					var imageData = new FormData();
					imageData.append("image", file);

					$.ajax({
						url : url,
						type : "POST",
						contentType : false,
						data : imageData,
						processData : false,
						cache : false
					}).done(function(file) {
						image_comp.set("file", file);
						var image = document.getElementById(image_comp.cid).getElementsByClassName("component-preview")[0].children[0];
						image.src = "/media/images/" + image_comp.get("file");
						//Clear the file input value
						inputFileImage.value = "";
					});
				} else if (inputUrlImage.value !== "") {
					console.log("Image uploaded from external URL");
					url = "/image/upload-from-url";
					var image_url = inputUrlImage.value;

					$.post(url, {
						"image_url" : image_url
					}, function(file) {
						var last = _.last(app.slides.getComponentsWhere({
							type : "image"
						}));
						last.set("file", file);
						var image = document.getElementById(last.cid).getElementsByClassName("component-preview")[0].children[0];
						image.src = "/media/images/" + last.get("file");
						//Clear the url input value and the image preview
						inputUrlImage.value = "";
						document.getElementById("image-preview").innerHTML = "";
					});
				}
			} else {
				// Insert an "external_url" property to the last image component added
				var last = _.last(app.slides.getComponentsWhere({
					type : "image"
				}));
				last.set("external_url", inputUrlImage.value);
			}
		},

		showPreview : function() {
			console.log("Url pasted");
			setTimeout(function() {
				console.log("Load image preview");
				var template = $("#template-image-preview").html();
				var data = {
					url : $("#image-url").val()
				};
				var view = Mustache.render(template, data);
				$("#image-preview").html(view);
			}, 500);
		},

		cleanImageInputFile : function() {
			if(!app.is_anonymous) {
				console.log("changed image url");
				document.getElementById("image").value = "";
			}
		},

		cleanImageURL : function() {
			console.log("changed image file input");
			document.getElementById("image-url").value = "";
		}
	});
});
