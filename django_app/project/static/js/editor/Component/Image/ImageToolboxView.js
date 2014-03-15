/**
 * @module Component
 * @submodule Image
 * @class ImageToolboxView
 * @extends Backbone.View
 */

define([], function() {
	"use strict";
	return Backbone.View.extend({

		el : document.getElementById("toolbox-image"),

		events : {
			"click #btn-increase-image-size" : "increaseSize",
			"click #btn-decrease-image-size" : "decreaseSize"
		},

		show : function() {
			$(".toolbox").hide();
			this.$el.show();
		},

		/**
		 * Increases the font size
		 * @method increaseSize
		 */
		increaseSize : function() {
			console.log("increase image");
			app.selected_component.set("size", parseInt(app.selected_component.get("size"), 10) + 2);
		},

		/**
		 * Decreases the font size
		 * @method decreaseSize
		 */
		decreaseSize : function() {
			console.log("decrease image");
			app.selected_component.set("size", parseInt(app.selected_component.get("size"), 10) - 2);
		}
	});
});