/**
 * @module Slide
 */

/**
 * Slide model
 * @class SlideModel
 * @extends Backbone.RelationalModel
 */

define(["Component/ComponentModel"], function(ComponentModel) {
	"use strict";
	return Backbone.RelationalModel.extend({
		/**
		 * Array of objects that define the model with other models
		 * @property relations
		 * @type Array
		 */
		relations : [{
			type : Backbone.HasMany,
			key : "components",
			relatedModel : ComponentModel, // I referenced it by an object instead of a string because of a Require.js problem
			collectionType : "app.ComponentCollection",
			reverseRelation : {
				key : "slide",
				includeInJSON : "_id"
			}
		}],

		/**
		 * Default values when creating the model
		 * @property defaults
		 * @type Objects
		 */
		defaults : {
			pos_x : 0,
			pos_y : 0,
			rotation_x : 0,
			rotation_y : 0,
			rotation_z : 0,
			scale : 1,
			number : 0
		},

		/**
		 * @property urlRoot
		 * @type String
		 */
		urlRoot : "slide",

		/**
		 * Represents the name of the ID attribute
		 * @property idAttribute
		 * @type String
		 */
		idAttribute : "_id",

		/**
		 * Runs when the class is instantiated
		 * @method initialize
		 */
		initialize : function() {
			// When the model data changes, update to server
			this.on("change", function() {
				if (!app.is_anonymous) {
					if (!_.isEmpty(this.changed) && !this.changed.hasOwnProperty("_id")) {
						if (!app.updated_from_server) {
							console.log("Slide changed");
							this.save();
						} else {
							app.updated_from_server = false;
						}
					}
				}
			}, this);
		},


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
		}
	});

});
