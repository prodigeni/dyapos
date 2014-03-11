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
			var input_file_image = document.getElementById("image"),
				input_url_image = document.getElementById("image-url"),
				image_comp,
				url,
				file,
				image_data,
				image_url,
				last;

			console.log("upload image");
			$("#add-image-box").foundation("reveal", "close");

			image_comp = new ImageCompModel({
				"type" : "image",
				// "pos_x" : clicked_inside_slide_point.left,
				// "pos_y" : clicked_inside_slide_point.top
				"pos_x" : 0,
				"pos_y" : 0,
				"slide" : app.slides.get(app.selected_slide)
			});

			if (!app.is_anonymous) {
				if (input_file_image.value !== "") {
					console.log("Image uploaded from computer");
					url = "/image/upload";
					file = input_file_image.files[0];
					image_data = new FormData();
					image_data.append("image", file);

					$.ajax({
						url : url,
						type : "POST",
						contentType : false,
						data : image_data,
						processData : false,
						cache : false
					}).done(function(file) {
						image_comp.set("file", file);
						var image = document.getElementById(image_comp.cid).getElementsByClassName("component-preview")[0].children[0];
						image.src = "/media/images/" + image_comp.get("file");
						//Clear the file input value
						input_file_image.value = "";
					});
				} else if (input_url_image.value !== "") {
					console.log("Image uploaded from external URL");
					url = "/image/upload-from-url";
					image_url = input_url_image.value;

					$.post(url, {
						"image_url" : image_url
					}, function(file) {
						var last,
							image;

						last = _.last(app.slides.getComponentsWhere({
							type : "image"
						}));
						last.set("file", file);
						image = document.getElementById(last.cid).getElementsByClassName("component-preview")[0].children[0];
						image.src = "/media/images/" + last.get("file");
						//Clear the url input value and the image preview
						input_url_image.value = "";
						document.getElementById("image-preview").innerHTML = "";
					});
				}
			} else {
				// Insert an "external_url" property to the last image component added
				last = _.last(app.slides.getComponentsWhere({
					type : "image"
				}));
				last.set("external_url", input_url_image.value);
			}
		},

		showPreview : function() {
			console.log("Url pasted");
			setTimeout(function() {
				console.log("Load image preview");
				var template = $("#template-image-preview").html(),
					data = {},
					view;

				data.url = $("#image-url").val();
				view = Mustache.render(template, data);
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
