/**
 * @module Component
 * @submodule Image
 */

/**
 * Form for adding a new Image
 * @class ImageUploadFormView
 * @extends Backbone.View
 */

define(["Component/Image/ImageModel"], function(ImageCompModel) {
	"use strict";
	return Backbone.View.extend({
		/**
		 * Element: #form-upload-image
		 * @property el
		 * @type DOM Object
		 */
		el : document.getElementById("form-upload-image"),

		events : {
			/**
			 * Calls upload()
			 * @event click #btn-upload-image
			 */
			"click #btn-upload-image" : "upload",
			/**
			 * Calls showPreview()
			 * @event paste #image-url
			 */
			"paste #image-url" : "showPreview",
			/**
			 * Calls cleanImageURL
			 * @event change #image
			 */
			"change #image" : "cleanImageURL",
			/**
			 * Calls cleanImageInputFile
			 * @event #image-url
			 */
			"change #image-url" : "cleanImageInputFile"
		},

		/**
		 * Adds a new image
		 * @method upload
		 */
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
				"pos_x" : app.slide_clicked_point.left,
				"pos_y" : app.slide_clicked_point.top,
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

		/**
		 * Shows an image preview when adding a image url on the form
		 * @method showPreview
		 */
		showPreview : function() {
			console.log("Url pasted");

			// When the paste event is caught, you can't access the pasted text, so here I wait for 500 milliseconds
			// and then I can access to the pasted text without problems
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

		/**
		 * Clears the image input file
		 * @method cleanImageInputFile
		 */
		cleanImageInputFile : function() {
			if(!app.is_anonymous) {
				console.log("changed image url");
				document.getElementById("image").value = "";
			}
		},

		/**
		 * Clears the image input URL
		 * @method cleanImageURL
		 */
		cleanImageURL : function() {
			console.log("changed image file input");
			document.getElementById("image-url").value = "";
		}
	});
});
