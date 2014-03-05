define(["ComponentModel"], function(ComponentModel) {
	return Backbone.RelationalModel.extend({
		relations : [{
			type : Backbone.HasMany,
			key : 'components',
			relatedModel : ComponentModel, // I referenced it by an object instead of a string because of a Require.js problem
			collectionType : 'ComponentCollection',
			reverseRelation : {
				key : 'slide',
				includeInJSON : '_id'
			}
		}],
		defaults : {
			pos_x : 0,
			pos_y : 0,
			rotation_x : 0,
			rotation_y : 0,
			rotation_z : 0,
			scale : 1,
			number : 0,
		},
		urlRoot : "slide",
		idAttribute : "_id",
		initialize : function() {

			this.on("change", function() {
				if (!is_anonymous) {
					if (!_.isEmpty(this.changed) && !this.changed.hasOwnProperty("_id")) {
						if (!updatedFromServer) {
							console.log("Slide changed");
							this.save();
						} else {
							updatedFromServer = false;
						}
					}
				}

				// this.updateThumbnail();
			}, this);
		},
		// Methods

		updateThumbnail : function() {
			// console.log("Thumbnail updated");
			// var slide = document.getElementById(this.cid);
			// var slide_mini = document.getElementById("slide-"+this.cid).getElementsByClassName("slide-mini-preview")[0];
// 
			// // Set the background color
			// var background_color = null;
			// if (slide.style.backgroundColor === "") {
				// background_color = $("body").css("background-color");
			// } else {
				// background_color = slide.style.backgroundColor;
			// }
// 
			// var number = this.get("number");
			// html2canvas(slide, {
				// background : background_color,
				// onrendered : function(canvas) {
					// canvas.style.width = "100%";
					// slide_mini.innerHTML = "";
					// slide_mini.appendChild(canvas);
// 
					// //If thumbnail corresponds to the first slide
					// if (number === 0 && !is_anonymous) {
						// console.log("Update presentation thumbnail");
						// //Update presentation thumbnail to server
						// var url = "/update-thumbnail";
						// var image = canvas.toDataURL("image/png");
						// $.post(url, {
							// "presentation_id" : p_id,
							// "image" : image
						// });
					// }
				// },
			// });
		},
	});

});
