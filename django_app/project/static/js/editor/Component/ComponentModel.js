/**
 * @module Component
 */

/**
 * Component Model
 * @class ComponentModel
 * @extends Backbone.RelationalModel
 */

define([], function() {
	"use strict";
	return Backbone.RelationalModel.extend({
		/**
		 * Set of related models
		 * @property subModelTypes
		 * @type Object
		 */
		subModelTypes : {
			"text" : "TextCompModel",
			"image" : "ImageCompModel",
			"video" : "VideoCompModel"
		},

		/**
		 * Default model properties
		 * @property defaults
		 * @type Object
		 */
		defaults : {
			pos_x : 0,
			pos_y : 0,
			rotation : 0,
			scale : null,
			custom_css : null,
			content : ""
		},

		/**
		 * @property urlRoot
		 * @type String
		 */
		urlRoot : "component",

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

			this.on("change", function() {
				if(!app.is_anonymous) {
					console.log(this.changed);
					if(this.get("content") !== ""){
						this.save();
					}
				}

				this.get("slide").mini_view.generateThumbnail();
			});

			// this.on("change", function() {
				// // if (!is_anonymous) {
					// // if (!_.isEmpty(this.changed) && !this.changed.hasOwnProperty("_id")) {
						// // if (!updated_from_server) {
							// // console.log("Slide changed");
							// // this.save();
						// // } else {
							// // updated_from_server = false;
						// // }
					// // }
				// // }
// //
				// // this.get("slide").updateThumbnail();
				// this.save();
			// }, this);
		}
	});

});
