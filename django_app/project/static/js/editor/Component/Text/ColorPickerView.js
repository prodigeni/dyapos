/**
 * @module Component
 * @submodule Text
 */

/**
 * Color picker view for text components
 * @class ColorPickerView
 * @extends Backbone.View
 */

define([], function() {
	"use strict";
	return Backbone.View.extend({
		/**
		 * Element: #colorpicker
		 * @property el
		 * @type DOM Object
		 */
		el : document.getElementById("colorpicker"),

		/**
		 * Runs when the class is instantiated
		 * @method initialize
		 */
		initialize : function() {
			ColorPicker.fixIndicators(document.getElementById("slider-indicator"), document.getElementById("picker-indicator"));

			new ColorPicker(document.getElementById("slider"), document.getElementById("picker"), function(hex, hsv, rgb, pickerCoordinate, sliderCoordinate) {
				app.selected_color = hex;
				ColorPicker.positionIndicators(document.getElementById("slider-indicator"), document.getElementById("picker-indicator"), sliderCoordinate, pickerCoordinate);
				document.getElementById(app.selected_component.cid).getElementsByClassName("component-preview")[0].style.color = hex;
			});
		},

		events : {
			/**
			 * Calls cancelColor()
			 * @event click #btn-color-cancel
			 */
			"click #btn-color-cancel" : "cancelColor",
			/**
			 * Calls applyColor
			 * @event click #btn-color-ok
			 */
			"click #btn-color-ok" : "applyColor"
		},

		/**
		 * Cancels the selected color (doesn't apply)
		 * @method cancelColor
		 * @param {Object} event Click event
		 */
		cancelColor : function(event) {
			event.stopPropagation();
			console.log("cancel color");

			document.getElementById(app.selected_component.cid).getElementsByClassName("component-preview")[0].style.color = app.selected_component.get("color");
			this.toggle();
		},

		/**
		 * Applies the selected color
		 * @method applyColor
		 * @param {Object} event Click event
		 */
		applyColor : function(event) {
			event.stopPropagation();
			console.log("Change color");
			app.selected_component.set("color", app.selected_color);
			this.toggle();
		},

		/**
		 * Shows or hides the colorpicker view (toggle)
		 * @method toggle
		 */
		toggle : function() {
			this.$el.toggle();
		}
	});
});