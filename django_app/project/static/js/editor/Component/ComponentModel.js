/**
 * @module Component
 * @class ComponentModel
 * @extends Backbone.RelationalModel
 */

define([], function() {
	"use strict";
	return Backbone.RelationalModel.extend({
		subModelTypes : {
			"text" : "TextCompModel",
			"image" : "ImageCompModel",
			"video" : "VideoCompModel"
		},
		defaults : {
			pos_x : 0,
			pos_y : 0,
			rotation : 0,
			scale : null,
			custom_css : null
		},
		urlRoot : "component",
		idAttribute : "_id",
		initialize : function() {

			// this.on("change", function() {
				// if (!is_anonymous) {
					// if (!_.isEmpty(this.changed) && !this.changed.hasOwnProperty("_id")) {
						// if (!updated_from_server) {
							// console.log("Slide changed");
							// this.save();
						// } else {
							// updated_from_server = false;
						// }
					// }
				// }
//
				// this.get("slide").updateThumbnail();
			// }, this);
		}
	});

});
